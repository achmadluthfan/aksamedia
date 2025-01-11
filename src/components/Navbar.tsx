import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon, Monitor, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const [hamburgerActive, setHamburgerActive] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }

    function handleResize() {
      if (window.innerWidth >= 768) {
        setHamburgerActive(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 relative">
          <div className="flex items-center">
            <Link
              to="/dashboard"
              className="text-xl font-bold text-gray-800 dark:text-white"
            >
              Dashboard
            </Link>
          </div>

          <div className="flex items-center space-x-4 ">
            <button
              className="h-5 w-6 flex flex-col justify-between md:hidden"
              onClick={() => setHamburgerActive(!hamburgerActive)}
            >
              <span
                className={`w-full h-[3px] rounded-md bg-slate-300 ${
                  hamburgerActive ? "rotate-45 origin-left" : ""
                }`}
              ></span>
              <span
                className={`w-full h-[3px]  rounded-md bg-slate-300 ${
                  hamburgerActive ? "hidden" : ""
                }`}
              ></span>
              <span
                className={`w-full h-[3px] rounded-md bg-slate-300 ${
                  hamburgerActive ? "-rotate-45 origin-left" : ""
                }`}
              ></span>
            </button>

            <div
              className={`flex items-center space-x-4 md:hidden absolute top-[4.5rem] p-2 rounded-md shadow-lg bg-gray-50 dark:bg-slate-800 right-0 ${
                hamburgerActive ? "block" : "hidden"
              }`}
            >
              <div className="flex space-x-2">
                <button
                  onClick={() => setTheme("light")}
                  className={`p-2 rounded-lg ${
                    theme === "light" ? "bg-gray-200" : ""
                  }`}
                >
                  <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
                <button
                  onClick={() => setTheme("dark")}
                  className={`p-2 rounded-lg ${
                    theme === "dark" ? "dark:bg-gray-700" : ""
                  }`}
                >
                  <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
                <button
                  onClick={() => setTheme("system")}
                  className={`p-2 rounded-lg ${
                    theme === "system" ? "bg-gray-200 dark:bg-gray-700" : ""
                  }`}
                >
                  <Monitor className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>

              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 text-gray-700 dark:text-white hover:text-gray-900 dark:hover:text-gray-300"
                >
                  <span>{user?.fullName}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-md shadow-lg py-1 z-10">
                    <a
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Profile
                    </a>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="md:flex items-center space-x-4 hidden">
              <div className="flex space-x-2">
                <button
                  onClick={() => setTheme("light")}
                  className={`p-2 rounded-lg ${
                    theme === "light" ? "bg-gray-200" : ""
                  }`}
                >
                  <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
                <button
                  onClick={() => setTheme("dark")}
                  className={`p-2 rounded-lg ${
                    theme === "dark" ? "dark:bg-gray-700" : ""
                  }`}
                >
                  <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
                <button
                  onClick={() => setTheme("system")}
                  className={`p-2 rounded-lg ${
                    theme === "system" ? "bg-gray-200 dark:bg-gray-700" : ""
                  }`}
                >
                  <Monitor className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>

              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 text-gray-700 dark:text-white hover:text-gray-900 dark:hover:text-gray-300"
                >
                  <span>{user?.fullName}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10">
                    <a
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Profile
                    </a>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
