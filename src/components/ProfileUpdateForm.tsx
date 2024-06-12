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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsModified(
      username !== updateProfile.username || email !== updateProfile.email
    );
  }, [username, email, updateProfile.username, updateProfile.email]);

  const handleSave = async () => {
    setIsLoading(true);

    const updatedUser = {
      ...updateProfile,
      username,
      email,
    };

    try {
      await onUpdate(updatedUser);
    } catch (error) {
      console.error("Error updating user!", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-purple-600 rounded-3xl w-1/2 ml-auto mr-auto">
      <div className="min-h-full mt-32">
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <h1 className="mt-6 text-2xl font-bold sm:text-3xl md:text-4xl text-white text-center">
              Welcome to Profile 👤
            </h1>

            <p className="mt-4 leading-relaxed text-white">
              Welcome to your profile page! Here, you can update your personal
              information such as your username, email address. Please make sure
              to keep your information up to date to ensure you receive all
              important notifications.
            </p>

            <div className="mt-8 grid grid-cols-6 gap-6">
              <div className="col-span-6 w-1/2">
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

              <div className="col-span-6 w-1/2">
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
                  className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm text-black"
                />
              </div>
              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button
                  onClick={handleSave}
                  disabled={!isModified || isLoading}
                  className={`inline-flex items-center justify-center rounded-md px-12 py-3 text-sm font-medium text-white transition ${
                    isModified && !isLoading
                      ? "bg-customPurple hover:bg-customPurpleHover cursor-pointer"
                      : "bg-customPurple opacity-50 cursor-not-allowed"
                  } disabled:hover`}
                >
                  {isLoading ? "Loading..." : "Update"}
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
