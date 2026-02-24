import React, { useContext, useState } from "react";
import Pagination from "../global/Pagination";
import { NavLink } from "react-router-dom";
import { ThemeFunc } from "../assets/CreateApi";

const headers = [
  { key: "image", label: "Contact" },
  { key: "name", label: "Name" },
  { key: "project", label: "Project" },
  { key: "status", label: "Status" },
  { key: "weeks", label: "Weeks" },
  { key: "budget", label: "Budget" },
  { key: "location", label: "Location" },
];

const statuses = ["Pending", "In Progress", "Completed", "Denied"];

const Customer = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Customer${i + 1}`,
  email: `Customer${i + 1}@gmail.com`,
  status: statuses[Math.floor(Math.random() * statuses.length)],
  project: `Project ${i + 1}`,
  location: `City ${i + 1}`,
  weeks: `${Math.floor(Math.random() * 10) + 1} weeks`,
  image: `https://i.pravatar.cc/150?img=${i + 1}`,
  budget: `$${Math.floor(Math.random() * 230) + 30}k`,
}));

export default function Customers() {
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [search, setSearch] = useState("");

  const filtered = Customer.filter((row) =>
    headers.some((col) =>
      (row[col.key] ?? "")
        .toString()
        .toLowerCase()
        .includes(search.toLowerCase())
    )
  );
  const firstIndex = (page - 1) * perPage;
  const current = filtered.slice(firstIndex, firstIndex + perPage);

  const STATUS_CLASSES = {
    Pending: "text-orange-800",
    "In Progress": "text-yellow-800",
    Completed: "text-green-800",
    Denied: "text-red-800",
  };
  const { Toggle } = useContext(ThemeFunc);

  return (
    <div className="p-2">
      <div className="flex flex-col items-center mb-4">
        <p className="text-gray-400">Page</p>
        <NavLink to="/customer" className="text-2xl font-semibold">
          Customers
        </NavLink>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded w-full max-w-xs p-2"
        />
      </div>

      <table className="min-w-full ">
        <thead className={`hidden sm:table-header-group 
          ${Toggle === "light" ? "bg-white shadow-gray-200" : "bg-gray-600 shadow-gray-200 text-white"} `}>
          <tr>
            {headers.map((col) => (
              <th
                key={col.key}
                className="px-2 py-3 text-left text-sm font-semibold"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={`block sm:table-row-group`}>
          {current.map((row) => (
            <tr
              key={row.id}
              className="block sm:table-row mb-4 sm:mb-0 bg-gray-50 sm:bg-transparent"
            >
              {headers.map((col) => (
                <td
                  key={col.key}
                  data-label={col.label}
                  className={`block sm:table-cell px-2 p-1 text-sm truncate ${col.key === "status" ? STATUS_CLASSES[row.status] : ""
                    }`}
                >
                  {col.key === "image" ? (
                    <div className="flex items-center">
                      <img
                        src={row.image}
                        alt={row.name}
                        className="sm:h-10 h-18 sm:w-10  rounded-full mr-6 "
                      />
                      <div className="">
                        <p className="font-medium hidden sm:block text-lg">{row.name}</p>
                        <p className="  sm:block text-xs text-gray-500">{row.email}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-wrap sm:block">
                      <span className="block sm:hidden font-semibold mr-3">{col.label}  :</span>
                      <span>{row[col.key]}</span>
                    </div>)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4">
        <Pagination
          totalItems={filtered.length}
          itemsPerPage={perPage}
          currentPage={page}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
