import React from "react";

interface BadgeProps {
  text: string;
  varient: "green" | "yellow" | "red";
}

const Badge = ({ text, varient }: BadgeProps) => {
  const redVariant = "text-red-500";
  const greenVariant = "text-green-500";
  const yellowVariant = "text-yellow-500";

  return (
    <span
      className={`px-2 py-1 text-xs rounded-full ${
        varient === "red"
          ? redVariant
          : varient === "green"
          ? greenVariant
          : yellowVariant
      }`}
    >
      {text}
    </span>
  );
};

export default Badge;
