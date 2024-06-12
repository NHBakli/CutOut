"use client";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center py-20">
      <section className="w-full text-center mb-0  text-white pb-16 pt-0 rounded-lg">
        <h1 className="text-5xl font-bold mb-4">Welcome to Our Application</h1>
        <p className="text-lg mb-6">
          Your go-to solution for managing your profile and images effortlessly.
        </p>
        <Link
          href="/remove"
          className="mt-6 px-6 py-3 bg-white text-purple-600 rounded-lg shadow-md hover:bg-gray-200 transition"
        >
          Get Started
        </Link>
      </section>
      <section className="w-full text-center mb-24">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Features</h2>
        <div className="w-2/6 ml-auto mr-auto">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-purple-600 mb-4">
              Remove Image Background
            </h3>
            <p className="text-gray-700 mb-4">
              Effortlessly remove backgrounds from your images to make them
              stand out.
            </p>
            <Link
              href="/remove"
              className="text-purple-600 font-semibold hover:underline"
            >
              Remove Background
            </Link>
          </div>
        </div>
      </section>
      <section className="w-full text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          Join us today and start managing your profile and images like a pro.
        </p>
        <Link
          href="/signup"
          className="mt-6 px-6 py-3 bg-customPurple text-white rounded-lg shadow-md hover:bg-customPurpleHover transition"
        >
          Sign Up Now
        </Link>
      </section>
    </main>
  );
}
