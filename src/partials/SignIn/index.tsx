import { useState } from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import axios from "axios";
import queryString from "query-string";

const SignInComponent: NextPage = () => {
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setSignInData({ ...signInData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Your existing sign-in logic here

    setIsSubmitting(false);
  };

  const handleLinkedInSignIn = () => {
    const params = {
      response_type: "code",
      client_id: process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID,
      redirect_uri: process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI,
      state: Math.random().toString(36).substring(2, 15), // Replace with a more secure random state generator
      scope: 'openid profile email w_member_social',
    };

    const queryStringParams = queryString.stringify(params);
    const linkedInAuthUrl = `https://www.linkedin.com/oauth/v2/authorization?${queryStringParams}`;

    window.location.href = linkedInAuthUrl;
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto my-10">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold text-center">Log In</h2>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-slate-900 focus:border-slate-900 sm:text-sm"
            placeholder="Enter your email"
            required
            value={signInData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-slate-900 focus:border-slate-900 sm:text-sm"
            placeholder="Enter your password"
            required
            value={signInData.password}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-slate-900 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging In..." : "Log In"}
        </button>
        {error && (
          <p className="mt-2 text-center text-sm text-red-600">{error}</p>
        )}
      </form>
      <button
        onClick={handleLinkedInSignIn}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 mt-4"
      >
        Sign In with LinkedIn
      </button>
      <p className="mt-4 text-center text-sm text-gray-600">
        Don’t have an account?{" "}
        <a
          href="#"
          onClick={() => router.push("/signup")}
          className="font-medium text-slate-900 hover:text-slate-900"
        >
          Sign Up
        </a>
      </p>
    </div>
  );
};

export default SignInComponent;
