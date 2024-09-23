import React from "react";
import "./header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-contents">
        <h2>Order Your favourite food here</h2>
        <p>
          Choose from a diverse menu featuring a delectable array of dishes
          crafted with the finest ingredients and culinary expertise. Our
          Mission to satisfy your dinning experience, and delecious meal a time.{" "}
        </p>
        <button>View Menu</button>
      </div>
    </div>
  );
};

export default Header;
