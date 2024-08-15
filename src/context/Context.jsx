import { createContext, useContext, useState } from "react";

export const DefContext = createContext();

const DefProvider = ({ children }) => {
  const [definitions, setDefinitions] = useState([]);
  const [word, setWord] = useState("");
  const [audio,setAudio]=useState('')
  return (
    <DefContext.Provider
      value={{ word, audio,setAudio, setWord, definitions, setDefinitions }}
    >
      {children}
    </DefContext.Provider>
  );
};

export default DefProvider;

export const DefState = () => {
  return useContext(DefContext);
};
