import { useState, useEffect } from "react";
import { FiSearch, FiServer, FiMonitor, FiHardDrive, FiWifi, FiUser, FiCreditCard } from "react-icons/fi";
import { motion } from "framer-motion";

const HelpDeskCategories = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("alphabetical");
  const [filteredCategories, setFilteredCategories] = useState([]);

  const categories = [
    {
      id: 1,
      name: "Technical Support",
      description: "General technical assistance and system support",
      icon: <FiServer className="w-8 h-8" />,
      solutions: 156,
      lastUpdated: "2024-01-15"
    },
    {
      id: 2,
      name: "Software Issues",
      description: "Application errors and software-related problems",
      icon: <FiMonitor className="w-8 h-8" />,
      solutions: 243,
      lastUpdated: "2024-01-14"
    },
    {
      id: 3,
      name: "Hardware Troubleshooting",
      description: "Physical device and hardware-related issues",
      icon: <FiHardDrive className="w-8 h-8" />,
      solutions: 189,
      lastUpdated: "2024-01-13"
    },
    {
      id: 4,
      name: "Network Problems",
      description: "Connection and network infrastructure support",
      icon: <FiWifi className="w-8 h-8" />,
      solutions: 167,
      lastUpdated: "2024-01-12"
    },
    {
      id: 5,
      name: "Account Management",
      description: "User account and access-related assistance",
      icon: <FiUser className="w-8 h-8" />,
      solutions: 134,
      lastUpdated: "2024-01-11"
    },
    {
      id: 6,
      name: "Billing Inquiries",
      description: "Payment and subscription-related support",
      icon: <FiCreditCard className="w-8 h-8" />,
      solutions: 98,
      lastUpdated: "2024-01-10"
    }
  ];

  useEffect(() => {
    const sortCategories = (cats) => {
      return [...cats].sort((a, b) => {
        switch (sortBy) {
          case "alphabetical":
            return a.name.localeCompare(b.name);
          case "solutions":
            return b.solutions - a.solutions;
          case "recent":
            return new Date(b.lastUpdated) - new Date(a.lastUpdated);
          default:
            return 0;
        }
      });
    };

    const filtered = categories.filter((category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredCategories(sortCategories(filtered));
  }, [searchTerm, sortBy]);

  const CategoryCard = ({ category }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      tabIndex={0}
      role="button"
      aria-label={`${category.name} category with ${category.solutions} solutions`}
      >
      <div className="flex items-center justify-between mb-4">
        <div className="text-blue-600">{category.icon}</div>
        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
          {category.solutions} solutions
        </span>
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{category.name}</h3>
      <p className="text-gray-600">{category.description}</p>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Help Desk Categories</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search categories..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="alphabetical">Sort by Name</option>
              <option value="solutions">Sort by Solutions</option>
              <option value="recent">Sort by Recent</option>
            </select>
          </div>
        </div>

        {filteredCategories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">No categories found</h2>
            <p className="text-gray-500">Try adjusting your search terms or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HelpDeskCategories;