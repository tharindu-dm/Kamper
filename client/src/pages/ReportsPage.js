// ReportsPage.js
import React, { useEffect, useState } from "react";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import AccountNav from "../components/AccountNav";
import { Link } from "react-router-dom";
import axios from "axios";
import ReportModal from "../components/reportModal"; // Importing our ReportModal component

export default function ReportsPage() {
  const [reports, setReports] = useState([]); // State for reports
  const [selectedReport, setSelectedReport] = useState(null); // Selected report for viewing modal
  const [modalIsOpen, setModalIsOpen] = useState(false); // Checks if the modal is open
  const [formData, setFormData] = useState({ title: "", description: "" }); // Form is initially empty

  useEffect(() => {
    fetchReports(); // Fetches the reports to list them
  }, []);

  const fetchReports = () => {
    axios.get("/account/user-reports").then(({ data }) => {
      setReports(data);
    });
  };

  const openModal = (report) => {
    setSelectedReport(report);
    setFormData({ title: report.title, description: report.description });
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedReport(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); //form data is set to the input
  };

  const handleSave = () => {
    axios
      .put(`/api/reports/${selectedReport._id}`, formData) //saves the edits on selected report
      .then(() => {
        fetchReports();
        closeModal();
      })
      .catch((error) => {
        console.error("Error saving report:", error);
      });
  };

  const handleDelete = () => {
    axios
      .delete(`/api/reports/${selectedReport._id}`) //delets the selected reports
      .then(() => {
        fetchReports();
        closeModal();
      })
      .catch((error) => {
        console.error("Error deleting report:", error);
      });
  };

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
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add new report
        </Link>
      </div>

      <div className="mt-4">
        {reports.length > 0 &&
          reports.map((report) => (
            <div
              key={report._id}
              onClick={() => openModal(report)} //opens the selected report
              className="flex cursor-pointer bg-gray-100 dark:bg-gray-700 gap-4 p-4 rounded-2xl mb-4"
            >
              <div className="flex items-center justify-center w-32 h-32 bg-gray-300 rounded-2xl">
                <LibraryBooksIcon fontSize="large" />{" "}
                {/*icon for the reports */}
              </div>
              <div className="grow-0 shrink">
                <h2 className="text-xl">{report.title}</h2>
                <div className="text-small mt-2">{report.description}</div>
              </div>
            </div>
          ))}
      </div>

      <ReportModal //our report modal component
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        selectedReport={selectedReport}
        formData={formData}
        handleChange={handleChange}
        handleSave={handleSave}
        handleDelete={handleDelete}
      />
    </div>
  );
}
