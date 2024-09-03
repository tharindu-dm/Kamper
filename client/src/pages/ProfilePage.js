import { useContext, useState } from "react";
import { UserContext } from "../userContext";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage.js";
import AccountNav from "../components/AccountNav.js";
import EquipmentsPage from "./GearsPage.js";
import ProfilePhotosUploader from "../components/ProfilePhotosUploader.js";

export default function ProfilePage() {
  const [redirect, setRedirect] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [addedPhotos, setAddedPhotos] = useState("");
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  const { ready, user, setUser } = useContext(UserContext);

  async function logout() {
    await axios.post("/api/logout");
    setRedirect("/");
    setUser(null);
  }

  async function deleteProfile() {
    const confirmed = window.confirm(
      "Are you sure you want to delete your profile? This action cannot be undone."
    );

    if (!confirmed) return; // Exit if user cancels confirmation

    try {
      await axios.delete("/api/delete-profile");
      setUser(null); // Clear user data in context
      setRedirect("/"); // Redirect to home page
    } catch (error) {
      console.error("Failed to delete profile:", error);
      alert("Failed to delete profile. Please try again.");
    }
  }

  const handleEditClick = () => {
    setIsEditing(true);
    setNewUsername(user.name);
  };

  const handleSaveClick = async () => {
    try {
      await axios.put("/api/update-profile", { name: newUsername });
      // Update the user's username in the context
      setUser((prevUser) => ({ ...prevUser, name: newUsername }));
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  if (!ready) {
    return "Loading....";
  }
  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  const handlePhotosChange = (newPhotos) => {
    setAddedPhotos(newPhotos);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AccountNav />

      {subpage === "profile" && (
        <div className="flex justify-center mb-6">
          <div className="max-w-4xl mt-8 bg-white dark:bg-gray-700 shadow-md rounded-lg overflow-hidden">
            <div className="px-6 py-4">
              <h2 className="text-2xl font-bold text-center mb-4">Profile</h2>
              <div className="flex flex-col items-center">
                <ProfilePhotosUploader
                  addedPhotos={addedPhotos}
                  onChange={handlePhotosChange}
                  className="w-full max-w-xs text-sm text-gray-500"
                />
              </div>

              {/* Profile Details Section */}
              <div className="mt-4">
                {isEditing ? (
                  <input
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    className="dark:text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <div className="flex gap-2 flex-col mt-10">
                    <h3 className="flex self-center text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                      Email: {user.email}
                    </h3>
                    <p className="text-center block text-xl font-medium text-gray-700 dark:text-gray-200 mb-1">
                      Username: {user.name}
                    </p>
                  </div>
                )}
                <button
                  onClick={isEditing ? handleSaveClick : handleEditClick}
                  className="primary hover:bg-emerald-600 text-white font-bold mx-2 py-2 px-4 rounded-full w-full mt-2"
                >
                  {isEditing ? "Save" : "Edit"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center mb-8">
        <button
          onClick={deleteProfile}
          className="secondary max-w-sm mt-2 mr-4"
        >
          Delete Profile
        </button>
        <button onClick={logout} className="primary max-w-sm mt-2">
          Logout
        </button>
      </div>

      {subpage === "places" && <PlacesPage />}
      {subpage === "equipments" && <EquipmentsPage />}
    </div>
  );
}
