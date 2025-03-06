import { useContext, useState, useEffect } from "react";
import React from "react";
import { UserContext } from "../context/UserContext";
import { FiTrash2, FiCheck } from "react-icons/fi";
import { HelpContext } from "../context/HelpContext";
import { Link } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Notifications = () => {
  const { notification, deleteNotification, markAsRead, unreadCount } = useContext(HelpContext);
  const { current_user } = useContext(UserContext);

  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    if (notification) {
      setLoading(false); // Stop loading when notifications arrive
    }
  }, [notification]);

  const navigate = useNavigate(); 
  const [error, setError] = useState(false);

  const handleLogin = () => {
    try {
      navigate("/login"); // Redirect to the login page
    } catch (err) {
      setError(true); // Set error state if navigation fails
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      {current_user ? (
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Notifications</h1>
              {unreadCount > 0 && (
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                  {unreadCount}
                </span>
              )}
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">Loading notifications...</p>
            </div>
          ) : notification && notification.length > 0 ? (
            <div className="space-y-4">
              {notification.map((notifications) => (
                <div
                  key={notifications.id}
                  className="w-full bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  {/* Notification Card */}
                  <div className="flex items-center justify-between gap-4">
                    {/* Mark as Read Button */}
                    {!notifications.is_read && (
                      <button
                      onClick={() => markAsRead(notifications.id)}
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 hover:bg-green-200 text-green-500 hover:text-green-600 transition-colors"
                      aria-label="Mark as read"
                    >
                      <FiCheck size={20} />
                    </button>
                    )}

                    {/* Notification Content */}
                    <Link
                      to={`/solutions/${notifications.id}`}
                      className="flex-1 flex flex-col gap-1"
                    >
                      <div className="text-lg font-semibold text-gray-900 dark:text-white">
                        {notifications.actor.username}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {notifications.message}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 text-right mt-2">
                        {new Date(notifications.created_at).toLocaleString()}
                      </p>
                    </Link>

                    {/* Delete Button */}
                    <button
                      onClick={() => deleteNotification(notifications.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                      aria-label="Delete notification"
                    >
                      <FiTrash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">No notifications to display</p>
            </div>
          )}
        </div>
      ) : (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 space-y-6">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <FaLock className="text-gray-700 dark:text-gray-300 text-4xl" aria-hidden="true" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Login Required
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Please log in to access your notifications
              </p>
            </div>

            <div className="mt-8">
              <button
                onClick={handleLogin}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform transition-all duration-200 ease-in-out active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Go to login page"
              >
                Go to Login
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;