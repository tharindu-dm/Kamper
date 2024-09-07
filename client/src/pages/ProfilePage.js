import { useContext, useState } from "react";
import { UserContext } from "../userContext";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage.js";
import AccountNav from "../components/AccountNav.js";
import EquipmentsPage from "./GearsPage.js";
import ProfilePhotosUploader from "../components/ProfilePhotosUploader.js";

export default function ProfilePage() {
  const [redirect, setRedirect] = useState(null); //use state for the redirect. Default is null
  const [isEditing, setIsEditing] = useState(false); // use state is set to false because initially it's not being edited
  const [newUsername, setNewUsername] = useState(""); //for the editing of username, new username is initially none
  const [addedPhotos, setAddedPhotos] = useState(""); //profile picture
  let { subpage } = useParams(); // retrieves parameters from the URL of the current route. Subpage is retrieved from the url
  if (subpage === undefined) {
    subpage = "profile"; //default subpage is profile
  }

  const { ready, user, setUser } = useContext(UserContext); //user data is retrieved from user context

  async function logout() {
    //function to log the user out
    await axios.post("/api/logout");
    setRedirect("/");
    setUser(null); // user state is cleared and redirected to home page
  }

  async function deleteProfile() {
    const confirmed = window.confirm(
      "Are you sure you want to delete your profile? This action cannot be undone." //promp the user to confirm deletion
    );

    if (!confirmed) return; // Exit if user cancels confirmation

    try {
      await axios.delete("/api/delete-profile");
      setUser(null); // Clear user data in context
      setRedirect("/"); // Redirect to home page
    } catch (error) {
      console.error("Failed to delete profile:", error);
      alert("Failed to delete profile. Please try again."); // alert the user on failure
    }
  }

  const handleEditClick = () => {
    //function to change username edits
    setIsEditing(true);
    setNewUsername(user.name);
  };

  const handleSaveClick = async () => {
    try {
      await axios.put("/api/update-profile", { name: newUsername }); //sends a PUT request to change username
      // Update the user's username in the context
      setUser((prevUser) => ({ ...prevUser, name: newUsername }));
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Failed to update profile. Please try again."); //alert the user on failure
    }
  };

  if (!ready) {
    return "Loading...."; //loading screen
  }
  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />; //redirect ro login if no user is found and page ready
  }

  if (redirect) {
    return <Navigate to={redirect} />; //redirect if a redirect path is set
  }

  const handlePhotosChange = (newPhotos) => {
    //handles profile photos
    setAddedPhotos(newPhotos);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AccountNav /> {/*Account Navigation Component*/}
      {subpage === "profile" && (
        <div className="flex justify-center mb-6">
          <div className="max-w-4xl mt-8 bg-white dark:bg-gray-700 shadow-md rounded-lg overflow-hidden">
            <div className="px-6 py-4">
              <h2 className="text-2xl font-bold text-center mb-4">Profile</h2>
              <div className="flex flex-col items-center">
                <ProfilePhotosUploader //Photo Uploader Component
                  addedPhotos={addedPhotos}
                  onChange={handlePhotosChange}
                  className="w-full max-w-xs text-sm text-gray-500"
                />
              </div>

              {/* Profile Details Section */}
              <div className="mt-4">
                {isEditing ? (
                  <input //input to change username
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)} // change username state to value
                    className="dark:text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <div className="flex gap-2 flex-col mt-10">
                    <h3 className="flex self-center text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                      Email: {user.email} {/*retrieves email to display*/}
                    </h3>
                    <p className="text-center block text-xl font-medium text-gray-700 dark:text-gray-200 mb-1">
                      Username: {user.name} {/*retrieves username to display*/}
                    </p>
                  </div>
                )}
                <button
                  onClick={isEditing ? handleSaveClick : handleEditClick}
                  className="primary hover:bg-emerald-600 text-white font-bold mx-2 py-2 px-4 rounded-full w-full mt-2"
                >
                  {isEditing ? "Save" : "Edit"} {/*button changes on state*/}
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
