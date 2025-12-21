"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Home,
  Plus,
  X,
  FileCheckCorner,
  FolderClosed,
  AlarmClockOff,
} from "lucide-react";

/* ================= COLORS SYSTEM ================= */
const COLORS = {
  sidebar: "bg-rose-950",
  text: "text-rose-50",
  hover: "hover:bg-rose-800",
};
/* ================================================= */

interface SidebarProps {
  openMenu: boolean;
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
  openMenuMobile: boolean;
  setOpenMenuMobile: React.Dispatch<React.SetStateAction<boolean>>;
  onOpenAddTask: () => void;
  onOpenAddProject: () => void;
}

export default function Sidebar({
  openMenu,
  setOpenMenu,
  openMenuMobile,
  setOpenMenuMobile,
  onOpenAddTask,
  onOpenAddProject,
}: SidebarProps) {
  const [openNewDropdown, setOpenNewDropdown] = useState(false);

  return (
    <>
      <aside
        className={`${COLORS.sidebar} transition-all duration-300 shadow-xl ${
          openMenu ? "w-60" : "w-20"
        } h-full  flex-col p-4 hidden md:flex`}
      >
        <ul className="flex flex-col gap-10">
          {[
            { icon: Home, label: "Home", link: "/" },
            { icon: FileCheckCorner, label: "All Tasks", link: "/allTasks" },
          ].map((item, i) => (
            <li key={i}>
              <Link
                href={item.link}
                className={`${COLORS.text} flex items-center gap-4 p-3 rounded-xl cursor-pointer transition ${COLORS.hover}`}
              >
                <item.icon className="w-10 h-10" />
                {openMenu && (
                  <span className="text-base font-medium">{item.label}</span>
                )}
              </Link>
            </li>
          ))}

          {/* New Button */}
          <li className="relative">
            <div
              onClick={() => {
                setOpenMenu(true);
                setOpenNewDropdown(!openNewDropdown);
              }}
              className={`${COLORS.text} flex items-center gap-4 p-3 rounded-xl cursor-pointer transition ${COLORS.hover}`}
            >
              <Plus className="w-10 h-10" />
              {openMenu && <span className="text-base font-semibold">New</span>}
            </div>
          </li>

          {[
            { icon: FolderClosed, label: "All Project", link: "/allProject" },
            { icon: AlarmClockOff, label: "Overdue", link: "/" },
          ].map((item, i) => (
            <li key={i}>
              <Link
                href={item.link}
                className={`${COLORS.text} flex items-center gap-4 p-3 rounded-xl cursor-pointer transition ${COLORS.hover}`}
              >
                <item.icon className="w-10 h-10" />
                {openMenu && (
                  <span className="text-base font-medium">{item.label}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      {openMenuMobile && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center animate-fadeIn">
          <div
            className={` ${COLORS.sidebar} w-64 rounded-xl shadow-2xl relative animate-scaleIn`}
          >
            <X
              className="absolute top-3 right-3 text-white w-6 h-6 cursor-pointer"
              onClick={() => setOpenMenuMobile(false)}
            />

            <ul className="flex flex-col gap-4 p-4">
              {[
                { icon: Home, label: "Home", link: "/" },
                {
                  icon: FileCheckCorner,
                  label: "All Tasks",
                  link: "/allTasks",
                },
                {
                  icon: FolderClosed,
                  label: "All Project",
                  link: "/allProject",
                },
                { icon: AlarmClockOff, label: "Overdue", link: "/" },
              ].map((item, i) => (
                <li key={i}>
                  <Link
                    href={item.link}
                    className={`${COLORS.text} flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${COLORS.hover}`}
                  >
                    <item.icon className="w-6 h-6" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {openNewDropdown && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center animate-fadeIn">
          <div
            className={` ${COLORS.sidebar}  rounded-xl shadow-xl  relative animate-scaleIn`}
          >
            <X
              className="absolute top-3 right-3 text-white cursor-pointer"
              onClick={() => setOpenNewDropdown(false)}
            />
            <ul className="p-3">
              <li className={`w-full h-1/2 ${COLORS.hover}  rounded-xl`}>
                <button
                  className={`flex items-center gap-2 p-4 ${COLORS.text}  `}
                  onClick={() => {
                    onOpenAddTask();
                    setOpenNewDropdown(false);
                  }}
                >
                  <Plus className="w-5 h-5" />
                  Add Task
                </button>
              </li>
              <li className={`w-full h-1/2 ${COLORS.hover} rounded-xl`}>
                {" "}
                <button
                  className={`flex items-center gap-2 p-4 ${COLORS.text}  `}
                  onClick={() => {
                    onOpenAddProject();
                    setOpenNewDropdown(false);
                  }}
                >
                  <FolderClosed className="w-5 h-5" />
                  Add Project
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
      <div className="md:hidden fixed bottom-5 right-5 z-50">
        <div
          onClick={() => {
            setOpenNewDropdown(!openNewDropdown);
          }}
          className="flex items-center justify-center w-16 h-16 bg-rose-950 text-white rounded-full shadow-lg hover:bg-rose-700 transition-colors cursor-pointer"
        >
          <Plus className="w-8 h-8" />
        </div>
      </div>
    </>
  );
}
