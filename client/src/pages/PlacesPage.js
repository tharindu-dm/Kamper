/**
 * @file PlacesPage.js
 * @description This page shows the user-added campsites and provides a link to add a new campsite. places state contain all the places after a successful read and mapping each Place to a Link component. The link will navigate to the PlacePage component with the place id as a parameter. 
 */
import { useEffect, useState } from "react";

import AccountNav from "../components/AccountNav";
import { Link } from "react-router-dom";
import PlaceImg from "../components/PlaceImg";
import axios from "axios";

export default function PlacesPage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/account/user-places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  return (
    <div>
      <AccountNav />
      <div className="text-center mt-5">
        {/* add campsite button */}
        <Link
          className="bg-primary inline-flex gap-1 text-white py-2 px-6 rounded-full"
          to={"/account/places/new"}
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
              fillRule="evenodd"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add a campsite
        </Link>
      </div>

      {/* list of user added campsites */}
      <div className="mt-4">
        {places.length > 0 &&
          places.map((place) => (
            <Link
              key={place._id}
              to={"/account/places/" + place._id}
              className="flex cursor-pointer bg-gray-100 dark:bg-gray-600 gap-4 p-4 rounded-2xl mb-4"
            >
              <div className="flex w-32 h-32 bg-gray-300 rounded-2xl">
                <PlaceImg place={place} />
              </div>
              <div className="grow-0 shrink">
                <h2 className="text-xl">{place.title}</h2>
                <p className="text-small mt-2 ">{place.description}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
