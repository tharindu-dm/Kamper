import { useContext, useState } from "react";

import { UserContext } from "../userContext";
import axios from "axios";

export default function PhotosUploader({ addedPhoto, onChange }) {
  const { user } = useContext(UserContext); //user state
  const [photoLink, setPhotoLink] = useState(""); //photo is initially set to a null string

  async function saveImage(photo) {
    try {
      // Make sure photo is a string
      if (Array.isArray(photo)) {
        photo = photo[0]; // Get the first element if it's an array
      }

      const userData = { addedPhotos: photo }; // Ensure it's a string
      const response = await axios.put("/api/update-profile", userData); //request to update the user with a new photo

      if (response.status === 200) {
        //200 OK on completion
        console.log("Image saved successfully:", response.data);
        window.location.reload();
      } else {
        //on failure
        console.error("Unexpected response:", response.data);
        alert("Failed to save image. Unexpected response from server.");
      }
    } catch (error) {
      //error handling
      console.error(
        "Error saving image:",
        error.response ? error.response.data : error.message //logs the error
      );
      alert("Failed to save image. Please try again.");
    }
  }

  async function addPhotoByLink(ev) {
    ev.preventDefault(); //prevent the page from reloading while form is submitting
    if (!photoLink.trim()) {
      alert("Please enter a photo link."); //validation of profile photo link
      return;
    }

    try {
      const { data: filename } = await axios.post("/api/upload-by-link", {
        link: photoLink,
      });
      await saveImage(filename); // Await saveImage to ensure it completes before proceeding
      setPhotoLink("");
    } catch (error) {
      console.error("Error uploading by link:", error);
      alert("Failed to upload photo. Please try again.");
    }
  }

  async function uploadPhoto(ev) {
    //function for uploading from device
    const files = ev.target.files;
    const data = new FormData();

    if (files.length > 0) {
      //if there is a file, appent it to data
      data.append("photos", files[0]);

      try {
        const response = await axios.post("/api/upload", data, {
          //post the photo to the db
          headers: { "Content-type": "multipart/form-data" },
        });
        const { data: filename } = response;
        await saveImage(filename); // Await saveImage to ensure it completes before proceeding
      } catch (error) {
        console.error("Error uploading photo:", error); //error logging
        alert("Failed to upload photo. Please try again.");
      }
    }
  }

  // Updated removePhoto function
  async function removePhoto() {
    if (!user.profileImages) return;

    try {
      // Make a delete request to the backend to remove the file and update the database
      const response = await axios.delete("/api/delete-photo", {
        data: { filename: user.profileImages },
      });

      if (response.status === 200) {
        console.log("Photo deleted successfully:", response.data);
        onChange(""); // Clear the current photo in the component state
        window.location.reload(); // Optional: reload to update UI if needed
      } else {
        console.error("Failed to delete photo:", response.data);
        alert("Failed to delete photo. Unexpected response from server.");
      }
    } catch (error) {
      console.error(
        "Error deleting photo:",
        error.response ? error.response.data : error.message
      );
      alert("Failed to delete photo. Please try again.");
    }
  }

  return (
    <>
      <div className="w-32 h-32 rounded-full overflow-hidden mb-4 bg-gray-200 flex items-center justify-center">
        {user.profileImages ? ( // Check if there is an image URL to display
          <img
            src={`http://localhost:4000/uploads/${user.profileImages}`}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg" //else display the default
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
      <div className="flex gap-2 items-center">
        <input
          value={photoLink}
          onChange={(ev) => setPhotoLink(ev.target.value)} //sets the photoLink to data
          type="text"
          placeholder="Add using a link....jpg"
          className="border px-2 py-1 rounded dark:text-black"
        />
        <div className="grid grid-flow-col gap-2">
          <button onClick={addPhotoByLink} className="primary">
            Add&nbsp;Photo {/*non breaking space*/}
          </button>
          <label className="bg-emerald-600 p-2 w-full text-white rounded-2xl cursor-pointer flex justify-center">
            Add From Device
            <input type="file" onChange={uploadPhoto} className="hidden" />
          </label>
          {user.profileImages && (
            <button
              onClick={removePhoto}
              className="secondary px-2 rounded-2xl"
            >
              Delete Photo
            </button>
          )}
        </div>
      </div>
    </>
  );
}
