import { useState } from "react";
import { FiEdit2, FiHelpCircle, FiCheckCircle, FiArrowRight } from "react-icons/fi";
import { BsLightbulb } from "react-icons/bs";

const Profile = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userData, setUserData] = useState({
    username: "John Developer",
    email: "john.dev@example.com",
    profilePic: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9",
    stats: {
      problemsSubmitted: 24,
      helpfulVotes: 156,
      solutionsProvided: 47
    },
    solutions: [
      {
        id: 1,
        title: "Fixed API Authentication Issue",
        date: "2024-01-15",
        votes: 23,
        status: "Accepted"
      },
      {
        id: 2,
        title: "Database Optimization Solution",
        date: "2024-01-10",
        votes: 15,
        status: "Pending"
      }
    ],
    problems: [
      {
        id: 1,
        title: "React Performance Issues",
        date: "2024-01-05",
        status: "Open",
        solutions: 3
      },
      {
        id: 2,
        title: "Authentication Flow Bug",
        date: "2024-01-01",
        status: "Resolved",
        solutions: 5
      }
    ]
  });

  const EditProfileModal = () => (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${isEditModalOpen ? 'block' : 'hidden'}`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 dark:text-white">Edit Profile</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Profile Picture</label>
            <div className="mt-1 flex items-center">
              <img src={userData.profilePic} alt="Profile" className="h-12 w-12 rounded-full" />
              <button type="button" className="ml-4 px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                Change
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
            <input type="text" defaultValue={userData.username} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input type="email" defaultValue={userData.email} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600" />
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <EditProfileModal />
      
      {/* Profile Header */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <div className="relative group">
              <img
                src={userData.profilePic}
                alt="Profile"
                className="h-32 w-32 rounded-full object-cover"
              />
              <div className="absolute inset-0 rounded-full bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <FiEdit2 className="text-white text-xl" />
              </div>
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{userData.username}</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">{userData.email}</p>
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <FiEdit2 className="mr-2" /> Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <FiHelpCircle className="text-blue-500 text-3xl" />
              <div className="ml-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Problems Submitted</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{userData.stats.problemsSubmitted}</h3>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <FiCheckCircle className="text-green-500 text-3xl" />
              <div className="ml-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Helpful Votes</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{userData.stats.helpfulVotes}</h3>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <BsLightbulb className="text-yellow-500 text-3xl" />
              <div className="ml-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Solutions Provided</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{userData.stats.solutionsProvided}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Solutions Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Solutions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userData.solutions.map((solution) => (
              <div key={solution.id} className="border dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{solution.title}</h3>
                <div className="mt-2 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>{solution.date}</span>
                  <span className={`px-2 py-1 rounded-full ${solution.status === 'Accepted' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>                    {solution.status}
                  </span>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <FiCheckCircle className="mr-1" /> {solution.votes} helpful votes
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Problems Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Problems</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userData.problems.map((problem) => (
              <div key={problem.id} className="border dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{problem.title}</h3>
                <div className="mt-2 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>{problem.date}</span>
                  <span className={`px-2 py-1 rounded-full ${problem.status === 'Resolved' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>                    {problem.status}
                  </span>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <BsLightbulb className="mr-1" /> {problem.solutions} solutions
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;