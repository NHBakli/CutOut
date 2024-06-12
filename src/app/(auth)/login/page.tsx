"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";

const loginPage = () => {
  const router = useRouter();
  const [responseMessage, setResponseMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setIsError(false);

    const result = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });
    setIsLoading(false);

    if (result) {
      router.push("/");
    }

    if (result?.error) {
      setResponseMessage("Incorrect email address or password.");
      setIsError(true);
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg bg">
        <h1 className="text-center text-2xl font-bold sm:text-4xl text-white ">
          Sign In
        </h1>

        <p className="mx-auto mt-4 max-w-md text-center text-white-500">
          To remove the background from your images, please create an account.
        </p>

        <form
          action="#"
          className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 bg-gradient-to-r from-violet-600 to-fuchsia-600"
          onSubmit={handleSubmit}
        >
          <p className="text-center text-lg font-medium">Sign in to CutOut</p>

          {responseMessage && (
            <div className="text-red-500 font-extrabold">{responseMessage}</div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white-700"
            >
              Email
            </label>
            <div className="relative mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm text-black"
                placeholder="Enter email"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white-700"
            >
              Password
            </label>
            <div className="relative mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm text-black"
                placeholder="Enter password"
              />
            </div>
          </div>

          <button
            type="submit"
            className="block w-full rounded-lg px-5 py-3 text-sm font-medium bg-customPurple text-white hover:bg-customPurpleHover"
          >
            {isLoading ? "Loading..." : "Sign in"}
          </button>

          <p className="text-center text-sm text-white-500">
            You don't have an account? <br />
            <Link className="underline" href="/signup">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default loginPage;
