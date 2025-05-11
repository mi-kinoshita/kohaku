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

      const data = (await response.json()) as
        | { message: string }
        | { error: string };

      if (response.ok) {
        setMessage("Thank you for signing up!");
        setEmail("");
      } else {
        setMessage((data as { error: string }).error || "Registration failed.");
      }
    } catch (_error) {
      console.error("Waitlist registration error:", _error);
      setMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="w-full bg-white">
        <nav className="flex justify-between items-center px-4 py-2 md:px-8 md:py-2">
          <div className="font-bold text-3xl text-gray-800">kohaku</div>
        </nav>
      </header>

      <main className="flex flex-col md:flex-row flex-grow">
        <div className="w-full md:w-1/2 relative h-64 md:h-auto order-1 md:order-2">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/main-movie.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <section className="w-full md:w-1/2 flex flex-col bg-white order-2 md:order-1 flex-grow">
          <div className="flex-grow flex flex-col justify-center px-4 py-8 md:px-16">
            <div className="max-w-md mx-auto md:mx-0">
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
          </div>

          {/* コピーライトの配置を修正 */}
          <footer className="w-full text-left text-gray-400 text-sm py-4 px-4 max-w-md mx-auto md:mx-0">
            ©2025 Mia Design Studio All rights reserved.
          </footer>
        </section>
      </main>
    </div>
  );
}
