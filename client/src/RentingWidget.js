import { useContext, useEffect, useState } from "react";

import { Navigate } from "react-router-dom";
import { UserContext } from "./userContext"; /* path will be updated */
import axios from "axios";
import { differenceInCalendarDays } from "date-fns";

export default function RentingWidget({ gear }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberofItems, setNumberOfItems] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }
  const totalPrice =
    numberOfNights > 0 ? numberOfNights * gear.price : gear.price;

  async function rentThisItem() {
    const response = await axios.post("/api/rentings", {
      checkIn,
      checkOut,
      numberofItems,
      name,
      phone,
      gear: gear._id,
      price: totalPrice,
    });
    const rentingId = response.data._id;
    setRedirect(`/account/rents/${rentingId}`);
 }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="text-2xl text-center">
        Price: ${gear.price} / per night
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="py-3 px-4">
            <label>From:</label>
            <input
              type="date"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
            />
          </div>
          <div className="py-3 px-4 border-l">
            <label>To:</label>
            <input
              type="date"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
            />
          </div>
        </div>
        <div className="py-3 px-4 border-t">
          <label>Number of Items:</label>
          <input
            type="number"
            value={numberofItems}
            onChange={(ev) => setNumberOfItems(ev.target.value)}
          />
        </div>
        {numberOfNights > 0 && (
          <div className="py-3 px-4 border-t">
            <label>Your full name:</label>
            <input
              type="text"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />
            <label>Phone number:</label>
            <input
              type="tel"
              value={phone}
              onChange={(ev) => setPhone(ev.target.value)}
            />
          </div>
        )}
      </div>
      <button onClick={rentThisItem} className="primary mt-4">
        Rent This Item
        {numberOfNights > 0 && <span> ${numberOfNights * gear.price}</span>}
      </button>
    </div>
  );
}
