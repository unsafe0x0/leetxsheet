"use client";
import React from "react";

interface HighlightCardProps {
  title: string;
  description: string;
  value: string | number;
  icon: React.ReactNode;
}

const HighlightCard = ({
  title,
  description,
  value,
  icon,
}: HighlightCardProps) => {
  const formattedValue =
    typeof value === "number" ? new Intl.NumberFormat().format(value) : value;

  return (
    <div
      role="group"
      tabIndex={0}
      aria-label={`${title}: ${formattedValue}`}
      className="flex flex-row justify-between items-start p-4 bg-neutral-800 rounded-lg w-full"
    >
      <div className="flex flex-col justify-start items-start gap-1">
        <h3 className="text-sm sm:text-base font-semibold font-headingFont text-neutral-100">
          {title}
        </h3>
        <p className="text-2xl sm:text-3xl font-extrabold text-neutral-50">
          {formattedValue}
        </p>
        <p className="text-sm text-neutral-400">{description}</p>
      </div>

      <div
        className={`ml-4 shrink-0 flex items-center justify-center"
        }`}
        aria-hidden="true"
      >
        {icon}
      </div>
    </div>
  );
};

export default HighlightCard;
