import { BrowserRouter, Route, Routes } from "react-router-dom";
import Accordion from "./components/Accordion";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import { items } from "./constants/accordion";
import Counter from "./components/Counter";
import AutoComplete from "./components/AutoCompleteTypeAhead";
import Calculator from "./components/Calculator";
import { calculatorButtons } from "./constants/calculator";

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/accordion" element={<Accordion items={items} />} />
        <Route path="/counter" element={<Counter delay={1000} />} />
        <Route path="/autocomplete" element={<AutoComplete />} />
        <Route
          path="/calculator"
          element={<Calculator calculatorButtons={calculatorButtons} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
