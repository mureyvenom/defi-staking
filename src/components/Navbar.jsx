import React from "react";

const Navbar = ({ account }) => {
  return (
    <nav className="w-full flex items-center justify-between py-5 px-10 bg-black text-white">
      <div className="text-2xl">MY DAPP</div>
      <div className="flex gap-x-4">
        <a href="/">Home</a>
        <a href="/">Stake</a>
        <button>Address: {account}</button>
      </div>
    </nav>
  );
};

export default Navbar;
