import { AiOutlineSound } from "react-icons/ai";
import { DefState } from "../../context/Context";
import { MdCancel } from "react-icons/md";
import axios from "axios";
import { useState, useEffect } from "react";
const Body = () => {
  const { definitions, word, setDefinitions, audio } = DefState();
  console.log(audio);
  const hearAudio = () => {
    audio.forEach((sound) => {
      const audioElement = new Audio(sound);
      audioElement.play();
    });
  };
  // quotes
  const [quote, setQuote] = useState("");
  const [quoteId, setQuoteId] = useState("");
  const [loading, setLoading] = useState(true);
  const fetchData = () => {
    try {
      axios.get("https://api.adviceslip.com/advice").then((response) => {
        console.log(response.data);
        setQuote(response.data.slip.advice);
        setQuoteId(response.data.slip.id);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    const timer = setTimeout(() => {
      fetchData();
    }, 10000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {definitions.length === 0 ? (
        <div className="flex flex-col justify-between min-h-[75vh] pt-10 px-2">
          <div>
            <p className="text-[3rem] font-bold color ">
              LEARN NEW WORDS WITH WORDY.....
            </p>
          </div>

          <div className="w-full text-center  gap-5 py-3 flex place-items-center px-4 font-bold  rounded-md flex-col">
            <p className="text-xl">Quotes #{quoteId}</p>
            <p className="text-xl">{quote}</p>
          </div>
        </div>
      ) : (
        <div className="px-1 pt-8 p-2 rounded-md  min-h-[50svh] flex flex-col gap-6">
          <div>
            <div className="flex justify-between">
              <h1 className="flex items-center gap-2 mb-2 ">
                <AiOutlineSound
                  onClick={hearAudio}
                  className="text-blue-800 w-[2rem] h-[2rem]"
                />

                <span className="text-2xl">/{word}/</span>
              </h1>
              <MdCancel
                onClick={() => setDefinitions([])}
                className="w-[2rem] h-[2rem] mr-2"
              />
            </div>
          </div>
          <div className="overflow-auto">
            {definitions.map((definition, index) => {
              const num = index + 1;
              return (
                <div key={index} className="flex  gap-2 text-md mb-8">
                  <span className="">{num}.</span>
                  <p className="">{definition}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Body;
