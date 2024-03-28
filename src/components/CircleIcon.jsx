// CircleIcon.js
import React from "react";

const CircleIcon = ({ color }) => {
  return (
    <div
      style={{
        width: "40px",
        height: "40px",
        borderRadius: "20px",
        backgroundColor: color,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#000",
        fontSize: "16px",
        fontWeight: "bold",
      }}
    ></div>
  );
};

export default CircleIcon;
