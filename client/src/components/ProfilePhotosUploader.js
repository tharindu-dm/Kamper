import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../userContext";

export default function PhotosUploader({ addedPhoto, onChange }) {
  const { user } = useContext(UserContext);
  const [photoLink, setPhotoLink] = useState("");

  async function saveImage(photo) {
    try {
      // Make sure photo is a string
      if (Array.isArray(photo)) {
        photo = photo[0]; // Get the first element if it's an array
      }

      const userData = { addedPhotos: photo }; // Ensure it's a string
      const response = await axios.put("/api/update-profile", userData);

      if (response.status === 200) {
        console.log("Image saved successfully:", response.data);
        window.location.reload();
      } else {
        console.error("Unexpected response:", response.data);
        alert("Failed to save image. Unexpected response from server.");
      }
    } catch (error) {
      console.error(
        "Error saving image:",
        error.response ? error.response.data : error.message
      );
      alert("Failed to save image. Please try again.");
    }
  }

  async function addPhotoByLink(ev) {
    ev.preventDefault();
    if (!photoLink.trim()) {
      alert("Please enter a photo link.");
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
    const files = ev.target.files;
    const data = new FormData();

    if (files.length > 0) {
      data.append("photos", files[0]);

      try {
        const response = await axios.post("/api/upload", data, {
          headers: { "Content-type": "multipart/form-data" },
        });
        const { data: filename } = response;
        await saveImage(filename); // Await saveImage to ensure it completes before proceeding
      } catch (error) {
        console.error("Error uploading photo:", error);
        alert("Failed to upload photo. Please try again.");
      }
    }
  }

  function removePhoto() {
    onChange(""); // Clear the current photo
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
      <div className="flex gap-2 items-center">
        <input
          value={photoLink}
          onChange={(ev) => setPhotoLink(ev.target.value)}
          type="text"
          placeholder="Add using a link....jpg"
          className="border px-2 py-1 rounded dark:text-black"
        />
        <div className="grid grid-flow-col gap-2">
          <button onClick={addPhotoByLink} className="primary">
            Add&nbsp;Photo
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
