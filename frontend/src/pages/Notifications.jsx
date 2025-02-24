import { useState } from "react";
import { FiBell, FiCheck, FiTrash2, FiX } from "react-icons/fi";
import { format } from "date-fns";

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      userName: "John Doe",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9",
      message: "Your solution received a like",
      timestamp: new Date(2024, 0, 10, 14, 30),
      isRead: false,
      solutionId: "sol-123"
    },
    {
      id: 2,
      userName: "Sarah Wilson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9",
      message: "Your solution received a like",
      timestamp: new Date(2024, 0, 10, 13, 45),
      isRead: true,
      solutionId: "sol-124"
    },
    {
      id: 3,
      userName: "Michael Brown",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9",
      message: "Your solution received a like",
      timestamp: new Date(2024, 0, 10, 12, 15),
      isRead: false,
      solutionId: "sol-125"
    }
  ]);

  const unreadCount = notifications.filter(notif => !notif.isRead).length;

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, isRead: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, isRead: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FiBell className="h-6 w-6 text-blue-500" />
                <h1 className="text-xl font-semibold text-gray-900">Notifications</h1>
                {unreadCount > 0 && (
                  <span className="px-2.5 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {unreadCount}
                  </span>
                )}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={markAllAsRead}
                  className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                  aria-label="Mark all as read"
                >
                  <FiCheck className="h-5 w-5" />
                </button>
                <button
                  onClick={clearAllNotifications}
                  className="px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
                  aria-label="Clear all notifications"
                >
                  <FiTrash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <p>No new notifications</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 sm:p-6 transition-all duration-200 ${notification.isRead ? "bg-white" : "bg-blue-50"} hover:bg-gray-50`}
                  role="article"
                  aria-label={`Notification from ${notification.userName}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <img
                        src={notification.avatar}
                        alt={notification.userName}
                        className="h-10 w-10 rounded-full"
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9";
                        }}
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {notification.userName}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {format(notification.timestamp, "MMM d, yyyy 'at' h:mm a")}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {!notification.isRead && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                          aria-label="Mark as read"
                        >
                          <FiCheck className="h-5 w-5" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="text-gray-400 hover:text-red-600 transition-colors"
                        aria-label="Delete notification"
                      >
                        <FiX className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
