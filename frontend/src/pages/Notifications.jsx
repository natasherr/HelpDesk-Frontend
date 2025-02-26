import { useContext } from "react";
import React from "react";
import { UserContext } from "../context/UserContext";
import { FiTrash2 } from "react-icons/fi";
import { HelpContext } from "../context/HelpContext";

const Notifications = () => {
  const { notification, deleteNotification } = useContext(HelpContext);
  const { current_user } = useContext(UserContext);

  return (
    <div className="dark:bg-white">
      {current_user ? (
        <div className="space-y-4">
          <div className="md:text-4xl sm:text-3xl text-2xl text-center font-serif font-extrabold border-b-2 dark:border-blue-500 rounded-b-md mb-6 border-yellow-500 text-white dark:text-black">
              Notifications
          </div>
          {notification && notification.length > 0 ? (
            <div>
              {notification.map((notifications) => (
                <div
                  key={notifications.id} // Unique key for React list items
                  className="w-full h-full py-10 flex flex-col gap-4 items-center justify-center bg-gray-900 dark:bg-white"
                >

                  {/* Notification Card */}
                  <div className="sm:w-[70%] w-[94%] mx-auto dark:bg-gray-300 bg-gray-700 p-4 rounded-md flex sm:gap-4 gap-2 items-center justify-between relative">
                    {/* Delete Button (Top Left Inside Card) */}
                    <button
                      onClick={() => deleteNotification(notifications.id)} // Correct ID
                      className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
                      aria-label="Delete notification"
                    >
                      <FiTrash2 size={20} />
                    </button>
                    {/* Notification Content */}
                    <div className="w-[80%] flex flex-col gap-1">
                      <div className="text-lg font-semibold font-serif text-white dark:text-black">
                        {notifications.actor.username}
                      </div>
                      <p className="text-sm dark:text-gray-600 text-gray-300">
                        {notifications.message}
                      </p>
                      <p className="text-[12px] text-semibold dark:text-gray-700 text-gray-400 text-right">
                        {notifications.created_at}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No notifications to display</p>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Notifications;
