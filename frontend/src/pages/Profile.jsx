import React, { useState, useContext, useEffect } from "react";
import { FiEdit2, FiX, FiUpload } from "react-icons/fi";
import { useDropzone } from "react-dropzone";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../context/UserContext"; 


const Profile = () => {
  const { current_user, updateUser } = useContext(UserContext); // Access user data and update function
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: current_user?.username || "",
    email: current_user?.email || "",
    profilePicture: current_user?.profile_picture || ""
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [imageSelected, setImageSelected] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  

  // Update form data when current_user changes
  useEffect(() => {
    if (current_user) {
      setFormData({
        username: current_user.username,
        email: current_user.email,
        profilePicture: current_user.profile_picture
      });
    }
  }, [current_user]);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      setImageSelected(file); // Set the selected image for upload
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg"]
    },
    multiple: false
  });

  const validateForm = () => {
    const newErrors = {};
    if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters long";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const uploadImage = async () => {
    if (!imageSelected) return;

    const formData = new FormData();
    formData.append('file', imageSelected);
    formData.append('upload_preset', 'HelpDesk'); // Replace with your upload preset

    try {
      const response = await axios.post("https://api.cloudinary.com/v1_1/daiyupel1/image/upload", formData);
      return response.data.secure_url; // Return the URL of the uploaded image
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image. Please try again.");
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        let updatedProfilePicture = formData.profilePicture;
        if (imageSelected) {
          const uploadedImageUrl = await uploadImage();
          if (uploadedImageUrl) {
            updatedProfilePicture = uploadedImageUrl;
          }
        }

        const updatedData = {
          user_id: current_user.id, // Include user ID for the update
          username: formData.username,
          email: formData.email,
          password: "", // Add password if needed
          profile_picture: updatedProfilePicture
        };

        // Update user data in the backend and context
        await updateUser(updatedData.user_id, updatedData.username, updatedData.email, updatedData.password, updatedData.profile_picture);

        setIsEditModalOpen(false);
        setPreviewImage(null);
        setImageSelected(null); // Reset the selected image
        toast.dismiss();
        toast.success("Profile updated successfully!");
      } catch (error) {
        console.error("Error updating profile:", error);
        toast.error("Failed to update profile. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black animate-gradient-x py-12 px-4 sm:px-6 lg:px-8"
    // style = {{
    //   backgroundImage: `url('/bg.png')`,
    //   backgroundSize: "cover",
    //   backgroundPosition: "center",
    //   backgroundRepeat: "no-repeat",
    // }}
    >
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="max-w-md mx-auto bg-gray-800/50 backdrop-blur-md rounded-lg shadow-lg overflow-hidden border border-gray-700/30 hover:shadow-xl hover:shadow-blue-500/20 transition-shadow duration-300">
        <div className="relative p-8 pb-12">
          <div className="absolute top-4 right-4">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:scale-110"
              aria-label="Edit profile"
            >
              <FiEdit2 className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32 mb-4 group">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <img
                src={formData.profilePicture}
                alt="Profile"
                className="w-full h-full rounded-full object-cover relative z-10"
                onError={(e) => {
                  e.target.src = "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=";
                }}
              />
            </div>
            <h1 className="text-2xl font-bold text-white text-shadow-lg shadow-gray-900">
              {formData.username}
            </h1>
            <p className="text-gray-400 mt-1">{formData.email}</p>
          </div>
        </div>
      </div>

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-lg max-w-md w-full p-6 transform transition-all duration-300 scale-95 hover:scale-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">Edit Profile</h2>
              <button
                onClick={() => {
                  setIsEditModalOpen(false);
                  setPreviewImage(null);
                  setErrors({});
                  setImageSelected(null); // Reset the selected image
                }}
                className="p-2 hover:bg-gray-700 rounded-full"
                aria-label="Close modal"
              >
                <FiX className="w-5 h-5 text-white" />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-md ${errors.username ? "border-red-500" : "border-gray-600"} bg-gray-700 text-white`}
                  aria-invalid={errors.username ? "true" : "false"}
                />
                {errors.username && (
                  <p className="mt-1 text-sm text-red-500" role="alert">{errors.username}</p>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Profile Picture
                </label>
                <div
                  {...getRootProps()}
                  className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer bg-gray-700/50 hover:bg-gray-700/70"
                >
                  <input {...getInputProps()} />
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-32 h-32 mx-auto rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center">
                      <FiUpload className="w-8 h-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-400">Drag & drop or click to select image</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setPreviewImage(null);
                    setErrors({});
                    setImageSelected(null); // Reset the selected image
                  }}
                  className="px-4 py-2 text-gray-300 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-md hover:from-blue-600 hover:to-purple-600 transition-all duration-300 disabled:opacity-50 animate-pulse"
                >
                  {isLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;