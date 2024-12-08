"use client";

import { useState } from "react";

const WebNotifModalItem = ({ notif,toggleReadStatus }) => {
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  
  const showNotif = () => {
    setIsNotifOpen(true);
    notif.readStatus = true;
    toggleReadStatus(notif.id)
  }

  const hideNotif = () => {
    setIsNotifOpen(false);
  }

  return <div className={`p-2 hover:bg-gray-200 hover:cursor-pointer ${notif.readStatus?'':"bg-blue-100"}`} >
    <div onClick={showNotif}>{notif.message}</div>
    
      {/* Background overlay when notification is visible */}
      {isNotifOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 hover:cursor-default"
          onClick={hideNotif}
        ></div>
      )}

      {/* Notification */}
      {isNotifOpen && (
        <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 w-96 bg-white shadow-xl p-6 rounded-lg z-50 hover:cursor-default">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Notifications</span>
            <button
              onClick={hideNotif}
              className="text-xl font-bold text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              &times;
            </button>
          </div>
        <p className="mt-4">{ notif.message}</p>
          <div className="mt-4 flex justify-end">
            <button
              onClick={hideNotif}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 cursor-pointer"
            >
              OK
            </button>
          </div>
        </div>
      )}
  </div>
}

export default WebNotifModalItem;