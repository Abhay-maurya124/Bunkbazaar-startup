import {
  CalendarRange,
  KanbanSquare,
  LineChart,
  ShoppingCart,
  Users,
  User,
  LayoutTemplate,
  AreaChart,
  X,
  GitGraphIcon,
  PieChart,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { ThemeFunc } from "../assets/CreateApi";
import { useContext } from "react";

const Dashboard = [
  {
    head: "Dashboard",
    items: [
      {
        icon: <CalendarRange size={18} />,
        label: "Home",
        path: "/",
      },
    ],
  },
  {
    head: "Pages",
    items: [
      {
        icon: <ShoppingCart size={18} />,
        label: "Orders",
        path: "/orders",
      },
      {
        icon: <Users size={18} />,
        label: "Employees",
        path: "/employees",
      },
      {
        icon: <User size={18} />,
        label: "Customers",
        path: "/customers",
      },
    ],
  },
  {
    head: "Apps",
    items: [
      {
        icon: <CalendarRange size={18} />,
        label: "Calendar",
        path: "/calendar1",
      },
      {
        icon: <KanbanSquare size={18} />,
        label: "Kanban",
        path: "/kanban",
      },
      {
        icon: <LayoutTemplate size={18} />,
        label: "Editor",
        path: "/editor",
      },
    ],
  },
  {
    head: "Charts",
    items: [
      {
        icon: <LineChart size={18} />,
        label: "Line Chart",
        path: "/line",
      },
      {
        icon: <GitGraphIcon size={18} />,
        label: "Graph",
        path: "/graph",
      },
      {
        icon: <AreaChart size={18} />,
        label: "Area Chart",
        path: "/area",
      },
      {
        icon: <PieChart size={18} />,
        label: "Pi Chart",
        path: "/piechart1",
      },
    ],
  },
];

const Navbar = () => {
  const { Toggle, sidecloser, open } = useContext(ThemeFunc);

  return (
    <div className={`
      fixed lg:sticky top-0 z-40 lg:h-screen overflow-hidden transition-all duration-300 ease-in-out
      ${Toggle === "light" ? "bg-white border-r border-gray-200" : "bg-gray-900 border-r border-gray-700 text-white"}
      ${open ? "lg:w-64" : "w-0 overflow-hidden"}

    `}>
      <div className={`flex justify-between items-center p-5 border-b ${Toggle === "light" ? "bg-white border-gray-200" : "bg-gray-900 border-gray-700"}`}>
        <h3 className="text-2xl font-bold">Admin Panel</h3>
        <button 
          onClick={sidecloser}
          className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Close sidebar"
        >
          <X size={20} />
        </button>
      </div>

      <nav
      onClick={sidecloser}
      className="p-4 h-[100vh] overflow-y-auto ">
        {Dashboard.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-6">
            <h2 className={`text-xs uppercase font-semibold mb-2 ${Toggle === "light" ? "text-gray-500" : "text-gray-400"}`}>
              {section.head}
            </h2>
            <ul className="space-y-1">
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center p-2 rounded-lg transition-colors text-sm font-medium
                      ${isActive ? 'bg-amber-100 text-amber-700 dark:bg-gray-700 dark:text-amber-400' :
                        Toggle === 'light' ? 'hover:bg-gray-100 text-gray-700' : 'hover:bg-gray-700 text-gray-200'}`
                    }
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Navbar;