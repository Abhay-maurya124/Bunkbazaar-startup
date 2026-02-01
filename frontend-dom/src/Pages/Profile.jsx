import React from 'react';
import { User, Mail, Phone, MapPin, Calendar, Edit2 } from 'lucide-react'; 

const Customer = () => {
  const customerData = {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 000-1234",
    location: "New York, USA",
    joinedDate: "January 2024",
    status: "Active",
    totalOrders: 42
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header / Hero Section */}
      <div className="bg-white rounded-2xl shadow-sm p-8 mb-6 flex flex-col md:flex-row items-center gap-6">
        <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
          {customerData.name.charAt(0)}
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-2xl font-bold text-gray-900">{customerData.name}</h1>
          <p className="text-gray-500 flex items-center justify-center md:justify-start gap-2">
            <Mail size={16} /> {customerData.email}
          </p>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
          <Edit2 size={18} /> Edit Profile
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Account Status</p>
          <p className="text-lg font-semibold text-green-600">{customerData.status}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Total Orders</p>
          <p className="text-lg font-semibold text-gray-900">{customerData.totalOrders}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Member Since</p>
          <p className="text-lg font-semibold text-gray-900">2024</p>
        </div>
      </div>
      {/* Details Section */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold">Contact Information</h2>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
              <Phone size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider">Phone</p>
              <p className="text-gray-900 font-medium">{customerData.phone}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
              <MapPin size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider">Location</p>
              <p className="text-gray-900 font-medium">{customerData.location}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
              <Calendar size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider">Registration Date</p>
              <p className="text-gray-900 font-medium">{customerData.joinedDate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customer;