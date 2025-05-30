"use client";

import { useState } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function WaitingListPage() {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [isAlertSuccess, setIsAlertSuccess] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const emailInput = form.elements.namedItem("email") as HTMLInputElement;
    const email = emailInput.value;

    const gasWebAppUrl =
      "https://script.google.com/macros/s/AKfycbx6hI2LU8QyA8zb7PGYGOdOwoqAudZqsm9rY1wc8k-ZFZwMEUHFDnWZIf1BKIaUPxKX/exec";

    setAlertMessage(null);
    setIsLoading(true);

    try {
      await fetch(gasWebAppUrl, {
        method: "POST",
        body: new URLSearchParams({ email: email }),
        mode: "no-cors",
      });

      setAlertMessage("Thank you for joining the waitlist!");
      setIsAlertSuccess(true);
      form.reset();
    } catch (error) {
      console.error("Fetch error:", error);
      setAlertMessage("An error occurred. Please try again.");
      setIsAlertSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="w-full bg-white shadow-md">
        <nav className="flex justify-between items-center px-4 py-2 md:px-8 md:py-4">
          <div className="font-bold text-lg text-gray-800">kohaku</div>
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
                id="waitlist-form"
                className="flex flex-col sm:flex-row gap-4 mb-4"
              >
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  disabled={isLoading}
                  className="flex-grow px-0 py-2 border-b border-gray-500 bg-transparent focus:outline-none focus:border-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? (
                    <svg
                      className="animate-spin h-5 w-5 text-white mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l2-2.647z"
                      ></path>
                    </svg>
                  ) : null}
                  Join the Waitlist
                </button>
              </form>

              <div className="mt-4 min-h-[60px]">
                {alertMessage && (
                  <Alert
                    className={`mb-4 ${
                      isAlertSuccess
                        ? "border-green-500 text-green-700"
                        : "border-red-500 text-red-700"
                    }`}
                  >
                    <AlertTitle>
                      {isAlertSuccess ? "Success" : "Error"}
                    </AlertTitle>
                    <AlertDescription>{alertMessage}</AlertDescription>
                  </Alert>
                )}
              </div>

              {/* <div className="flex items-center pl-2 text-gray-600 text-sm mt-4">
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
              </div> */}
            </div>
          </div>

          <footer className="w-full text-left text-gray-400 text-sm py-4 px-4 max-w-md mx-auto md:mx-0 flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <a
              href="https://www.freeprivacypolicy.com/live/97bc1005-fb1c-4dd2-9370-6f573c7283ac"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:underline mt-1 sm:mt-0"
            >
              Privacy Policy
            </a>
            <span>©2025 Mia Design Studio All rights reserved.</span>
          </footer>
        </section>
      </main>
    </div>
  );
}
