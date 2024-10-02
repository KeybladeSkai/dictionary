import Header from "./components/header/Header";
import Body from "./components/body/Body";
import { useState } from "react";
const App = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="h-[100vh] w-[100vw] px-3 pt-6 flex flex-col gap-1 overflow-hidden bg-[--bg-color]">
      <Header setLoading={setLoading} />
      <Body loading={loading} setLoading={setLoading} />
    </div>
  );
};

export default App;
