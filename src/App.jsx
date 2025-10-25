import { SidebarProvider } from "./context/SidebarContext";
import "./index.css";
import "./services/gemini"
import HomePage from "./pages/HomePage";

function App() {

  return (
    <SidebarProvider>
      <HomePage/>
    </SidebarProvider>
  );
}

export default App;
