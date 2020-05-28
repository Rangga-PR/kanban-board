import React, { useState } from "react";
import Home from "./pages/Home";
import Header from "./components/Header";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";

function App() {
  const [user, setUser] = useState("");

  const handleUserChange = (user) => {
    setUser(user);
  };

  return (
    <DndProvider backend={Backend}>
      <Header username={user} />
      <Home userChange={handleUserChange} />
    </DndProvider>
  );
}

export default App;
