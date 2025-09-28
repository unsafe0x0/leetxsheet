"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";

type PrimitiveItem = string;

export interface DropdownItem {
  label: string;
  value: string;
  className?: string;
}

export interface DropdownProps {
  items: Array<DropdownItem | PrimitiveItem>;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  onChange?: (value: string, item: DropdownItem) => void;
  label?: string;
  required?: boolean;
  className?: string;
  buttonClassName?: string;
  listClassName?: string;
  align?: "left" | "right";
  noOptionsText?: string;
}

const triggerBase =
  "w-full flex items-center justify-between gap-2 px-4 py-2 border border-[#262626] rounded-md bg-neutral-800 text-neutral-100 text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-[#242424] focus-visible:ring-offset-0 focus:ring-2 focus:ring-[#242424] transition-colors select-none";
const listBase =
  "absolute z-50 mt-1 w-full overflow-auto rounded-md border border-[#262626]/60 bg-neutral-800 shadow-lg shadow-black/40 backdrop-blur-sm";
const itemBase =
  "flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-sm text-neutral-200 hover:bg-neutral-700 aria-selected:bg-neutral-700 aria-selected:text-neutral-50";

function normalize(item: DropdownItem | PrimitiveItem): DropdownItem {
  if (typeof item === "string") return { label: item, value: item };
  return item;
}

export const Dropdown: React.FC<DropdownProps> = ({
  items,
  value,
  defaultValue,
  placeholder = "Select...",
  onChange,
  label,
  required,
  className = "",
  buttonClassName = "",
  listClassName = "",
  align = "left",
  noOptionsText = "No options",
}) => {
  const all = items.map(normalize);
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<string | undefined>(
    defaultValue
  );
  const selectedValue = isControlled ? value : internalValue;
  const selectedItem = all.find((i) => i.value === selectedValue);
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const handle = (e: MouseEvent) => {
      if (
        !triggerRef.current?.contains(e.target as Node) &&
        !listRef.current?.contains(e.target as Node)
      ) {
        close();
      }
    };
    window.addEventListener("mousedown", handle);
    return () => window.removeEventListener("mousedown", handle);
  }, [open, close]);

  const commit = (idx: number) => {
    const item = all[idx];
    if (!item) return;
    if (!isControlled) setInternalValue(item.value);
    onChange?.(item.value, item);
    close();
    setTimeout(() => triggerRef.current?.focus(), 0);
  };

  return (
    <div className={`flex flex-col gap-2 w-full ${className}`}>
      {label && (
        <label className="text-base font-medium text-neutral-300">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      <div className="relative w-full">
        <button
          ref={triggerRef}
          type="button"
          className={`${triggerBase} cursor-pointer ${buttonClassName}`}
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span
            className={selectedItem ? "text-neutral-100" : "text-neutral-400"}
          >
            {selectedItem?.label || placeholder}
          </span>
          {open ? (
            <FaChevronUp className="h-4 w-4 shrink-0 text-neutral-400" />
          ) : (
            <FaChevronDown className="h-4 w-4 shrink-0 text-neutral-400" />
          )}
        </button>
        {open && (
          <ul
            ref={listRef}
            role="listbox"
            tabIndex={-1}
            aria-activedescendant={undefined}
            className={`${listBase} ${
              align === "right" ? "right-0" : "left-0"
            } ${listClassName}`}
            onKeyDown={undefined}
          >
            {all.length === 0 && (
              <li className="px-3 py-2 text-sm text-neutral-500 select-none">
                {noOptionsText}
              </li>
            )}
            {all.map((item, idx) => {
              const selected = item.value === selectedValue;
              const baseCls = `${itemBase} ${
                idx === activeIndex ? "bg-[#212121]" : ""
              } ${selected ? "font-medium" : ""}`;
              return (
                <li
                  id={`dd-item-${item.value}`}
                  key={item.value}
                  role="option"
                  aria-selected={selected}
                  className={baseCls}
                  onClick={() => commit(idx)}
                  onMouseEnter={() => setActiveIndex(idx)}
                  tabIndex={-1}
                >
                  <span
                    className={`truncate ${
                      item.className ||
                      (selected ? "text-neutral-100" : "text-neutral-300")
                    }`}
                  >
                    {item.label}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
