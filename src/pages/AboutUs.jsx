import React from 'react';

const AboutUs = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="bg-white py-8 px-4 md:px-16 shadow">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">About Us</h1>
      </div>

      {/* About Content */}
      <div className="max-w-4xl mx-auto bg-white mt-6 rounded-lg shadow p-6 md:p-10 text-gray-700">
        <p className="text-sm md:text-base leading-relaxed">
          WanderWise is your trusted companion for unforgettable travel experiences, creating memories that last a lifetime.
          Our mission is to simplify travel planning while inspiring your wanderlust.
          <br /><br />
          We understand that travel is not just about destinations; it’s about the journey, the stories, and the connections you build along the way.
          That’s why we are dedicated to providing you with personalized tour plans, comfortable stays, and insights that enhance every step of your adventure.
          <br /><br />
          Whether you’re looking to explore the serene beaches of Bali, the snowy peaks of the Swiss Alps, or the vibrant streets of Tokyo,
          WanderWise ensures your travel dreams turn into reality with seamless planning and unforgettable experiences.
          <br /><br />
          Our team of travel enthusiasts and local experts work tirelessly to bring you curated experiences that match your unique interests and pace.
          We believe in sustainable travel that respects local cultures and supports the communities we visit.
          <br /><br />
          At WanderWise, we envision a world where travel is accessible, enriching, and transformative for everyone.
          We are committed to continuous innovation, ensuring our platform is intuitive and our services exceed expectations.
          <br /><br />
          Let WanderWise be your guide as you embark on your next adventure, exploring the world with confidence, curiosity, and joy.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
