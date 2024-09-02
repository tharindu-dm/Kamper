import { useEffect, useState } from "react";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import AccountNav from "../components/AccountNav";
import { Link } from "react-router-dom";

import axios from "axios";

export default function ReportsPage() {
  const [places, setReports] = useState([]);
  useEffect(() => {
    axios.get("/account/user-reports").then(({ data }) => {
      setReports(data);
    });
  }, []);

  return (
    <div>
      <AccountNav />
      <div className="text-center mt-5">
        <Link
          className="bg-primary inline-flex gap-1 text-white py-2 px-6 rounded-full"
          to={"/account/reports/new"}
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
          Add new report
        </Link>
      </div>

      <div className="mt-4">
        {places.length > 0 &&
          places.map((place) => (
            <p
              key={place._id}
              to={"/account/reports/" + place._id}
              className="flex cursor-pointer bg-gray-100 gap-4 p-4 rounded-2xl mb-4"
            >
              <div className="flex items-center justify-center w-32 h-32 bg-gray-300 rounded-2xl">
                <ReportProblemIcon fontSize="large" />
              </div>
              <div className="grow-0 shrink">
                <h2 className="text-xl">{place.title}</h2>
                <p className="text-small mt-2 ">{place.description}</p>
              </div>
            </p>
          ))}
      </div>
    </div>
  );
}
