import { MdDarkMode } from "react-icons/md";
import { useEffect, useState } from "react";
import { CiLight } from "react-icons/ci";

const Theme = () => {
  //   const [mode, setMode] = useState(true);
  //   //   const setDarkMode = () => {
  //   //     document.querySelector("body").setAttribute("data-theme", "dark");
  //   //   };
  //   //   const setLightMode = () => {
  //   //     document.querySelector("body").setAttribute("data-theme", "light");
  //   //   };
  //   //   setDarkMode();

  //   //   const toggleTheme = () => {
  //   //     if (mode) {
  //   //       setMode(false);
  //   //       console.log(mode);
  //   //       setDarkMode();
  //   //     } else {
  //   //       setMode(true);

  //   //       setLightMode();
  //   //     }
  //   //   };

  //   useEffect(() => {
  //     // Update the body's data-theme attribute based on the `light` state
  //     if (mode) {
  //       document.querySelector("body").setAttribute("data-theme", "light"),
  //         localStorage.setItem("selectedTheme", "light");

  //     } else {
  //       document.querySelector("body").setAttribute("data-theme", "dark");
  //       localStorage.setItem("selectedTheme", "dark");
  //     }
  //   }, [mode]);

  //   const toggleTheme = () => {
  //     setMode((prev) => !prev);
  //   };

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
          className="w-[2rem] h-[2rem] rounded-full mr-4 text-[--primary-color]"
          onClick={toggleTheme}
        />
      ) : (
        <CiLight
          className="w-[2rem] h-[2rem] rounded-full mr-4 text-[--primary-color]"
          onClick={toggleTheme}
        />
      )}
    </div>
  );
};

export default Theme;
