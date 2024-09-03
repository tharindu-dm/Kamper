import { useEffect, useState } from "react";

import AddressLink from "../components/AddressLink";
import BookingWidget from "../BookingWidget";
import PlaceGallery from "../components/PlaceGallery";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/api/places/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) {
    return "";
  }

  return (
    <div className="bg-emerald-50 dark:bg-gray-700 rounded-2xl mt-4 mx-8 px-8 pt-8">
      <h1 className="text-4xl font-bold">{place.title}</h1>
      <AddressLink>{place.address}</AddressLink>
      <PlaceGallery place={place} />

      <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Description</h2>
            {place.description}
          </div>
          <div className="grid grid-flow-row">
            <div className="grid grid-flow-col gap-8">
              <div className="border  bg-primary text-white p-2 rounded-xl text-center flex-col w-auto">
                <h2 className="text-xl mb-2">Check-In Time</h2>
                <div className="bg-white dark:bg-gray-800 text-black dark:text-white rounded-b-lg font-bold text-2xl">
                  {place.checkIn}
                </div>
              </div>

              <div className="border  bg-primary text-white p-2 rounded-xl text-center flex-col w-auto">
                <h2 className="text-xl mb-2">Check-Out Time</h2>
                <div className="bg-white dark:bg-gray-800 text-black dark:text-white rounded-b-lg font-bold text-2xl">
                  {place.checkOut}
                </div>
              </div>

              <div className="border bg-primary text-white p-2 rounded-xl text-center flex-col w-auto">
                <h2 className="text-xl mb-2">Max Number Of Guests</h2>
                <div className="bg-white dark:bg-gray-800 text-black dark:text-white rounded-b-lg font-bold text-2xl">
                  {place.maxGuests}
                </div>
              </div>
            </div>
            <div className="mt-3 p-3 border-primary dark:border-emerald-600 border rounded-2xl w-full">
              <div className="">
                <h2 className="font-semibold text-2xl">Extra info</h2>
              </div>
              <div className="mb-4 mt-2 text-md text-gray-700 dark:text-gray-200 leading-5 ">
                {place.extraInfo}
              </div>
            </div>
            <div className="mt-3 mb-3 p-3 border-primary dark:border-emerald-600 border rounded-2xl w-full">
              <div className="">
                <h2 className="font-semibold text-2xl">Perks</h2>
              </div>
              <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">
                <div className="grid grid-flow-col gap-6">
                  {place.perks.map((perk, index) => (
                    <div
                      key={index}
                      className="flex rounded-xl border-emerald-900 dark:text-gray-200 dark:border-emerald-600 border-2 justify-center font-semibold text-lg p-1"
                    >
                      {perk.toUpperCase()}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <BookingWidget place={place} />
        </div>
      </div>
    </div>
  );
}
