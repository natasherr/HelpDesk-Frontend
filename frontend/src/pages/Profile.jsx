import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { FiEdit2, FiUpload, FiUser, FiMail } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const UserProfile = () => {
  const { current_user, updateUser } = useContext(UserContext); 
  const navigate = useNavigate(); 

  const [profile, setProfile] = useState({
    username: "",
    email: "",
    profilePicture: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);
  const [errors, setErrors] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const [crop, setCrop] = useState({ unit: "%", width: 50, aspect: 1 });
  const [showCropModal, setShowCropModal] = useState(false);
  const [tempImage, setTempImage] = useState(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);

  useEffect(() => {
    if (!current_user) {
      navigate("/login");
    } else {
      setProfile({
        username: current_user.username,
        email: current_user.email,
        profilePicture: current_user.profilePicture || "",
      });
      setFormData({
        username: current_user.username,
        email: current_user.email,
        profilePicture: current_user.profilePicture || "",
      });
    }
  }, [current_user, navigate]);

  useEffect(() => {
    if (current_user) {
      localStorage.setItem("user", JSON.stringify(current_user));
    }
  }, [current_user]);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size should be less than 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setTempImage(reader.result);
        setShowCropModal(true);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    maxSize: 5 * 1024 * 1024,
  });

  const validateForm = () => {
    const newErrors = {};
    if (formData.username.length < 3 || formData.username.length > 20) {
      newErrors.username = "Username must be between 3 and 20 characters";
    }
    if (!/^[\w\s]+$/.test(formData.username)) {
      newErrors.username = "Username cannot contain special characters";
    }
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    try {
      if (!validateForm()) return;

      const updatedProfileData = { 
        ...formData, 
        profilePicture: croppedImageUrl || profile.profilePicture 
      };

      setIsUploading(true);

      await updateUser(current_user.user_id, updatedProfileData);
      toast.success("Profile updated successfully!");
      localStorage.setItem("user", JSON.stringify(updatedProfileData));

    } catch (error) {
      toast.error("Failed to save profile");
      console.error("Failed to save profile:", error);
    } finally {
      setIsUploading(false);
      setIsEditing(false);  // Exit edit mode after saving
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const calculateProfileCompletion = () => {
    const fields = Object.values(profile).filter(Boolean).length;
    return (fields / Object.keys(profile).length) * 100;
  };

  const onImageLoaded = (image) => {};

  const onCropChange = (newCrop) => {
    setCrop(newCrop);
  };

  const onCropComplete = (crop) => {
    if (crop.width && crop.height) {
      const canvas = document.createElement("canvas");
      const image = document.createElement("img");
      image.src = tempImage;
      image.onload = () => {
        const ctx = canvas.getContext("2d");
        canvas.width = crop.width;
        canvas.height = crop.height;
        ctx.drawImage(
          image,
          crop.x,
          crop.y,
          crop.width,
          crop.height,
          0,
          0,
          crop.width,
          crop.height
        );
        setCroppedImageUrl(canvas.toDataURL());
      };
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="relative inline-block">
              {isEditing ? (
                <div
                  {...getRootProps()}
                  className="w-32 h-32 rounded-full border-2 border-dashed border-gray-600 flex items-center justify-center cursor-pointer hover:border-blue-500 transition-colors"
                >
                  <input {...getInputProps()} />
                  <FiUpload className="w-8 h-8 text-gray-400" />
                </div>
              ) : (
                <img
                  src={croppedImageUrl || profile.profilePicture}
                  alt={profile.username}
                  className="w-32 h-32 rounded-full object-cover"
                />
              )}
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full text-white hover:bg-blue-600 transition-colors"
                >
                  <FiEdit2 className="w-4 h-4" />
                </button>
              )}
            </div>

            <h2 className="mt-4 text-2xl font-bold text-white">{profile.username}</h2>
            <div className="mt-2 text-sm text-gray-400">{profile.email}</div>

            <div className="mt-4 w-full bg-gray-600 rounded-full h-2.5">
              <div
                className="bg-blue-500 h-2.5 rounded-full"
                style={{ width: `${calculateProfileCompletion()}%` }}
              ></div>
            </div>
            <p className="mt-2 text-sm text-gray-400">
              Profile Completion: {Math.round(calculateProfileCompletion())}%
            </p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-300">Username</label>
                <div className="flex items-center space-x-2">
                  <FiUser className="text-gray-400" />
                  <input
                    type="text"
                    name="username"
                    disabled={!isEditing}
                    value={formData.username}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                {errors.username && (
                  <p className="mt-1 text-sm text-red-600">{errors.username}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">Email</label>
                <div className="flex items-center space-x-2">
                  <FiMail className="text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    disabled={!isEditing}
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="flex justify-end">
              {isEditing ? (
                <button
                  type="button"
                  onClick={handleSave}
                  className="w-full sm:w-auto px-6 py-2 mt-4 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
                  disabled={isUploading}
                >
                  {isUploading ? "Saving..." : "Save Changes"}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="w-full sm:w-auto px-6 py-2 mt-4 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default UserProfile;
