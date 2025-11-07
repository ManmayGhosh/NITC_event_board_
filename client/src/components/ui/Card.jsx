import React from "react";

export const Card = ({ children, className = "" }) => (
  <div
    className={`shadow-lg rounded-2xl overflow-hidden bg-white ${className}`}
  >
    {children}
  </div>
);

export const CardContent = ({ children, className = "" }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);
