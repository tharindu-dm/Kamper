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
  const [addedPhotos, setAddedPhotos] = useState([]);
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

  /* async function editProfile() {
    setRedirect("/editProfile");
  }*/

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
        <div className="flex justify-center items-center mt-8 flex-grow">
          {/* Profile Picture Section */}
          <div className="flex-1 flex flex-col items-center">
            <h3 className="text-xl font-semibold mb-4">Profile Picture</h3>
            {addedPhotos.length > 0 && (
              <img
                src={addedPhotos[0]} // Assuming the first photo is the profile picture
                alt="Profile"
                className="rounded-full w-32 h-32 object-cover"
              />
            )}
            <PhotosUploader
              addedPhotos={addedPhotos}
              onChange={handlePhotosChange}
            />
          </div>

          {/* Profile Details Section */}
          <div className="flex-1 text-center">
            <h3 className="text-xl font-semibold mb-42">
              Username:
              {isEditing ? (
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
                />
              ) : (
                user.name
              )}
              <button
                onClick={isEditing ? handleSaveClick : handleEditClick}
                className="bg-primary size-small hover:bg-blue-700 text-white font-bold mx-2 py-2 px-4 rounded-full"
              >
                {isEditing ? "Save" : "Edit"}
              </button>
            </h3>
            <h3 className="text-xl font-semibold mb-42">Email: {user.email}</h3>
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
