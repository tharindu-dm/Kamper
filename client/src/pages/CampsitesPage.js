import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import axios from "axios";

export default function IndexPage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/api/place").then((response) => {
      setPlaces(response.data);
    });
  }, []);

  return (
    <>
    <div className="mt-8 grid gap-6 gap-y-8 grid-cols-4 md:grid-cols-3 lg:grid-cols-6">
      {places.length > 0 &&
        places.map((place) => (
          <Link
            key={place._id}
            to={"/place/" + place._id}
            className=""
          >
            <div className="hover:border-b-8 hover:border-emerald-800 hover:rounded-b-lg  p-0.5">
              <div className="bg-gray-500 rounded-2xl flex">
                {place.photos && place.photos.length > 0 && (
                  <img
                    className="w-full h-full rounded-2xl object-cover aspect-square"
                    src={"http://localhost:4000/uploads/" + place.photos[0]}
                    alt={place.title}
                  />
                )}
              </div>
              <h2 className="text-sm truncate">{place.title}</h2>
              <h3 className="text-sm font-bold">{place.address}</h3>
              <div className="mt-1">
                <span className="font-bold">${place.price}</span>/night
              </div>
            </div>
          </Link>
        ))}
    </div>
    </>
  );
}
