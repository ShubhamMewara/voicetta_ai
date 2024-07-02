import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] px-4 md:px-6 py-12 md:py-24">
      <div className="max-w-xl text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground">
          Welcome to Voicetta
        </h1>
        <p className="text-lg md:text-xl text-primary-foreground">
          Voicetta is a powerful voice AI assistant that can help you with a
          variety of tasks.
          <br />
          Voicetta is here to make your life easier.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/dashboard"
            className="inline-flex h-10 items-center justify-center  px-6 text-sm font-medium text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-ellipsis ml-1 bg-[#183534] hover:bg-[#183534] p-3 rounded-lg shadow-sm text-white"
          >
            Get Started
          </Link>
          <Link
            href="/support"
            className="inline-flex h-10 items-center justify-center rounded-md border border-primary-foreground bg-primary px-6 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
