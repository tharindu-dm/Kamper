/**
 * @Component PlaceGallery
 * @Description
 * This component is used to display the gallery of the place.
 * It will display the first 3 images of the place and a button to show more images.
 * There will always be three images, since the placesFormPage validations require at least 3 images to submit a campsite.
 * SetShowALlPhotos is used to toggle between the gallery view and the single (3)image view.
 */

import CloseIcon from "@mui/icons-material/Close";
import CropOriginalIcon from "@mui/icons-material/CropOriginal";
import { useState } from "react";

export default function PlaceGallery({ place }) {
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 bg-black text-white min-h-screen">
        <div className="bg-black p-8 grid gap-4">
          <div>
            <h2 className="text-3xl mr-48">Photos of {place.title}</h2>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="fixed right-12 top-28 flex gap-1 py-2 px-4 rounded-2xl shadow-black bg-white dark:bg-gray-800 text-black dark:text-white"
            >
              <CloseIcon></CloseIcon>
              Close photos
            </button>
          </div>
          {place?.photos?.length > 0 &&
            place.photos.map((photo) => (
              <div key={photo}>
                <img src={"http://localhost:4000/uploads/" + photo} alt="" />
              </div>
            ))}
        </div>
      </div>
    );
  }
  return (
    <div className="relative pt-5">
      <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
        <div className="flex">
          {place.photos?.[0] && (
            <div className="flex w-full">
              <img
                onClick={() => setShowAllPhotos(true)}
                className=" w-full h-full aspect-square cursor-pointer object-cover"
                src={"http://localhost:4000/uploads/" + place.photos[0]}
                alt=""
              />
            </div>
          )}
        </div>

        <div className="grid gap-2 h-full">
          {place.photos?.[1] && (
            <img
              onClick={() => setShowAllPhotos(true)}
              className="w-full h-full object-cover cursor-pointer"
              src={"http://localhost:4000/uploads/" + place.photos[1]}
              alt=""
            />
          )}
          {place.photos?.[2] && (
            <img
              onClick={() => setShowAllPhotos(true)}
              className="w-full h-full object-cover cursor-pointer"
              src={"http://localhost:4000/uploads/" + place.photos[2]}
              alt=""
            />
          )}
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
