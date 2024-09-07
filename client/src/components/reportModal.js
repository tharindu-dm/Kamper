/*Modal is pop up window that appears on top of the main contents of a web page 
    and temporarily disables interactions with the rest of the page*/

import React from "react";
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
    backgroundColor: "rgba(0, 0, 0, 0.75)", // Semi-transparent background for overlay
  },
};

const ReportModal = ({
  isOpen,
  onRequestClose,
  selectedReport,
  formData,
  handleChange,
  handleSave,
  handleDelete,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
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
            onClick={onRequestClose}
            className="bg-gray-300 text-black py-2 px-4 rounded"
          >
            Close
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ReportModal;
