import { useEffect, useState } from "react";
import AddressLink from "../components/AddressLink";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ReportPage() {
  const { id } = useParams();
  const [report, setReport] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/api/reports/${id}`).then((response) => {
      setReport(response.data);
    });
  }, [id]);

  if (!report) {
    return "";
  }

  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
      <h1 className="text-3xl">{report.title}</h1>
      <AddressLink>{report.address}</AddressLink>
      <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Description</h2>
            {report.description}
          </div>
        </div>
      </div>
    </div>
  );
}
