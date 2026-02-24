import React, { useState, useEffect, useRef, useContext } from 'react';
import { ThemeFunc } from '../assets/CreateApi';

const EventPopup = ({ isOpen, onClose, onSave, event, date }) => {
  const [title, setTitle] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const ref = useRef();

  const { Toggle } = useContext(ThemeFunc);

  // Pre-fill inputs for new or edit
  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setStart(event.start.toISOString().slice(0, 16));
      setEnd(event.end.toISOString().slice(0, 16));
    } else if (date) {
      const d = new Date(date);
      setTitle('');
      setStart(d.toISOString().slice(0, 16));
      d.setHours(d.getHours() + 1);
      setEnd(d.toISOString().slice(0, 16));
    }
  }, [event, date]);

  // Click outside to close
  useEffect(() => {
    const handle = e => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [onClose]);

  const submit = e => {
    e.preventDefault();
    onSave({
      id: event?.id,
      title,
      start: new Date(start),
      end: new Date(end),
    });
  };

  return (
    <div className={`fixed inset-0 bg-opacity-50 flex items-center justify-center z-50
          `}>
      <div ref={ref} className=" bg-gray-400 rounded-lg shadow-lg max-w-md w-full p-6">
        <h2 className="text-xl font-semibold mb-4">{event ? 'Edit Event' : 'Add Event'}</h2>
        <form onSubmit={submit} className={`"space-y-4 p-10 rounded ${Toggle === "light" ? "bg-white border-r border-gray-200" : "bg-gray-500 border-r border-gray-700 text-white"}`}>
          <div>
            <label className="block text-sm font-medium ">Title</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)}
              className="mt-1 block w-full border-gray-500 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required />
          </div>
          <div>
            <label className="block text-sm font-medium ">Start</label>
            <input type="datetime-local" value={start} onChange={e => setStart(e.target.value)}
              className="mt-1 block w-full border-gray-500 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">End</label>
            <input type="datetime-local" value={end} onChange={e => setEnd(e.target.value)}
              className="mt-1 block w-full border-gray-500 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required />
          </div>
          <div className="flex justify-end space-x-2 mt-6">
            <button type="button" onClick={onClose}
              className="px-4 py-2 bg-gray-400 rounded hover:bg-gray-700">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventPopup;
