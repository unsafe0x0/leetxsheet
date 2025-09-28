"use client";
import React, { useState } from "react";
import Dropdown from "../ui/Dropdown";
import Input from "../ui/Input";
import Button from "../ui/Button";

interface FilterProps {
  onApply?: (filters: {
    difficulty?: string;
    query?: string;
    status?: string;
  }) => void;
}

const difficultyOptions = [
  { label: "Any", value: "" },
  { label: "Easy", value: "Easy", className: "text-green-400" },
  { label: "Medium", value: "Medium", className: "text-yellow-400" },
  { label: "Hard", value: "Hard", className: "text-red-400" },
];

const statusOptions = [
  { label: "Any", value: "" },
  { label: "Solved", value: "Solved", className: "text-green-400" },
  { label: "Unsolved", value: "Unsolved", className: "text-red-400" },
];


const companyOptions = [
  { label: "Any", value: "" },
  { label: "TCS", value: "TCS" },
  { label: "Infosys", value: "Infosys" },
  { label: "Wipro", value: "Wipro" },
  { label: "Flipkart", value: "Flipkart" },
  { label: "Amazon India", value: "Amazon India" },
  { label: "Google India", value: "Google India" },
  { label: "Microsoft India", value: "Microsoft India" },
  { label: "Ola", value: "Ola" },
  { label: "Swiggy", value: "Swiggy" },
  { label: "Zomato", value: "Zomato" },
  { label: "Paytm", value: "Paytm" },
  { label: "Byju's", value: "Byju's" },
];

const Filter: React.FC<FilterProps> = ({ onApply }) => {
  const [filters, setFilters] = useState({
    difficulty: "",
    query: "",
    status: "",
    company: "",
  });

  const updateFilter = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }


  React.useEffect(() => {
    const payload = {
      difficulty: filters.difficulty || undefined,
      query: filters.query || undefined,
      status: filters.status || undefined,
      company: filters.company || undefined,
    };
    onApply?.(payload);
  }, [filters, onApply]);

  const apply = () => {
    const payload = {
      difficulty: filters.difficulty || undefined,
      query: filters.query || undefined,
      status: filters.status || undefined,
      company: filters.company || undefined,
    };
    onApply?.(payload);
    console.log("Applied filters:", payload);
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
  <div className="flex flex-col sm:flex-row sm:items-end gap-3 w-full">
        <div className="w-full">
          <Input
            label="Problem name"
            placeholder="Problem title or tag"
            value={filters.query}
            onChange={(e) => updateFilter("query", e.target.value)}
          />
        </div>

        <div className="w-full sm:w-56">
          <Dropdown
            label="Difficulty"
            items={difficultyOptions}
            value={filters.difficulty}
            onChange={(v) => updateFilter("difficulty", v)}
            placeholder="Any"
          />
        </div>


        <div className="w-full sm:w-56">
          <Dropdown
            label="Status"
            items={statusOptions}
            value={filters.status}
            onChange={(v) => updateFilter("status", v)}
            placeholder="Any"
          />
        </div>

        <div className="w-full sm:w-56">
          <Dropdown
            label="Company"
            items={companyOptions}
            value={filters.company}
            onChange={(v) => updateFilter("company", v)}
            placeholder="Any"
          />
        </div>
      </div>
    </div>
  );
};

export default Filter;
