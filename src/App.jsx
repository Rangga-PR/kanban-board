import React from "react";
import Home from "./pages/Home";
import Header from "./components/Header";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";

function App() {
  return (
    <DndProvider backend={Backend}>
      <Header />
      <Home />
    </DndProvider>
  );
}

export default App;
