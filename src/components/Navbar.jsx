import React from "react";
import Search from "./Search";
import Logo from "./Logo";

const Navbar = ({ children, query, setQuery }) => {
  return (
    <nav className="nav-bar">
      <Logo />
      <Search query={query} setQuery={setQuery} />
      {children}
    </nav>
  );
};

export default Navbar;
