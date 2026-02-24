import React, { useContext } from "react";
import Hero from "./scenes/dashbord/Hero.jsx";
import Customers from "./scenes/dashbord/Customers.jsx";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Order from "./scenes/dashbord/Order.jsx";
import Employees from "./scenes/dashbord/Employees.jsx";
import Calendar1 from "./scenes/dashbord/Calendar1.jsx";
import Kanban from "./scenes/dashbord/Kanban.jsx";
import Editor from "./scenes/dashbord/Editor.jsx";
import LineChart1 from "./scenes/dashbord/LineChart.jsx";
import Areachart from "./scenes/dashbord/Areachart.jsx";
import Graph from "./scenes/dashbord/Graph.jsx";
import Piechart1 from "./scenes/dashbord/Piechart.jsx";
import Navbar from "./scenes/global/Navbar.jsx";
import Sidebar from "./scenes/global/Sidebar.jsx";
import { ThemeFunc } from "./scenes/assets/CreateApi.jsx";
import Footer from "./scenes/dashbord/Footer.jsx";
const App = () => {
  const { Toggle } = useContext(ThemeFunc);

  
  return (
    <BrowserRouter>
      <div className={`flex min-h-screen ${Toggle === "light" ? "bg-gray-50" : "bg-gray-900"}`}>
        <Navbar />
        <div className="flex-1 flex flex-col">
          <Sidebar />
          <main className={`flex-1 lg:p-6 p-3 overflow-auto transition-colors duration-300 ${Toggle === "light" ? "bg-gray-50" : "bg-gray-900 text-white"}`}>
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/orders" element={<Order />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/calendar1" element={<Calendar1 />} />
              <Route path="/kanban" element={<Kanban />} />
              <Route path="/editor" element={<Editor />} />
              <Route path="/line" element={<LineChart1 />} />
              <Route path="/area" element={<Areachart />} />
              <Route path="/graph" element={<Graph />} />
              <Route path="/piechart1" element={<Piechart1 />} />
            </Routes>
          </main>
          <Footer/>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
