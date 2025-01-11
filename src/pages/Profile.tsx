import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, updateUserFullName } = useAuth();
  const [fullName, setFullName] = useState(user?.fullName || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserFullName(fullName);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Profile Settings
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-100 placeholder:text-gray-600 dark:placeholder:text-gray-400 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              value={user?.username}
              disabled
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600 leading-tight bg-gray-100 "
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}
