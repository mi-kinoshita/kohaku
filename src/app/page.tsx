"use client";

import { useState } from "react";

export default function WaitingListPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    setMessage("Submitting...");
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      // APIからのレスポンスデータの型を明示するために型アサーションを追加
      const data = (await response.json()) as
        | { message: string }
        | { error: string };

      if (response.ok) {
        setMessage("Thank you for signing up!");
        setEmail("");
      } else {
        // else ブロック内で data が { error: string } であることを明示するために型アサーションを追加
        setMessage((data as { error: string }).error || "Registration failed.");
      }
    } catch (_error) {
      console.error("Waitlist registration error:", _error);
      setMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col-reverse md:flex-row min-h-screen">
      <div className="w-full md:w-1/2 flex flex-col pt-0 px-8 pb-32 md:pt-0 md:px-16 md:pb-32 bg-white relative rounded-t-lg md:rounded-none -mt-10 md:mt-0 z-10 md:z-auto">
        <div className="max-w-md mx-auto md:mx-0">
          <div className="mt-0 mb-6">
            <h1 className="text-6xl md:text-5xl font-bold text-gray-800 leading-tight mb-4">
              kohaku
            </h1>
          </div>
          <span className="inline-block bg-gray-200 text-gray-700 text-xs font-semibold px-1 py-1 rounded-sm mb-4">
            LAUNCHING JULY 2025
          </span>
          <h1 className="text-4xl md:text-4xl font-bold text-gray-800 leading-tight mb-4">
            For Whisky Lovers
            <br />
            Who Go Deeper.
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Easily record and organize your tasting notes.
            <br />
            Join the waitlist for early access and updates.
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 mb-4"
          >
            <input
              type="email"
              placeholder="name@domain.com"
              className="flex-grow px-0 py-2 border-b border-gray-500 bg-transparent focus:outline-none focus:border-blue-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
            >
              Join now
            </button>
          </form>
          <div className="flex items-center pl-2 text-gray-600 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1 text-yellow-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-semibold text-yellow-600 mr-1">100+</span>
            makers have already joined
          </div>
          {message && <p className="mt-4 text-center text-sm">{message}</p>}
        </div>

        <div className="absolute inset-x-0 bottom-0 text-center text-gray-400 text-sm px-10 pb-4">
          ©2025 Mia Design Studio All rights reserved.
        </div>
      </div>

      <div className="w-full md:w-1/2 relative h-64 md:h-auto z-0 md:z-auto">
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/main-movie.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}
