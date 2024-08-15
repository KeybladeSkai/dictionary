import Header from "./components/header/Header";
import Body from "./components/body/Body";

const App = () => {
  return (
    <div className="h-screen px-3 pt-6 flex flex-col gap-1 overflow-hidden bg-[--bg-color]">
      <Header />
      <Body />
    </div>
  );
};

export default App;
