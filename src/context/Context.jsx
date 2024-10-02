import { createContext, useContext, useState } from "react";
import axios from "axios";
export const DefContext = createContext();

const DefProvider = ({ children }) => {
  const [definitions, setDefinitions] = useState([]);
  const [word, setWord] = useState("");
  const [audio, setAudio] = useState("");
  const [error, setError] = useState("");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchSwitch, setSearchSwitch] = useState(false);
  const [voiceLoad, setVoiceLoad] = useState(false);
  const define = [];
  const defineAudio = [];

  const handleSubmit = async (e) => {
    e.preventDefault();

    setInput("");

    try {
      setLoading(true);
      // const baseUrl = "https://api.dictionaryapi.dev/api/v2/entries/en";
      axios
        .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${input}`, input)
        .then((response) => {
          const elementAudio = response.data[0].phonetics;
          const item = elementAudio.find((item) => item.audio != "");
          if (item) {
            item.audio !== "" && defineAudio.push(item.audio);
            setAudio(defineAudio);
          }
          const elementDef = response.data[0].meanings[0].definitions;
          elementDef.map((item) => {
            define.push(item.definition);
            setWord(input);
            setDefinitions(define);
          });
        });
      // console.log(response);
    } catch {
      console.log("Word doesn't exist");
    }
  };

  return (
    <DefContext.Provider
      value={{
        word,
        error,
        setError,
        handleSubmit,
        audio,
        setAudio,
        setWord,
        definitions,
        setDefinitions,
        setInput,
        input,
        loading,
        setLoading,
        searchSwitch,
        setSearchSwitch,
        voiceLoad,
        setVoiceLoad,
      }}
    >
      {children}
    </DefContext.Provider>
  );
};

export default DefProvider;

export const DefState = () => {
  return useContext(DefContext);
};
