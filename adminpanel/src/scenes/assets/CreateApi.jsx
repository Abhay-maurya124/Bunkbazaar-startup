import { createContext, useState } from "react";
export const ThemeFunc = createContext();

export const Theme = ({ children }) => {
  const [Toggle, setToggle] = useState("light");
  const [open, setOpen] = useState(false); // Default to open

  const Togglebg = () => {
    setToggle(prev => (prev === "light" ? "dark" : "light"));
  };

  const sidecloser = () => {
    setOpen(prev => !prev);
  };

  const value = {
    Toggle,
    Togglebg,
    sidecloser,
    open
  };


  return (
    <ThemeFunc.Provider value={value}>
      {children}
    </ThemeFunc.Provider>
  );
};
