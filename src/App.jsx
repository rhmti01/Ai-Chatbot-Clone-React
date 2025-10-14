import MainContent from "./pages/MainContent";
import Sidebar from "./pages/Sidebar";
import { SidebarProvider } from "./context/SidebarContext";
import "./index.css";

function App() {
  return (
    <SidebarProvider>
      <div className="font-outfit relative min-w-full h-dvh lg:grid lg:grid-cols-[clamp(280px,25vw,330px)_1fr] grid-rows-1  ">
        <Sidebar />
        <MainContent />
      </div>
    </SidebarProvider>
  );
}

export default App;
