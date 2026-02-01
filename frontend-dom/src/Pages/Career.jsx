import React from 'react';
import { Briefcase, MapPin, Clock, ArrowRight } from 'lucide-react';

const Career = () => {
  const jobOpenings = [
    {
      id: 1,
      role: "Senior Frontend Engineer",
      department: "Engineering",
      location: "Remote / New York",
      type: "Full-time"
    },
    {
      id: 2,
      role: "Product Designer",
      department: "Design",
      location: "London, UK",
      type: "Full-time"
    },
    {
      id: 3,
      role: "Marketing Manager",
      department: "Growth",
      location: "Remote",
      type: "Contract"
    }
  ];

  return (
    <div className="bg-white min-h-screen text-gray-900">
      <section className="py-20 px-6 text-center bg-gray-50">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Help us build the <span className="text-blue-600">future</span>.
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          We’re looking for passionate, curious, and creative minds to join our mission. 
          Check out our open roles below.
        </p>
      </section>

      <section className="max-w-6xl mx-auto py-16 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 border border-gray-100 rounded-2xl shadow-sm">
            <h3 className="font-bold text-xl mb-2">Remote-First</h3>
            <p className="text-gray-500">Work from anywhere in the world. We value output over office hours.</p>
          </div>
          <div className="p-6 border border-gray-100 rounded-2xl shadow-sm">
            <h3 className="font-bold text-xl mb-2">Annual Retreats</h3>
            <p className="text-gray-500">We fly the whole team to a new destination every year to bond and recharge.</p>
          </div>
          <div className="p-6 border border-gray-100 rounded-2xl shadow-sm">
            <h3 className="font-bold text-xl mb-2">Learning Budget</h3>
            <p className="text-gray-500">A yearly stipend for books, courses, and conferences to help you grow.</p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto py-16 px-6">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold">Open Positions</h2>
            <p className="text-gray-500">Join our growing team</p>
          </div>
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
            {jobOpenings.length} Roles
          </span>
        </div>

        <div className="space-y-4">
          {jobOpenings.map((job) => (
            <div 
              key={job.id} 
              className="group p-6 border border-gray-200 rounded-xl hover:border-blue-500 transition-all cursor-pointer bg-white hover:shadow-md"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h4 className="text-xl font-bold group-hover:text-blue-600 transition-colors">
                    {job.role}
                  </h4>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Briefcase size={14} /> {job.department}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={14} /> {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} /> {job.type}
                    </span>
                  </div>
                </div>
                <button className="whitespace-nowrap bg-white border-2 border-black px-6 py-2 
            rounded-xl font-bold hover:bg-black hover:text-white transition-all
             shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 
             active:translate-y-1">
                  Apply Now <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-gray-900 text-white py-16 px-6 text-center mt-20">
        <h2 className="text-2xl font-bold mb-4">Don't see a fit?</h2>
        <p className="text-gray-400 mb-8">We are always looking for amazing talent. Send us your resume anyway!</p>
        <button className="underline underline-offset-4 hover:text-blue-400 font-medium">
          Send a General Application
        </button>
      </section>
    </div>
  );
};

export default Career;