"use client";
import Link from "next/link";
import React, { useState } from "react";

const UserButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModalButton = () => {
    isOpen ? closeModal() : openModal();
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <button
        className="px-6 py-3 border-slate-800 border-[2px] text-slate-800 text-base rounded-md hover:bg-slate-800 hover:text-white transition ease-linear duration-100"
        onClick={handleModalButton}
      >
        Contact Me
      </button>
      {isOpen && (
        <div
          onClick={handleModalButton}
          className={`fixed left-0 top-0 w-full h-full z-[100] grid place-items-center after:w-full after:h-full after:z-[10] after:absolute duration-100 ${
            isOpen
              ? `after:bg-slate-800 after:opacity-70`
              : `after:bg-none after:opacity-0`
          }`}
        >
          <div className="bg-slate-950 w-[299px] p-8 rounded-[32px] z-[1000] text-slate-200 flex flex-col gap-8">
            {/* Signed in as, Sign out */}
            <div className="flex flex-col gap-2 text-start text-neutral-300">
              <p>
                Signed in as{" "}
                <span className="text-white">sohyb0155@gmail.com</span>
              </p>
              <Link href="/api/auth/signout" className="text-red-400 underline">
                Sign Out
              </Link>
            </div>
            {/* You are not sbscribed */}
            <div className="flex flex-col items-start text-start gap-4">
              <p>You are not subscribed to any plans</p>
              <Link
                href="/#pricing"
                className="btn-1 gradient-bg-1 glow-shadow"
                onClick={handleModalButton}
              >
                View Plans
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserButton;
