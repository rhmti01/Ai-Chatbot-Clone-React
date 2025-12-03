import { SidebarProvider } from "./context/SidebarContext";
import "./index.css";
import "./services/gemini";
import HomePage from "./pages/HomePage";
import { Navigate, Route, Routes } from "react-router";
import NoteFound from "./pages/NoteFound";
import SingleChat from "./pages/SingleChat.jsx";
import MainHeader from "./ui/ChatScreen/MainHeader.jsx";
import { Toaster } from "react-hot-toast";

function App() {
  return (
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
  );
}

export default App;
