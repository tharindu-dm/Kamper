import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";

export default function UpdateBookingPage() {
  const { bookingId } = useParams(); // Get the booking ID from the URL
  const navigate = useNavigate(); // Import the useNavigate hook
  const [booking, setBooking] = useState(null); // Initialize the booking state
  const [numberOfGuests, setNumberOfGuests] = useState(1); // Initialize the number of guests state
  const [phone, setPhone] = useState(""); // Initialize the phone state
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
    // Check if the number of guests is less than 1
    if (numberOfGuests <= 0) {
      setError("Number of guests must be at least 1.");
      alert("Number of guests must be at least 1.");
      return false;
    }

    // Check if the number of guests exceeds the maximum allowed
    if (numberOfGuests > booking.place.maxGuests) {
      setError(`Number of guests cannot exceed ${booking.place.maxGuests}.`);
      alert(`Number of guests cannot exceed ${booking.place.maxGuests}.`);
      return false;
    }

    // Check if the phone number is exactly 10 digits
    if (!/^\d{10}$/.test(phone)) {
      setError("Phone number must be exactly 10 digits.");
      alert("Phone number must be exactly 10 digits.");
      return false;
    }

    setError(""); // Clear error if all validations pass
    return true;
  };

  const handleUpdate = () => {
    if (!validateInputs()) {
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
    const options = { year: "numeric", month: "long", day: "numeric" }; // Date formatting options
    return new Date(dateString).toLocaleDateString(undefined, options); // Return the formatted date
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
          className="border p-2 w-full dark:text-black"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Check-In</label>
        <input
          type="text"
          value={formatDate(booking.checkIn)} // Display only date
          readOnly
          className="border p-2 w-full dark:text-black"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Check-Out</label>
        <input
          type="text"
          value={formatDate(booking.checkOut)} // Display only date
          readOnly
          className="border p-2 w-full dark:text-black"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Number of Guests</label>
        <input
          type="number"
          value={numberOfGuests}
          onChange={(e) => setNumberOfGuests(parseInt(e.target.value))}
          className="border p-2 w-full dark:text-black"
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
          className="border p-2 w-full dark:text-black"
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
