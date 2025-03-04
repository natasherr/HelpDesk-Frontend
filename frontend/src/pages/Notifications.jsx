import { useContext, useState, useEffect } from "react";
import React from "react";
import { UserContext } from "../context/UserContext";
import { FiTrash2, FiCheck } from "react-icons/fi";
import { HelpContext } from "../context/HelpContext";
import { Link } from "react-router-dom";

const Notifications = () => {
  const { notification, deleteNotification, markAsRead, unreadCount } = useContext(HelpContext);
  const { current_user } = useContext(UserContext);

  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    if (notification) {
      setLoading(false); // Stop loading when notifications arrive
    }
  }, [notification]);

  return (
    <div className="dark:bg-white">
      {current_user ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
              {unreadCount > 0 && (
                <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-sm">
                  {unreadCount}
                </span>
              )}
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Loading notifications...</p>
            </div>
          ) : notification && notification.length > 0 ? (
            <div>
              {notification.map((notifications) => (
                <div
                  key={notifications.id} 
                  className="w-full h-full py-10 flex flex-col gap-4 items-center justify-center bg-gray-900 dark:bg-white"
                >
                  {/* Notification Card */}
                  <div 
                    className="sm:w-[70%] w-[94%] mx-auto dark:bg-gray-300 bg-gray-700 p-4 rounded-md flex sm:gap-4 gap-2 items-center justify-between relative"
                  >
                    {/* Mark as Read Button */}
                    {!notifications.is_read && (
                      <button
                        onClick={() => markAsRead(notifications.id)}
                        className="text-green-500 hover:text-green-600 transition-colors"
                        aria-label="Mark as read"
                      >
                        <FiCheck size={18} />
                      </button>
                    )}

                    {/* Delete Button */}
                    <button
                      onClick={() => deleteNotification(notifications.id)}
                      className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
                      aria-label="Delete notification"
                    >
                      <FiTrash2 size={20} />
                    </button>

                    {/* Notification Content */}
                    <Link to={`/solutions/${notifications.id}`} className="w-[80%] flex flex-col gap-1">
                      <div className="text-lg font-semibold font-serif text-white dark:text-black">
                        {notifications.actor.username}
                      </div>
                      <p className="text-sm dark:text-gray-600 text-gray-300">
                        {notifications.message}
                      </p>
                      <p className="text-[12px] text-semibold dark:text-gray-700 text-gray-400 text-right">
                        {new Date(notifications.created_at).toLocaleString()}
                      </p>
                    </Link>
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
