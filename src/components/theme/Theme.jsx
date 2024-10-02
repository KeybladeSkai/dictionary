import { MdDarkMode } from "react-icons/md";
import { useEffect, useState } from "react";
import { CiLight } from "react-icons/ci";

const Theme = () => {
  const [mode, setMode] = useState(() => {
    const savedTheme = localStorage.getItem("selectedTheme");
    return savedTheme === "dark" ? false : true; // `true` for light, `false` for dark
  });

  useEffect(() => {
    const body = document.querySelector("body");
    if (!body) return; // Early exit if body is not found

    const theme = mode ? "light" : "dark";
    body.setAttribute("data-theme", theme);
    localStorage.setItem("selectedTheme", theme);
  }, [mode]);

  const toggleTheme = () => {
    setMode((prevMode) => !prevMode);
  };

  return (
    <div>
      {mode ? (
        <MdDarkMode
          className="w-[2rem] h-[2rem] rounded-full mr-4 text-[--primary-color] cursor-pointer"
          onClick={toggleTheme}
        />
      ) : (
        <CiLight
          className="w-[2rem] h-[2rem] rounded-full mr-4 text-[--primary-color] cursor-pointer"
          onClick={toggleTheme}
        />
      )}
    </div>
  );
};

export default Theme;
