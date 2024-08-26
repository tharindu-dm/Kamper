import { useEffect, useState } from "react";
import axios from "axios";
import AccountNavi from "../components/AccountNav";
import { Navigate, useParams } from "react-router-dom";

export default function PlacesFormPage() {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/account/reports/" + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos); // || []
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    });
  }, [id]);

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }

  function inputDescription(text) {
    return <p className="text-sm text-gray-500">{text}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(header)}
      </>
    );
  }

  async function savePlace(ev) {
    ev.preventDefault();
    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };

    if (id) {
      await axios.put("/account/reports", {
        id,
        ...placeData,
      });
      setRedirect(true);
    } else {
      await axios.post("/account/reports", placeData);
      setRedirect(true);
    }
  }

  async function deletePlace() {
    if (window.confirm("Are you sure you want to delete this place?")) {
      await axios.delete("/account/reports/" + id);
      setRedirect(true);
    }
  }
  

  if (redirect) {
    return <Navigate to={"/account/reports"} />;
  }

  return (
    <div>
      <AccountNavi />
      <form className="px-40" onSubmit={savePlace}>
        {preInput(
          "Title",
          "title for your place, should be short and catchy as in advertisement"
        )}
        <input
          type="text"
          placeholder="title, eg: my lovely apartment"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />

        {preInput("Description", "Description of the place")}
        <textarea
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />

        <div className="flex gap-3">
          <button className="rounded-2xl text-white  bg-red-500 mt-4" onClick={deletePlace}>
            Delete Place
          </button>
          <button className="primary mt-4"> Save </button>
        </div>
      </form>
    </div>
  );
}
