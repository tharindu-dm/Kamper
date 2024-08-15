import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState({});
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }

    axios.get("/place/" + id).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return <div>Looking everywhere...</div>;

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 bg-black text-white h-screen">
        <div className="p-8 grid gap-4 bg-black">
          <div>
            <h2 className="text-3xl">{place.title}</h2>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl shadow-black bg-white text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
              Close Photos
            </button>
          </div>
          {place?.photos?.length > 0 &&
            place.photos.map((photo) => (
              <div className="flex">
                <img
                  className="w-full"
                  src={"http://localhost:4000/uploads/" + photo}
                  alt={place.title}
                />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 pt-8 bg-gray-100 -mx-8 px-8">
      <h1 className="text-3xl">{place.title}</h1>

      <a
        className="flex gap-1 my-2 semi-bold underline"
        target="_blank"
        rel="noreferrer"
        href={"https://maps.google.com/?q=" + place.addres}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
          />
        </svg>

        {place.address}
      </a>
      <div className="relative">
        <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
          <div>
            {place.photos?.[0] && (
              <div className="aspect-square object-cover">
                <img
                  src={"http://localhost:4000/uploads/" + place.photos?.[0]}
                  alt={place.title}
                />
              </div>
            )}
          </div>
          <div className="grid">
            {place.photos?.[0] && (
              <img
                className="aspect-square object-cover"
                src={"http://localhost:4000/uploads/" + place.photos?.[1]}
                alt={place.title}
              />
            )}
            <div className="overflow-hidden">
              {place.photos?.[0] && (
                <img
                  className="aspect-square object-cover"
                  src={"http://localhost:4000/uploads/" + place.photos?.[2]}
                  alt={place.title}
                />
              )}
            </div>
          </div>
        </div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
            />
          </svg>

          <button
            onClick={() => setShowAllPhotos(true)}
            className="flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow-md shadow-gray-500"
          >
            Show more photos...
          </button>
        </div>

        <div className="mt-8grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
          <div>
            <div className="my-2">
              <h2 className="font-semibold text-2xl">Description</h2>
              {place.description}
            </div>

            <div className="my-2">
              <h2 className="font-semibold text-2xl">Perks</h2>
              {place.perks}
            </div>

            <div className="my-2">
            <h2 className="font-semibold text-2xl">Extra Info:</h2>
              <b>{place.extraInfo}</b>
            </div>

            <b>Check In: {place.checkIn}</b>
            <b>Check Out: {place.checkOut}</b>
            <b>Max Guests: {place.maxGuests}</b>
          </div>

          <div className="bg-white shadow p-4 rounded-2xl">
            <div className="text-2xl text-center">
              Price: ${place.price} / Per night
            </div>

            <div className="flex">
              <div className="">
                <div className="border py-3 px-4 rounded-2xl mt-2">
                  <label>Check in:</label>
                  <input type="date" />
                </div>

                <div className="border-l py-3 px-4 rounded-2xl mt-2">
                  <label>Check out:</label>
                  <input type="date" />
                </div>
              </div>

              <div className="ml-4">
                <div className="border-t py-3 px-4">
                  <label>Number of Guests:</label>
                  <input type="number" value={1} />
                </div>
              </div>
            </div>

            <button className="primary mt-4">Book Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
