"use client";

import {
  Menu,
  X,
  User,
  Download,
  Printer,
  FileText,
  List,
  LayoutGrid,
  Filter,
  Check,
  LogOut,
  Settings,
  Circle,
  CheckCircle2,
  Loader,
  XCircle,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface NavbarProps {
  openMenu: boolean;
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
  openMenuMobile: boolean;
  setOpenMenuMobile: React.Dispatch<React.SetStateAction<boolean>>;
  viewMode: "list" | "tiles";
  setViewMode: React.Dispatch<React.SetStateAction<"list" | "tiles">>;
}

/* ================= COLORS SYSTEM ================= */
const COLORS = {
  navbar: "bg-rose-950",
  text: "text-rose-50",
  dropdown: "bg-rose-900 text-rose-50",
  hover: "hover:bg-rose-800",
  border: "border-rose-800",
};
/* ================================================= */

export default function Navbar({
  openMenu,
  setOpenMenu,
  openMenuMobile,
  setOpenMenuMobile,
  viewMode,
  setViewMode,
}: NavbarProps) {
  const [filters, setFilters] = useState({
    notStarted: false,
    inProgress: false,
    incomplete: false,
    completed: false,
  });

  const toggleFilter = (key: keyof typeof filters) => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const [openProfile, setOpenProfile] = useState(false);
  const [openExport, setOpenExport] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [openDisplay, setOpenDisplay] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const closeAll = () => {
    setOpenProfile(false);
    setOpenExport(false);
    setOpenFilter(false);
    setOpenDisplay(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) closeAll();
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={ref}
      className={`w-full h-20 ${COLORS.navbar} ${COLORS.text} flex items-center justify-between px-4 shadow-lg`}
    >
      <div className="hidden md:block">
        {/* Menu */}
        {openMenu ? (
          <X
            className="w-8 h-8 cursor-pointer"
            onClick={() => setOpenMenu(false)}
          />
        ) : (
          <Menu
            className="w-8 h-8 cursor-pointer"
            onClick={() => setOpenMenu(true)}
          />
        )}
      </div>
      <div className="block md:hidden">
        {/* Menu Mobile*/}
        {openMenuMobile ? (
          <X
            className="w-8 h-8 cursor-pointer"
            onClick={() => setOpenMenuMobile(false)}
          />
        ) : (
          <Menu
            className="w-8 h-8 cursor-pointer"
            onClick={() => setOpenMenuMobile(true)}
          />
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {/* Export */}
        <DropdownButton
          label="Export"
          icon={<Download size={16} />}
          open={openExport}
          onOpen={() => {
            closeAll();
            setOpenExport(true);
          }}
        >
          <div className="w-40">
            <DropdownItem
              icon={<Printer size={16} />}
              label="Print todo-list"
            />
            <DropdownItem icon={<FileText size={16} />} label="Save as PDF" />
          </div>
        </DropdownButton>

        <div className="hidden lg:block">
          {/* Display */}
          <DropdownButton
            label={viewMode === "list" ? "List" : "Tiles"}
            icon={
              viewMode === "list" ? (
                <List size={16} />
              ) : (
                <LayoutGrid size={16} />
              )
            }
            open={openDisplay}
            onOpen={() => {
              closeAll();
              setOpenDisplay(true);
            }}
          >
            <SelectableItem
              active={viewMode === "list"}
              icon={<List size={16} />}
              label="List"
              onClick={() => {
                setViewMode("list");
                localStorage.setItem("viewMode", "list");
                closeAll();
              }}
            />
            <SelectableItem
              active={viewMode === "tiles"}
              icon={<LayoutGrid size={16} />}
              label="Tiles"
              onClick={() => {
                setViewMode("tiles");
                localStorage.setItem("viewMode", "tiles");
                closeAll();
              }}
            />
          </DropdownButton>
        </div>
        {/* Filter */}
        <DropdownButton
          label="Filter"
          icon={<Filter size={16} />}
          open={openFilter}
          onOpen={() => {
            closeAll();
            setOpenFilter(true);
          }}
        >
          <div className="md:w-auto w-44">
            <FilterItem
              active={filters.notStarted}
              icon={<Circle size={15} />}
              label="Not started"
              onClick={() => toggleFilter("notStarted")}
            />
            <FilterItem
              active={filters.inProgress}
              icon={<Loader size={16} />}
              label="In progress"
              onClick={() => toggleFilter("inProgress")}
            />
            <FilterItem
              active={filters.incomplete}
              icon={<XCircle size={16} />}
              label="Incomplete"
              onClick={() => toggleFilter("incomplete")}
            />
            <FilterItem
              active={filters.completed}
              icon={<CheckCircle2 size={16} />}
              label="Completed"
              onClick={() => toggleFilter("completed")}
            />
          </div>
        </DropdownButton>

        {/* Profile */}
        <div className="relative">
          <User
            className="w-8 h-8 cursor-pointer hover:scale-110 transition"
            onClick={() => {
              closeAll();
              setOpenProfile(true);
            }}
          />

          {openProfile && (
            <ul
              className={`absolute top-10 right-0 w-44 rounded-md border shadow-lg z-50 ${COLORS.dropdown} ${COLORS.border}`}
            >
              <DropdownItem icon={<Settings size={16} />} label="My Account" />
              <DropdownItem icon={<LogOut size={16} />} label="Logout" danger />
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

/* ================= Reusable Components ================= */

function DropdownButton({ label, icon, open, onOpen, children }: any) {
  return (
    <div className="relative">
      <button
        onClick={onOpen}
        className={`flex items-center gap-2 px-4 py-1 rounded-md font-semibold transition ${COLORS.hover}`}
      >
        {icon}
        {label}
      </button>

      {open && (
        <ul
          className={`absolute top-10 right-0 rounded-md border shadow-lg z-50 ${COLORS.dropdown} ${COLORS.border}`}
        >
          {children}
        </ul>
      )}
    </div>
  );
}

function DropdownItem({ icon, label, danger }: any) {
  return (
    <li
      className={`flex items-center gap-2 px-3 py-2 cursor-pointer transition ${
        danger ? "text-red-400 hover:bg-red-950/40" : COLORS.hover
      }`}
    >
      {icon}
      {label}
    </li>
  );
}

function SelectableItem({ icon, label, active, onClick }: any) {
  return (
    <li
      onClick={onClick}
      className={`flex items-center justify-between px-3 py-2 cursor-pointer transition ${COLORS.hover}`}
    >
      <div className="flex items-center gap-2">
        {icon} {label}
      </div>
      {active && <Check size={16} />}
    </li>
  );
}

function FilterItem({ icon, label, active, onClick }: any) {
  return (
    <li
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2 cursor-pointer transition ${
        active ? "bg-rose-800/50" : COLORS.hover
      }`}
    >
      <input
        type="checkbox"
        checked={active}
        readOnly
        className="w-4 h-4 pointer-events-none"
      />
      {icon}
      {label}
    </li>
  );
}
