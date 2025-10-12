import MainContent from "./components/MainContent";
import Sidebar from "./components/Sidebar";
import "./index.css";

function App() {
  return (
    <div className="min-w-full h-dvh lg:grid lg:grid-cols-[clamp(280px,25vw,320px)_1fr] ">
      <Sidebar />
      <MainContent />
    </div>
  );
}

export default App;
