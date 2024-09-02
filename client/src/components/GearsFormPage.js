import { Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import AccountNavi from "../components/AccountNav";
import PhotosUploader from "../components/PhotosUploader";
import SearchCriteria from "./SearchCriteria";
import axios from "axios";

export default function PlacesFormPage() {
  const { id } = useParams();

  const [type, setType] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [searchCriteria, setSearchCriteria] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [capacity, setMaxCapacity] = useState(1);
  const [price, setPrice] = useState(100);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/account/gears/" + id).then((response) => {
      const { data } = response;
      setType(data.type);
      setAddedPhotos(data.photos); // || []
      setDescription(data.description);
      setSearchCriteria(data.searchCriteria);
      setExtraInfo(data.extraInfo);
      setMaxCapacity(data.capacity);
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
        {inputDescription(description)}
      </>
    );
  }

  async function saveGear(ev) {
    ev.preventDefault();
    const gearData = {
      type,
      addedPhotos,
      description,
      searchCriteria,
      extraInfo,
      capacity,
      price,
    };

    if (id) {
      await axios.put("/account/gears", {
        id,
        ...gearData,
      });
      setRedirect(true);
    } else {
      await axios.post("/account/gears", gearData);
      setRedirect(true);
    }
  }

  async function deleteGear(ev) {    
    ev.preventDefault();

    if (window.confirm("Are you sure you want to delete this gear?")) {
      try {
        await axios.delete("/account/gears/" + id);
        setRedirect(true);
      } catch (error) {
        console.error("Error deleting gear:", error);
        alert("Failed to delete gear. Please try again.");
      }
    }
  }

  if (redirect) {
    return <Navigate to={"/account/gears"} />;
  }

  return (
    <div>
      <AccountNavi />
      <form className="px-40" onSubmit={saveGear}>
        {preInput(
          "Type",
          "type of your gear"
        )}
        <input
          type="text"
          placeholder="type, eg: my camping tent"
          value={type}
          onChange={(ev) => setType(ev.target.value)}
        />

        {preInput("Photos", "more the better")}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

        {preInput("Description", "Description of the gear")}
        <textarea
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />

        {preInput("Search Criteria", "Criteria of which the gear can be searched")}
        <SearchCriteria selected={searchCriteria} onChange={setSearchCriteria} />

        {preInput(
          "Extra info.",
          "Maintenance rules and Extra information about the gear"
        )}
        <textarea
          value={extraInfo}
          onChange={(ev) => setExtraInfo(ev.target.value)}
        />

        {preInput(
          "Capacity",
          "Add capacity of the gear, eg: 2 people, 4 people or 30L"
        )}
        <div className="grid gap-2 sm:grid-col-2 md:grid-cols-4">
          <div>
            <h3 className="mt-2 mb-1">Capacity</h3>
            <input
              type="number"
              value={capacity}
              onChange={(ev) => setMaxCapacity(ev.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 mb-1">Price per night</h3>
            <input
              type="number"
              value={price}
              onChange={(ev) => setPrice(ev.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-3">
          <button
            className="rounded-2xl text-white  bg-red-500 mt-4"
            onClick={deleteGear}
          >
            Delete Gear
          </button>
        <button className="primary mt-4"> Save </button>
        </div>
      </form>
    </div>
  );
}
