import { SidebarProvider } from "./context/SidebarContext.jsx";
import { ThemeSwitchProvider } from "./context/ThemeSwitchContext.jsx";
import "./index.css";
import HomePage from "./pages/HomePage.jsx";
import { Route, Routes } from "react-router";
import NoteFound from "./pages/NoteFound.jsx";
import SingleChat from "./pages/SingleChat.jsx";
import MainHeader from "./ui/ChatScreen/MainHeader.jsx";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <ThemeSwitchProvider>
      <SidebarProvider>
        <Toaster />
        <Routes>
          <Route path="/" element={<HomePage />}>
            <Route index element={<MainHeader />} />
            <Route path="c/:id" element={<SingleChat />} />
          </Route>
          <Route path="*" element={<NoteFound />} />
          <Route path="/not-found" element={<NoteFound />} />
        </Routes>
      </SidebarProvider>
    </ThemeSwitchProvider>
  );
}

export default App;
