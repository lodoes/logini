// components/ProfileSection.js
import React from 'react';

const ProfileSection = () => {
  return (
    <section className="bg-blue-50 p-10 text-center">
      <h2 className="text-3xl font-semibold">Build a great profile</h2>
      <p className="text-gray-600 mt-2">
        Save your favorite properties and get personalized recommendations.
      </p>
      <button className="mt-4 bg-blue-600 text-white py-2 px-6 rounded">Create</button>
    </section>
  );
};

export default ProfileSection;
