import React, { useState, useEffect } from "react";
import { FaThumbsUp, FaThumbsDown, FaComment, FaTrash, FaBell } from "react-icons/fa";
import { format } from "date-fns";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const mockNotifications = [
    {
      id: 1,
      type: "like",
      user: {
        name: "John Doe",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
      },
      problemTitle: "How to implement Redux in React?",
      timestamp: new Date(2024, 0, 15, 10, 30),
      read: false
    },
    {
      id: 2,
      type: "dislike",
      user: {
        name: "Jane Smith",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
      },
      problemTitle: "Best practices for React performance",
      timestamp: new Date(2024, 0, 14, 15, 45),
      read: true
    },
    {
      id: 3,
      type: "reply",
      user: {
        name: "Mike Johnson",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
      },
      problemTitle: "Understanding React Hooks",
      replySnippet: "I think the best approach would be...",
      timestamp: new Date(2024, 0, 13, 9, 15),
      read: false
    }
  ];

  useEffect(() => {
    const fetchNotifications = () => {
      setLoading(true);
      setTimeout(() => {
        setNotifications(mockNotifications);
        setLoading(false);
      }, 1000);
    };
    fetchNotifications();
  }, []);

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === "all") return true;
    return notification.type === filter;
  });

  const NotificationCard = ({ notification }) => {
    const getBackgroundColor = (type) => {
      switch (type) {
        case "like":
          return "bg-green-50";
        case "dislike":
          return "bg-red-50";
        default:
          return "bg-blue-50";
      }
    };

    const getIcon = (type) => {
      switch (type) {
        case "like":
          return <FaThumbsUp className="text-green-500" />;
        case "dislike":
          return <FaThumbsDown className="text-red-500" />;
        default:
          return <FaComment className="text-blue-500" />;
      }
    };

    return (
      <div
        className={`p-4 mb-3 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md
          ${getBackgroundColor(notification.type)}
          ${!notification.read ? "border-l-4 border-blue-500" : ""}`}
        onClick={() => markAsRead(notification.id)}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <img
              src={notification.user.avatar}
              alt={notification.user.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold">{notification.user.name}</span>
                {getIcon(notification.type)}
              </div>
              <p className="text-gray-600 mt-1">{notification.problemTitle}</p>
              {notification.type === "reply" && (
                <p className="text-gray-500 mt-1 text-sm">{notification.replySnippet}</p>
              )}
              <p className="text-xs text-gray-400 mt-2">
                {format(notification.timestamp, "MMM d, yyyy 'at' h:mm a")}
              </p>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteNotification(notification.id);
            }}
            className="text-gray-400 hover:text-red-500 transition-colors duration-200"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        {[1, 2, 3].map((n) => (
          <div key={n} className="animate-pulse mb-3">
            <div className="h-24 bg-gray-200 rounded-lg"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <FaBell className="text-blue-500 text-xl" />
          <h1 className="text-2xl font-bold">Notifications</h1>
          <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-sm">
            {notifications.filter(n => !n.read).length}
          </span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={markAllAsRead}
            className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            Mark All as Read
          </button>
          <button
            onClick={clearAllNotifications}
            className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
          >
            Clear All
          </button>
        </div>
      </div>

      <div className="flex space-x-2 mb-6">
        {["all", "like", "dislike", "reply"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-lg capitalize transition-colors duration-200
              ${filter === type ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
          >
            {type}
          </button>
        ))}
      </div>

      {filteredNotifications.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No notifications to display
        </div>
      ) : (
        <div className="space-y-4">
          {filteredNotifications.map((notification) => (
            <NotificationCard key={notification.id} notification={notification} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;