'use client';

import React, { useState } from 'react';

const EditProfileModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Manage modal visibility

  // Function to toggle the modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      {/* Button to trigger the modal */}
      <button
        type="button"
        onClick={toggleModal}
        className="bg-blue-500 max-w-96 text-white p-2 rounded-md disabled:bg-pink-200 disabled:cursor-not-allowed"
      >
        Edit
      </button>

      {/* Modal Popup for Editing */}
      {isModalOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            onClick={toggleModal} // Close when clicking outside
          ></div>

          {/* Modal content */}
          <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="bg-white p-5 rounded shadow-lg w-96">
              <h2 className="text-2xl mb-4">Edit Profile</h2>

              <form className="flex flex-col gap-4">
                <label className="text-sm text-gray-700">Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="noname"
                  className="ring-1 ring-gray-300 rounded-md p-2"
                />
                <label className="text-sm text-gray-700">Address</label>
                <input
                  type="text"
                  name="address"
                  placeholder="nonaddress"
                  className="ring-1 ring-gray-300 rounded-md p-2"
                />
                <label className="text-sm text-gray-700">Phone</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="nophone"
                  className="ring-1 ring-gray-300 rounded-md p-2"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={toggleModal} // Close modal when clicking "Cancel"
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default EditProfileModal;
