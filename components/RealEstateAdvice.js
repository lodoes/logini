// components/RealEstateAdvice.js
import React from 'react';

const RealEstateAdvice = () => {
  const articles = [
    {
      title: '5 Tips for First-Time Home Buyers',
      date: 'Jan 1, 2023',
      category: 'Advice',
      readTime: '5 mins read',
      image: 'https://www.arpej.fr/app/uploads/2024/09/residence-etudiante-paris-arppej-cipsion-studio-1-1-e1727442144431-1000x1000-c-default.png',
    },
    {
      title: 'How to Choose the Right Neighborhood',
      date: 'Feb 14, 2023',
      category: 'Neighborhood',
      readTime: '8 mins read',
      image: 'https://www.arpej.fr/app/uploads/2024/09/residence-etudiante-paris-arppej-cipsion-studio-1-1-e1727442144431-1000x1000-c-default.png',
    },
    {
      title: 'Investment Tips for Real Estate',
      date: 'Mar 10, 2023',
      category: 'Investment',
      readTime: '10 mins read',
      image: 'https://www.arpej.fr/app/uploads/2024/09/residence-etudiante-paris-arppej-cipsion-studio-1-1-e1727442144431-1000x1000-c-default.png',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto p-10">
      <header className="text-center mb-10">
        <h2 className="text-4xl font-semibold text-gray-800">Real Estate Advice</h2>
        <p className="text-gray-600">Get insights and tips from industry experts</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {articles.map((article, index) => (
          <article key={index} className="bg-white rounded-lg overflow-hidden shadow-lg transform hover:-translate-y-1 transition-transform duration-200">
            <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <p className="text-indigo-600 text-sm mb-2">{article.category}</p>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">{article.title}</h3>
              <div className="flex justify-between text-gray-500 text-sm">
                <span>{article.date}</span>
                <span>{article.readTime}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      <button className="block mx-auto bg-indigo-600 text-white py-3 px-8 rounded-full hover:bg-indigo-700 transition-colors duration-300">
        See more articles
      </button>
    </section>
  );
};

export default RealEstateAdvice;
