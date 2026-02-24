import React, { useContext, useState } from 'react';
import { ThemeFunc } from '../assets/CreateApi';

const fakeOrder = (count) => {
  const items = ['t-shirt', 'jeans', 'shirt', 'trouser', 'mountains', 'river'];
  const statuses = ['pending', 'successfull', 'rejected', 'on-way'];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    image: `https://picsum.photos/50/50?random=${i}`,
    item: items[Math.floor(Math.random() * items.length)],
    amount: `$${(Math.random() * 100).toFixed(2)}`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    Orderid: `ORD-${1000 + i}`,
  }));
};

const Header = [
  {
    head: [
      { key: 'id', label: 'Id' },
      { key: 'image', label: 'Image' },
      { key: 'item', label: 'Item' },
      { key: 'amount', label: 'Amount' },
      { key: 'status', label: 'Status' },
      { key: 'Orderid', label: 'Order ID' },
    ],
  },
];

const Order = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const data = fakeOrder(50);

  // Filter based on search
  const filtered = data.filter((row) =>
    [row.item, row.Orderid, row.status].some((field) =>
      field.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Pagination calculations
  const totalPages = Math.ceil(filtered.length / pageSize);
  const pagedData = filtered.slice(
    pageIndex * pageSize,
    pageIndex * pageSize + pageSize
  );

  // Colorization logic
  const getRowClass = (status) => {
    if (status === 'rejected') return 'text-red-500';
    if (status === 'successfull') return 'text-green-500';
    if (status === 'pending') return 'text-orange-500';
    if (status === 'on-way') return 'font-bold';
    return 'text-black';
  };
  const { Toggle } = useContext(ThemeFunc);

  return (
    <div className="p-4 md:p-6">

      <div className='sm:flex text-xl items-center m-2'>
        <p className=''>Page</p>
        <h2 className='text-4xl font-bold hover:text-neutral-700 cursor-pointer'>/Order</h2>
      </div>      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by item, Order ID, or status"
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setPageIndex(0); }}
          className="w-full p-2 border rounded-lg text-base md:text-lg"
        />
      </div>

      {/* Table Container with Horizontal Scroll */}
      <div className="overflow-x-auto min-h-screen sm:min-w-full w-64 font-bold text-xl">
        <table className="w-full border-collapse">
          <thead>
            <tr className={`  ${Toggle === "light" ? "bg-white shadow-gray-200" : "bg-gray-600 shadow-gray-200 text-white"}`}>
              {Header[0].head.map((col) => (
                <th
                  key={col.key}
                  className="p-2 text-left border-b border-gray-300 text-sm md:text-xl"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pagedData.length > 0 ? (
              pagedData.map((row) => (
                <tr
                  key={row.id}
                  className={`border-b border-gray-200 hover:bg-gray-400 
                    ${getRowClass(row.status)}`}
                >
                  {Header[0].head.map((column) => (
                    <td key={column.key} className="p-2 text-sm md:text-lg">
                      {column.key === 'image' ? (
                        <img
                          src={row[column.key]}
                          alt={row.item}
                          className="w-8 h-8 md:w-10 md:h-10 rounded"
                        />
                      ) : (
                        <span className="whitespace-nowrap">{row[column.key]}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={Header[0].head.length} className="text-center p-4 text-sm md:text-base">
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between mt-4 gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPageIndex(0)}
            disabled={pageIndex === 0}
            className="p-1 md:p-2 disabled:opacity-50"
          >
            {'<<'}
          </button>
          <button
            onClick={() => setPageIndex(pageIndex - 1)}
            disabled={pageIndex === 0}
            className="p-1 md:p-2 disabled:opacity-50"
          >
            {'<'}
          </button>
          <span className="text-sm md:text-base">
            Page {pageIndex + 1} of {totalPages}
          </span>
          <button
            onClick={() => setPageIndex(pageIndex + 1)}
            disabled={pageIndex + 1 >= totalPages}
            className="p-1 md:p-2 disabled:opacity-50"
          >
            {'>'}
          </button>
          <button
            onClick={() => setPageIndex(totalPages - 1)}
            disabled={pageIndex + 1 >= totalPages}
            className="p-1 md:p-2 disabled:opacity-50"
          >
            {'>>'}
          </button>
        </div>

        <div className="flex items-center">
          <label className="text-sm md:text-base">
            Show{' '}
            <select
              value={pageSize}
              onChange={(e) => { setPageSize(+e.target.value); setPageIndex(0); }}
              className="border rounded p-1 text-sm md:text-base"
            >
              {[5, 10, 20].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>{' '}
            per page
          </label>
        </div>
      </div>
    </div>
  );
};

export default Order;