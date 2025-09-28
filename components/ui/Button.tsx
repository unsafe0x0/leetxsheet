"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  icon?: React.ReactNode;
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "tertiary";
  className?: string;
  image?: string;
  forwardRoute?: string;
}

const variantClasses = {
  primary:
    "bg-white hover:bg-neutral-100 text-[#212121] border border-[#262626]",
  secondary:
    "bg-transparent border border-[#262626] text-white hover:bg-[#212121]",
  tertiary: "bg-red-500 hover:bg-red-600 text-white border border-red-500",
};

const Button: React.FC<ButtonProps> = ({
  type = "button",
  icon,
  label,
  onClick,
  disabled,
  variant = "primary",
  className = "",
  image,
  forwardRoute,
}) => {
  const router = useRouter();

  const handleClick = () => {
    if (forwardRoute) {
      router.push(forwardRoute);
    }
    onClick?.();
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md cursor-pointer text-base font-normal transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#242424] focus-visible:ring-offset-0 ${variantClasses[variant]} ${className}`}
    >
      {image && <Image src={image} alt={""} width={20} height={20} />}
      {label && <span className="label">{label}</span>}
      {icon && <span className="icon">{icon}</span>}
    </button>
  );
};

export default Button;
