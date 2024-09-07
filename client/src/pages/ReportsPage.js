import React, { useEffect, useState } from "react";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import AccountNav from "../components/AccountNav";
import { Link } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Set the app element for accessibility

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    maxWidth: "500px",
    width: "100%",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
};

export default function ReportsPage() {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({ title: "", description: "" });

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = () => {
    axios.get("/account/user-reports").then(({ data }) => {
      console.log("Fetched reports:", data);
      setReports(data);
    });
  };

  const openModal = (report) => {
    console.log("Opening modal for report:", report);
    setSelectedReport(report);
    setFormData({ title: report.title, description: report.description });
    setModalIsOpen(true);
  };

  const closeModal = () => {
    console.log("Closing modal");
    setModalIsOpen(false);
    setSelectedReport(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    console.log("Saving report:", formData);
    axios
      .put(`/api/reports/${selectedReport._id}`, formData)
      .then(() => {
        fetchReports();
        closeModal();
      })
      .catch((error) => {
        console.error("Error saving report:", error);
      });
  };

  const handleDelete = () => {
    console.log(
      "Deleting report with URL:",
      `/api/reports/${selectedReport._id}`
    );
    axios
      .delete(`/api/reports/${selectedReport._id}`)
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
              onClick={() => {
                console.log("Report clicked:", report);
                openModal(report);
              }}
              className="flex cursor-pointer bg-gray-100 dark:bg-gray-700 gap-4 p-4 rounded-2xl mb-4"
            >
              <div className="flex items-center justify-center w-32 h-32 bg-gray-300 rounded-2xl">
                <LibraryBooksIcon fontSize="large" />
              </div>
              <div className="grow-0 shrink">
                <h2 className="text-xl">{report.title}</h2>
                <div className="text-small mt-2">{report.description}</div>
              </div>
            </div>
          ))}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Report Modal"
      >
        <h2 className="text-xl mb-4">
          {selectedReport ? selectedReport.title : ""}
        </h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label className="block mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleSave}
              className="bg-primary text-white py-2 px-4 rounded"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-500 text-white py-2 px-4 rounded"
            >
              Delete
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="bg-gray-300 text-black py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
