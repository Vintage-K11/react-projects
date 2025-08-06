import { useTheme } from "../contexts/ThemeContext";

export default function ThemeBtn() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition"
    >
      {theme === "light" ? "Switch to Dark" : "Switch to Light"}
    </button>
  );
}