import React from "react";

interface AlmondIconProps {
  className?: string;
  size?: number;
}

const AlmondIcon: React.FC<AlmondIconProps> = ({ className, size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 2C8 2 4 7 4 12c0 5 4 10 8 10s8-5 8-10c0-5-4-10-8-10z" />
    <path d="M12 6c-2 0-4 3-4 6s2 6 4 6" />
  </svg>
);

export default AlmondIcon;
