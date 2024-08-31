import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";

export default function UpdateBookingPage() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(""); // State to store error messages

  useEffect(() => {
    axios
      .get(`/api/bookings/${bookingId}`)
      .then((response) => {
        setBooking(response.data);
        setNumberOfGuests(response.data.numberOfGuests);
        setPhone(response.data.phone);
      })
      .catch((err) => {
        console.error("Error fetching booking:", err);
      });
  }, [bookingId]);

  // Function to validate user input
  const validateInputs = () => {
    if (numberOfGuests <= 0) {
      setError("Number of guests must be at least 1.");
      return false;
    }

    if (numberOfGuests > booking.place.maxGuests) {
      setError(`Number of guests cannot exceed ${booking.place.maxGuests}.`);
      return false;
    }

    if (!/^\d{10}$/.test(phone)) {
      setError("Phone number must be exactly 10 digits.");
      return false;
    }

    setError(""); // Clear error if all validations pass
    return true;
  };

  const handleUpdate = () => {
    if (!validateInputs()) {
      alert("Invalid Inputs!!! \nClick 'OK' to show the error"); // Display the error message and stop the update process
      return;
    }

    axios
      .put(`/api/bookings/${bookingId}`, { numberOfGuests, phone })
      .then(() => {
        navigate("/account/bookings");
      })
      .catch((err) => {
        console.error("Error updating booking:", err);
      });
  };

  if (!booking) return <div>Loading...</div>;

  // Format date to display only the date part
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Update Booking</h2>
      <div className="mb-4">
        <label className="block mb-2">Place Title</label>
        <input
          type="text"
          value={booking.place.title}
          readOnly
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Check-In</label>
        <input
          type="text"
          value={formatDate(booking.checkIn)} // Display only date
          readOnly
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Check-Out</label>
        <input
          type="text"
          value={formatDate(booking.checkOut)} // Display only date
          readOnly
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Number of Guests</label>
        <input
          type="number"
          value={numberOfGuests}
          onChange={(e) => setNumberOfGuests(parseInt(e.target.value))}
          className="border p-2 w-full"
          min={1}
          max={booking.place.maxGuests}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Phone</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border p-2 w-full"
          maxLength={10}
        />
      </div>
      <button
        onClick={handleUpdate}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Update
      </button>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
}
