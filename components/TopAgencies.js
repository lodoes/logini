// components/TopAgencies.js
import React from 'react';

const TopAgencies = () => {
  const agencies = [
    { name: 'Agency 1', location: 'New York', jobs: 20 },
    { name: 'Agency 2', location: 'Los Angeles', jobs: 15 },
    // Add more agencies
  ];

  return (
    <section className="p-10 text-center">
      <h2 className="text-3xl font-semibold">Top Real Estate Agencies</h2>
      <div className="flex justify-center gap-6 mt-6">
        {agencies.map((agency, index) => (
          <div key={index} className="p-4 border rounded shadow">
            <h3 className="font-semibold">{agency.name}</h3>
            <p className="text-sm">{agency.location}</p>
            <p className="text-sm">{agency.jobs} properties</p>
          </div>
        ))}
      </div>
      <button className="block mx-auto mt-6 bg-blue-600 text-white py-2 px-4 rounded">
        See more
      </button>
    </section>
  );
};

export default TopAgencies;
