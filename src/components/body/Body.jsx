import { AiOutlineSound } from "react-icons/ai";
import { DefState } from "../../context/Context";
import { MdCancel } from "react-icons/md";
import axios from "axios";
import { PropagateLoader } from "react-spinners";
import { useState, useEffect } from "react";
import { RingLoader } from "react-spinners";
const Body = () => {
  const {
    definitions,
    word,
    setDefinitions,
    audio,
    loading,
    setLoading,
    setSearchSwitch,
    voiceLoad,
    setVoiceLoad,
  } = DefState();

  console.log(audio);
  console.log("not found");
  const cancel = () => {
    setDefinitions([]);
    setLoading(false);
    setSearchSwitch(false);
  };
  const hearAudio = () => {
    setVoiceLoad(false);
    audio.forEach((sound) => {
      const audioElement = new Audio(sound);
      audioElement.play();
      setVoiceLoad(false)
      
    });
  };
  // quotes
  const [quote, setQuote] = useState("");
  const [quoteId, setQuoteId] = useState("");
  // const [loading, setLoading] = useState(true);
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
        <div className="flex flex-col justify-between pt-10 px-2 h-[80%] overflow-hidden">
          <div>
            <p className="text-[3rem] font-bold color ">
              {!loading ? (
                "LEARN NEW WORDS WITH WORDY....."
              ) : (
                <div className="w-[100%] h-[100vh] flex justify-center items-center">
                  <PropagateLoader color={`var(--primary-color)`} />
                </div>
              )}
            </p>
          </div>

          <div className="w-full text-center  gap-5 py-3 flex place-items-center px-4 font-bold  rounded-md flex-col">
            <p className="text-xl text-[--primary-color]">Quotes #{quoteId}</p>
            <p className="text-xl text-[--primary-color]">{quote}</p>
          </div>
        </div>
      ) : (
        <div className="px-1 pt-8 rounded-md  h-[90%] flex flex-col gap-6">
          <div>
            <div className="flex justify-between">
              <h1 className="flex items-center gap-2 mb-2 ">
                <div className="relative">
                  <AiOutlineSound
                    onClick={hearAudio}
                    className="text-blue-800 w-[2rem] h-[2rem] "
                  />
                  { voiceLoad ? (
                    <div className="absolute top-0">
                      <RingLoader color={`var(--primary-color)`} size={33} />
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <span className="text-2xl text-[--primary-color]">
                  /{word}/
                </span>
              </h1>
              <MdCancel
                onClick={cancel}
                className="w-[2rem] h-[2rem] mr-2 text-[--primary-color] cursor-pointer"
              />
            </div>
          </div>
          <div className="overflow-auto">
            {definitions.map((definition, index) => {
              const num = index + 1;
              return (
                <div key={index} className="flex  gap-2 text-md mb-8">
                  <span className="text-[--primary-color]">{num}.</span>
                  <p className="text-[--primary-color]">{definition}</p>
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
