import "../header/header.css";
import { CiSearch } from "react-icons/ci";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useState } from "react";

import { DefState } from "../../context/Context";
import Theme from "../theme/Theme";
const Header = () => {
  const {
    handleSubmit,
    setInput,
    input,
    setLoading,
    searchSwitch,
    setSearchSwitch,
  } = DefState();

  const handleWord = (e) => {
    setInput(e.target.value);
  };

  const handleSearchSwitch = () => {
    setSearchSwitch((prev) => !prev);
    setLoading(false);
  };

  return (
    <>
      {!searchSwitch ? (
        <div className="flex justify-between items-center p-2">
          <h1 className="text-2xl font-extrabold text-[--secondary-color]">
            WORDY
          </h1>
          <div className="flex items-center justify-center">
            <Theme />
            <CiSearch
              onClick={handleSearchSwitch}
              className="w-[2rem] h-[2rem] rounded-full text-[--primary-color] cursor-pointer"
            />
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex gap-2 items-center border-[1px] border-[--primary-color] py-2  px-4 rounded-md "
        >
          <FaArrowLeftLong
            onClick={handleSearchSwitch}
            className="text-2xl rounded-full text-[--primary-color]"
          />

          <input
            type="text"
            placeholder="search a word"
            className="px-2 text-xl w-[100%] bg-transparent outline-none border-0 text-[--primary-color]"
            value={input}
            onChange={handleWord}
          />
        </form>
      )}
    </>
  );
};

export default Header;
