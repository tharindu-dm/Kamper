import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import AccountNav from "../components/AccountNav.js";
import BookingDates from "../components/BookingDates.js";
import GearImg from "../components/GearImg.js";
import axios from "axios";

export default function RentingsPage() {
  const [rentings, setRentings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/rentings")
      .then((response) => {
        setRentings(response.data);
      })
      .catch((err) => {
        console.error("Error fetching rentings:", err);
      });
  }, []);

  const handleDelete = (rentingId) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this rent item?"
    );
    if (userConfirmed) {
      axios
        .delete(`/api/rentings/${rentingId}`)
        .then(() => {
          setRentings((prerentings) =>
            prerentings.filter((renting) => renting._id !== rentingId)
          );
        })
        .catch((err) => {
          console.error("Error deleting renting:", err);
        });
    }
  };

  return (
    <div>
      <AccountNav />
      <div className="mt-4">
        {rentings.length > 0 &&
          rentings.map((renting) => (
            <div
              key={renting._id}
              className="flex mb-2 gap-4 bg-gray-200 dark:bg-gray-700 rounded-2xl overflow-hidden p-3"
            >
              <div className="w-48">
                <GearImg gear={renting.gear} />
              </div>
              <div className="py-3 pr-3 grow">
                <Link to={`/account/rents/${renting._id}`} className="text-xl">
                  <h2>{renting.gear.type}</h2>
                </Link>
                <div className="text-xl">
                  <BookingDates
                    booking={renting}
                    className="mb-2 mt-4 text-gray-500"
                  />
                  <div className="flex gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-8 h-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                      />
                    </svg>
                    <span className="text-2xl">
                      Total price: ${renting.price}
                    </span>
                  </div>
                  <div className="flex gap-2 mt-4">
                    {/* Update button */}
                    <button
                      onClick={() =>
                        navigate(`/account/rents/update/${renting._id}`)
                      }
                      className="primary text-white px-4 py-2"
                    >
                      Update
                    </button>
                    {/* Delete button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevents triggering the Link click event
                        handleDelete(renting._id);
                      }}
                      className="bg-red-500 text-white px-4 py-2 rounded-2xl"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
