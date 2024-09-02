import { useContext, useState } from "react";
import { UserContext } from "../userContext";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage.js";
import AccountNav from "../components/AccountNav.js";
import EquipmentsPage from "./GearsPage.js";
import PhotosUploader from "../components/PhotosUploader.js";

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
        <div className="max-w-md mx-auto mt-8 bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-6 py-4">
            <h2 className="text-2xl font-bold text-center mb-4">Profile</h2>
            <div className="flex flex-col items-center">
              {/* Profile Picture Section */}
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4 bg-gray-200 flex items-center justify-center">
                {addedPhotos.length > 0 ? (
                  <img
                    src={addedPhotos} // Assuming the first photo is the profile picture
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-16 h-16 text-gray-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                )}
              </div>
              <PhotosUploader
                addedPhotos={addedPhotos}
                onChange={handlePhotosChange}
                className="w-full max-w-xs text-sm text-gray-500"
              />
            </div>

            {/* Profile Details Section */}
            <div className="mt-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Username:
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-center">{user.name}</p>
              )}
              <button
                onClick={isEditing ? handleSaveClick : handleEditClick}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold mx-2 py-2 px-4 rounded-full w-full mt-2"
              >
                {isEditing ? "Save" : "Edit"}
              </button>
              <h3 className="text-xl font-semibold mb-4">
                Email: {user.email}
              </h3>
            </div>
          </div>
        </div>
      )}

      {/* Buttons at the bottom */}
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
