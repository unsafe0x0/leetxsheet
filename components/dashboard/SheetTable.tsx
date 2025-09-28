"use client";
import React, { useEffect, useState } from "react";
import Badge from "../ui/Badge";
import Link from "next/link";
import { SiLeetcode } from "react-icons/si";

interface ProblemItem {
  name: string;
  difficulty?: string;
  link?: string;
  status?: string;
}

const difficultyToVariant = (d?: string) => {
  if (!d) return "yellow";
  const low = d.toLowerCase();
  if (low.includes("easy")) return "green";
  if (low.includes("hard")) return "red";
  return "yellow";
};

const SheetTable: React.FC<{ problems: ProblemItem[] }> = ({ problems }) => {
  const [solvedMap, setSolvedMap] = useState<{ [name: string]: boolean }>({});

  useEffect(() => {
    const stored = localStorage.getItem("leet_solved_map");
    if (stored) {
      setSolvedMap(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("leet_solved_map", JSON.stringify(solvedMap));
  }, [solvedMap]);

  useEffect(() => {
    setSolvedMap((prev) => {
      const newMap: { [name: string]: boolean } = {};
      problems.forEach((p) => {
        if (prev[p.name]) newMap[p.name] = true;
      });
      return newMap;
    });
  }, [problems]);

  const toggleRow = (idx: number) => {
    const name = problems[idx].name;
    setSolvedMap((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="overflow-x-auto w-full rounded-lg">
      <div className="max-h-[800px] overflow-y-auto">
        <table className="w-full table-fixed border-collapse min-w-[1000px]">
          <colgroup>
            <col style={{ width: "6%" }} />
            <col style={{ width: "60%" }} />
            <col style={{ width: "17%" }} />
            <col style={{ width: "17%" }} />
          </colgroup>
          <thead>
            <tr className="">
              <th className="text-left py-2 px-2 border-b border-[#262626] sticky top-0 z-30 bg-neutral-800 font-normal text-base text-neutral-400">
                Solved
              </th>
              <th className="text-left py-2 px-2 border-b border-[#262626] sticky top-0 z-30 bg-neutral-800 font-normal text-base text-neutral-400">
                Name
              </th>
              <th className="text-center py-2 px-2 border-b border-[#262626] sticky top-0 z-30 bg-neutral-800 font-normal text-base text-neutral-400">
                Difficulty
              </th>
              <th className="text-center py-2 px-2 border-b border-[#262626] sticky top-0 z-30 bg-neutral-800 font-normal text-base text-neutral-400">
                Link
              </th>
            </tr>
          </thead>
          <tbody>
            {problems.map((p, idx) => (
              <tr key={idx} className="border-b border-[#262626]">
                <td className="py-2 px-2 text-left">
                  <input
                    type="checkbox"
                    className="accent-white"
                    aria-label={`select-${idx}`}
                    checked={!!solvedMap[p.name]}
                    onChange={() => toggleRow(idx)}
                  />
                </td>
                <td className="py-2 px-2">
                  <div
                    className="truncate max-w-full text-base font-normal"
                    title={p.name}
                  >
                    {p.name}
                  </div>
                </td>
                <td className="py-2 px-2 text-center">
                  <Badge
                    text={p.difficulty || "Unknown"}
                    varient={difficultyToVariant(p.difficulty)}
                  />
                </td>
                <td className="py-2 px-2 text-center">
                  {p.link ? (
                    <Link
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block"
                    >
                      <SiLeetcode
                        className="w-5 h-5 mx-auto"
                        title="LeetCode"
                      />
                    </Link>
                  ) : (
                    "—"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SheetTable;
