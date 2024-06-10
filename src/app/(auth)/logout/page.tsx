"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";

const LogoutPage = () => {
  const handleConfirm = async () => {
    await signOut({
      callbackUrl: "/",
    });
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg bg ">
        <div className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 bg-gradient-to-r from-violet-600 to-fuchsia-600 ">
          <h1 className="text-center text-2xl font-bold sm:text-4xl text-white ">
            Logout
          </h1>

          <div className="flex gap-10">
            <button
              type="submit"
              className="block w-full rounded-lg px-5 py-3 text-sm font-medium bg-customPurple text-white hover:bg-customPurpleHover"
              onClick={handleConfirm}
            >
              Confirm
            </button>
            <Link
              className="block w-full rounded-lg px-5 py-3 text-sm font-medium bg-customPurple text-white hover:bg-customPurpleHover text-center"
              href="/"
            >
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutPage;
