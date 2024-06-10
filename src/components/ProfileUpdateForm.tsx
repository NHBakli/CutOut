"use client";
import React, { useState, useEffect } from "react";

interface User {
  id: number;
  username: string;
  email: string;
  image: string[];
}

interface UpdateProfileProps {
  updateProfile: User;
  onUpdate: (updateProfile: User) => void;
}

const UpdateProfile: React.FC<UpdateProfileProps> = ({
  updateProfile,
  onUpdate,
}) => {
  const [username, setUsername] = useState(updateProfile.username);
  const [email, setEmail] = useState(updateProfile.email);
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    setIsModified(
      username !== updateProfile.username || email !== updateProfile.email
    );
  }, [username, email, updateProfile.username, updateProfile.email]);

  const handleSave = () => {
    const updatedUser = {
      ...updateProfile,
      username,
      email,
    };
    onUpdate(updatedUser);
  };

  return (
    <section className="bg-purple-600  rounded-3xl">
      <div className="lg:grid min-h-full mt-36 lg:grid-cols-12">
        <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          {/* ici les images de l'user en carousel */}
        </aside>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl dark:text-white">
              Welcome to Profile 👤
            </h1>

            <p className="mt-4 leading-relaxed text-white">
              Welcome to your profile page! Here, you can update your personal
              information such as your username, email address. Please make sure
              to keep your information up to date to ensure you receive all
              important notifications.
            </p>

            <div className="mt-8 grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="Username"
                  className="block text-sm font-medium text-white"
                >
                  Username
                </label>

                <input
                  type="text"
                  id="Username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm text-black"
                />
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="Email"
                  className="block text-sm font-medium text-white"
                >
                  Email
                </label>

                <input
                  type="email"
                  id="Email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-1/2 rounded-lg border-gray-200 p-4 text-sm shadow-sm text-black"
                />
              </div>
              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button
                  onClick={handleSave}
                  disabled={!isModified}
                  className={`inline-block shrink-0 rounded-md px-12 py-3 text-sm font-medium text-white transition ${
                    isModified
                      ? "bg-customPurple hover:bg-customPurpleHover cursor-pointer"
                      : " bg-customPurple opacity-50 cursor-not-allowed"
                  } disabled:hover`}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};

export default UpdateProfile;
