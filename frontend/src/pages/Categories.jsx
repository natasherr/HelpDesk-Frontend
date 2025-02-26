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
      className="bg-neutral-900/50 p-8 text-center shadow-lg rounded-md border border-neutral-800"
      tabIndex={0}
      role="button"
      aria-label={`${category.name} category with ${category.solutions} solutions`}
    >
      <div className="flex items-center justify-center mb-4">
        <div className="h-12 w-12 bg-gradient-to-r from-indigo-500 to-indigo-700 p-3 rounded-full flex items-center justify-center text-white">
          {category.icon}
        </div>
      </div>
      <h3 className="text-xl font-semibold text-gray-300 mb-2">{category.name}</h3>
      <p className="text-gray-400 mb-4">{category.description}</p>
      <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
        {category.solutions} solutions
      </span>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-black text-white py-10 px-6">
      <section id="features" className="relative max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-gray-400 my-3 uppercase font-medium tracking-wider">Help Desk Categories</span>
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
            Find the Help You Need Quickly
          </h2>
          <p className="text-gray-400 mx-auto max-w-xl my-4 font-medium tracking-wide">
            Explore different help desk categories and find solutions for your technical, billing, and service-related issues.
          </p>
        </div>

        {/* Search and Sort Controls */}
        <div className="flex justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <FiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search categories"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-4 py-2 rounded-md border border-gray-700 bg-gray-800 text-white"
              />
            </div>
          </div>

          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-800 text-white border border-gray-700 rounded-md px-4 py-2"
            >
              <option value="alphabetical">Sort by: Alphabetical</option>
              <option value="solutions">Sort by: Solutions</option>
              <option value="recent">Sort by: Most Recent</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 pt-14">
          {filteredCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HelpDeskCategories;
