import CloseIcon from "@mui/icons-material/Close";
import CropOriginalIcon from "@mui/icons-material/CropOriginal";

import { useState } from "react";
export default function PlaceGallery({ gear }) {
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 bg-black text-white min-h-screen">
        <div className="bg-black p-8 grid gap-4">
          <div>
            <h2 className="text-3xl mr-48">Photos of {gear.type}</h2>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="fixed right-12 top-28 flex gap-1 py-2 px-4 rounded-2xl shadow-black bg-white dark:bg-gray-800 text-black dark:text-white"
            >
              <CloseIcon></CloseIcon>
              Close photos
            </button>
          </div>
          {gear?.photos?.length > 0 &&
            gear.photos.map((photo) => (
              <div key={photo}>
                <img src={"http://localhost:4000/uploads/" + photo} alt="" />
              </div>
            ))}
        </div>
      </div>
    );
  }
  return (
    <div className="relative">
      <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
        <div>
          {gear.photos?.[0] && (
            <div>
              <img
                onClick={() => setShowAllPhotos(true)}
                className="w-full h-full aspect-square cursor-pointer object-cover"
                src={"http://localhost:4000/uploads/" + gear.photos[0]}
                alt=""
              />
            </div>
          )}
        </div>

        <div className="grid">
          {gear.photos?.[1] && (
            <img
              onClick={() => setShowAllPhotos(true)}
              className="w-full h-full aspect-square cursor-pointer object-cover"
              src={"http://localhost:4000/uploads/" + gear.photos[1]}
              alt=""
            />
          )}
          <div className="overflow-hidden">
            {" "}
            {/* adjust the 2nd image bottom align with main image(01) */}
            {gear.photos?.[2] && (
              <img
                onClick={() => setShowAllPhotos(true)}
                className="w-full h-full aspect-square cursor-pointer object-cover relative top-2"
                src={"http://localhost:4000/uploads/" + gear.photos[2]}
                alt=""
              />
            )}
          </div>
        </div>
      </div>
      <button
        onClick={() => setShowAllPhotos(true)}
        className="flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white dark:bg-gray-800 rounded-2xl shadow-md shadow-gray-500"
      >
        <CropOriginalIcon></CropOriginalIcon>
        Show more photos
      </button>
    </div>
  );
}
