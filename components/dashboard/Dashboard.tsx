"use client";
import React from "react";
import Filter from "./Filter";
import SheetTable from "./SheetTable";
import HighlightCard from "../ui/HighlightCard";
import { FaCheckCircle } from "react-icons/fa";
import leetcodeSheet from "@/data/leetcode";
import tcsSheet from "@/data/tcs";

const Dashboard = () => {
  const [problems, setProblems] = React.useState<Array<any>>(leetcodeSheet);

  const handleApply = React.useCallback(
    (filters: {
      difficulty?: string;
      query?: string;
      status?: string;
      company?: string;
    }) => {
      let solvedMap: { [name: string]: boolean } = {};
      try {
        const stored = localStorage.getItem("leet_solved_map");
        if (stored) solvedMap = JSON.parse(stored);
      } catch {}

      let sheet = leetcodeSheet;
      if (filters.company && filters.company.toLowerCase() === "tcs") {
        sheet = tcsSheet;
      }

      setProblems(
        sheet.filter((problem: any) => {
          const problemDifficulty = (problem.difficulty || "").toString();
          const matchesDifficulty = filters.difficulty
            ? problemDifficulty.toLowerCase() ===
              filters.difficulty.toLowerCase()
            : true;
          const matchesQuery = filters.query
            ? problem.name.toLowerCase().includes(filters.query.toLowerCase())
            : true;
          let matchesStatus = true;
          if (filters.status) {
            const isSolved = !!solvedMap[problem.name];
            if (filters.status.toLowerCase() === "solved")
              matchesStatus = isSolved;
            else if (filters.status.toLowerCase() === "unsolved")
              matchesStatus = !isSolved;
          }
          return matchesDifficulty && matchesQuery && matchesStatus;
        })
      );
    },
    [setProblems]
  );
  let solvedMap: { [name: string]: boolean } = {};
  try {
    const stored =
      typeof window !== "undefined"
        ? localStorage.getItem("leet_solved_map")
        : null;
    if (stored) solvedMap = JSON.parse(stored);
  } catch {}
  const solvedCount = problems.filter((p) => solvedMap[p.name]).length;
  const totalCount = problems.length;
  const easyTotal = problems.filter(
    (p) => (p.difficulty || "").toLowerCase() === "easy"
  ).length;
  const mediumTotal = problems.filter(
    (p) => (p.difficulty || "").toLowerCase() === "medium"
  ).length;
  const hardTotal = problems.filter(
    (p) => (p.difficulty || "").toLowerCase() === "hard"
  ).length;
  const easySolved = problems.filter(
    (p) => (p.difficulty || "").toLowerCase() === "easy" && solvedMap[p.name]
  ).length;
  const mediumSolved = problems.filter(
    (p) => (p.difficulty || "").toLowerCase() === "medium" && solvedMap[p.name]
  ).length;
  const hardSolved = problems.filter(
    (p) => (p.difficulty || "").toLowerCase() === "hard" && solvedMap[p.name]
  ).length;

  return (
    <section className="flex flex-col justify-center items-center w-full mx-auto max-w-7xl space-y-10 px-3 py-10">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <HighlightCard
          title="Total Solved"
          description={`Total problems solved`}
          value={`${solvedCount} / ${totalCount}`}
          icon={<FaCheckCircle className="w-4 h-4 text-blue-400" />}
        />
        <HighlightCard
          title="Easy Solved"
          description={`Easy problems solved`}
          value={`${easySolved} / ${easyTotal}`}
          icon={<FaCheckCircle className="w-4 h-4 text-green-400" />}
        />
        <HighlightCard
          title="Medium Solved"
          description={`Medium problems solved`}
          value={`${mediumSolved} / ${mediumTotal}`}
          icon={<FaCheckCircle className="w-4 h-4 text-yellow-400" />}
        />
        <HighlightCard
          title="Hard Solved"
          description={`Hard problems solved`}
          value={`${hardSolved} / ${hardTotal}`}
          icon={<FaCheckCircle className="w-4 h-4 text-red-400" />}
        />
      </div>
      <Filter onApply={handleApply} />
      <SheetTable problems={problems} />
    </section>
  );
};

export default Dashboard;
