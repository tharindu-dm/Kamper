import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import AccountNav from "../components/AccountNav.js";
import BookingDates from "../components/BookingDates.js";
import PlaceImg from "../components/PlaceImg.js";
import axios from "axios";

export default function BookingPage() {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate(); // Import the useNavigate hook

  useEffect(() => {
    axios.get("/api/bookings").then((response) => {
      setBookings(response.data);
    });
  }, []);

  const handleDelete = (bookingId) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this booking?"
    );
    if (userConfirmed) {
      axios
        .delete(`/api/bookings/${bookingId}`)
        .then(() => {
          setBookings((prevBookings) =>
            prevBookings.filter((booking) => booking._id !== bookingId)
          );
        })
        .catch((err) => {
          console.error("Error deleting booking:", err);
        });
    }
  };

  return (
    <div>
      <AccountNav />
      <div className="mt-4">
        {bookings?.length > 0 &&
          bookings.map((booking) => (
            <div
              key={booking._id}
              className="flex mb-4 gap-4 bg-gray-200 dark:bg-gray-700 rounded-2xl overflow-hidden p-3"
            >
              <div className="w-48">
                <PlaceImg place={booking.place} />
              </div>
              <div className="py-3 pr-3 grow">
                {/* Link only for the title or image, not the whole container */}
                <Link
                  to={`/account/bookings/${booking._id}`}
                  className="text-xl"
                >
                  <h2>{booking.place.title}</h2>
                </Link>
                <div className="text-xl">
                  <BookingDates
                    booking={booking}
                    className="mb-2 mt-4 text-gray-500 "
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
                      Total price: ${booking.price}
                    </span>
                  </div>
                  <div className="flex gap-2 mt-4">
                    {/* Update button */}
                    <button
                      onClick={() =>
                        navigate(`/account/bookings/update/${booking._id}`)
                      }
                      className="primary text-white px-4 py-2"
                    >
                      Update
                    </button>
                    {/* Delete button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevents triggering the Link click event
                        handleDelete(booking._id);
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
