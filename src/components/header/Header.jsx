import "../header/header.css";
import { CiSearch } from "react-icons/ci";
import { FaArrowLeftLong } from "react-icons/fa6";
import { MdDarkMode } from "react-icons/md";
import { useState } from "react";
import { FaDiceFive } from "react-icons/fa";
import { DefState } from "../../context/Context";

import axios from "axios";
const Header = () => {
  const [searchSwitch, setSearchSwitch] = useState(false);
  const [input, setInput] = useState("");
  const { setDefinitions, setAudio, setWord } = DefState();
  const define = [];
  const defineAudio = [];

  // const [response, setResponse] = useState(null);

  // functions
  // console.log(input);

  const handleWord = (e) => {
    setInput(e.target.value);
    // console.log(input);
  };

  const handleSearchSwitch = () => {
    setSearchSwitch((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setInput("");

    try {
      axios
        .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${input}`, input)
        .then((response) => {
          // console.log(response);
          const elementDef = response.data[0].meanings[0].definitions;
          elementDef.map((item) => {
            define.push(item.definition);
            setWord(input);
            setDefinitions(define);
          });
          const elementAudio = response.data[0].phonetics;
          const item = elementAudio.find((item) => item.audio != "");
          if (item) {
            item.audio !== "" && defineAudio.push(item.audio);

            setAudio(defineAudio);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {!searchSwitch ? (
        <div className="flex justify-between items-center p-2">
          <h1 className="text-2xl font-extrabold text-[#180161]">WORDY</h1>
          <div className="flex items-center justify-center">
            <FaDiceFive className="w-[2rem] h-[2rem] rounded-full mr-4  color" />
            <MdDarkMode className="w-[2rem] h-[2rem] rounded-full mr-4  color" />
            <CiSearch
              onClick={handleSearchSwitch}
              className="w-[2rem] h-[2rem] rounded-full color"
            />
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex gap-2 items-center border-[1px] border-black py-2  px-4 rounded-md "
        >
          <FaArrowLeftLong
            onClick={handleSearchSwitch}
            className="text-2xl rounded-full color"
          />

          <input
            type="text"
            placeholder="search a word"
            className="px-2 text-xl w-[100%] bg-transparent outline-none border-0"
            value={input}
            onChange={handleWord}
          />
        </form>
      )}
    </div>
  );
};

export default Header;
