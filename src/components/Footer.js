import React from "react";

const Footer = () => {
  const today = new Date();
  const year = today.getFullYear();
  return (
    <footer className="row p-5">
      <p>© {year} The Regents of the University of Michigan</p>
    </footer>
  );
};

export default Footer;
