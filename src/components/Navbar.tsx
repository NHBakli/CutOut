"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";

export const Navbar = () => {
  const { data } = useSession();

  return (
    <div className="flex justify-center pt-3">
      <div className="flex items-center justify-between h-14 bg-purple-600 rounded-3xl shadow-lg w-2/4 px-6">
        <div className="text-white">
          <Link href="/" className="text-2xl font-bold">
            CutOut
          </Link>
        </div>
        <div className="flex space-x-8">
          <Link
            href="/"
            className="text-white text-lg font-medium hover:text-gray-300 transition duration-300"
          >
            Home
          </Link>
          <Link
            href="/remove"
            className="text-white text-lg font-medium hover:text-gray-300 transition duration-300"
          >
            Remove.bg
          </Link>
          {!data ? (
            <>
              <Link
                href="/login"
                className="text-white text-lg font-medium hover:text-gray-300 transition duration-300"
              >
                Sign-in
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/profile"
                className="text-white text-lg font-medium hover:text-gray-300 transition duration-300"
              >
                Profile
              </Link>
              <Link
                href="/logout"
                className="text-white text-lg font-medium hover:text-gray-300 transition duration-300"
              >
                Logout
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
