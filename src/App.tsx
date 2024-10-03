import { BrowserRouter, Route, Routes } from "react-router-dom";
import Accordion from "./components/Accordion";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import { items } from "./constants/accordion";

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/accordion" element={<Accordion items={items} />} />
      </Routes>
    </BrowserRouter>
  );
}
