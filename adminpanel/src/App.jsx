import React, { useContext } from "react";
import Hero from "./scenes/dashbord/Hero.jsx";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Sidebar from "./scenes/global/Sidebar.jsx";
import { ThemeFunc } from "./scenes/assets/CreateApi.jsx";
import Footer from "./scenes/dashbord/Footer.jsx";
import Graph from "./scenes/dashbord/Graph.jsx";
const App = () => {
  const { Toggle } = useContext(ThemeFunc);

  
  return (
    <BrowserRouter>
      <div className={`flex min-h-screen ${Toggle === "light" ? "bg-gray-50" : "bg-gray-900"}`}>
        <div className="flex-1 flex flex-col">
          <Sidebar />
          <main className={`flex-1 lg:p-6 p-3 overflow-auto transition-colors duration-300 ${Toggle === "light" ? "bg-gray-50" : "bg-gray-900 text-white"}`}>
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/graph" element={<Graph />} />
            </Routes>
          </main>
          <Footer/>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
