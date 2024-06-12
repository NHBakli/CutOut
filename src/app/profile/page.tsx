"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import UpdateProfile from "@/components/ProfileUpdateForm";
interface User {
  id: number;
  username: string;
  email: string;
  image: string[];
}

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);

  const { data } = useSession();
  const userID = data?.user?.id ? parseInt(data.user.id) : null;

  const fetchUser = async () => {
    if (!userID) return;

    try {
      const response = await fetch(`/api/user/${userID}`, {
        method: "GET",
      });
      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error("Error fetching data!", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userID]);

  const handleUpdate = async (updatedUser: User) => {
    try {
      const response = await fetch(`/api/user/${updatedUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        const newUser = await response.json();
        setUser(newUser);
      } else {
        console.error("Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user!", error);
    }
  };

  return (
    <div className="pl-10 pr-10">
      {user && <UpdateProfile updateProfile={user} onUpdate={handleUpdate} />}
    </div>
  );
};

export default ProfilePage;
