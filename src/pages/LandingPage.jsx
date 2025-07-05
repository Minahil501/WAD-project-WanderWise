import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Star, 
  Users, 
  Globe, 
  Shield, 
  Clock,
  MapPin,
  Heart,
  TrendingUp
} from 'lucide-react';
import { TOUR_PACKAGES, TESTIMONIALS } from '../utils/constants';

const LandingPage = () => {
  const stats = [
    { icon: Users, value: '50K+', label: 'Happy Travelers' },
    { icon: Globe, value: '100+', label: 'Destinations' },
    { icon: Shield, value: '24/7', label: 'Support' },
    { icon: TrendingUp, value: '98%', label: 'Satisfaction Rate' }
  ];

  const services = [
    {
      icon: MapPin,
      title: 'Custom Tour Planning',
      description: 'Personalized itineraries crafted just for you'
    },
    {
      icon: Users,
      title: 'Group & Solo Tours',
      description: 'Choose your adventure style - solo or with friends'
    },
    {
      icon: Heart,
      title: 'Premium Hotels',
      description: 'Handpicked accommodations for comfort and luxury'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock assistance during your journey'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1483772/pexels-photo-1483772.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2)'
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40" />
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Discover Your Next
            <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent block">
              Adventure
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Create unforgettable memories with expertly crafted tours, premium accommodations, and personalized experiences.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/tour-planner"
              className="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
            >
              Start Planning
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/hotels"
              className="bg-white bg-opacity-20 backdrop-blur-sm text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-opacity-30 transition-all duration-300 border border-white border-opacity-30"
            >
              Browse Hotels
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gradient-to-r from-sky-500 to-blue-600 p-4 rounded-full w-16 h-16 mx-auto mb-4 group-hover:shadow-lg transition-shadow">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose WanderWise?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide exceptional travel experiences with attention to every detail
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow group">
                <div className="bg-gradient-to-r from-sky-500 to-blue-600 p-3 rounded-lg w-fit mb-6 group-hover:shadow-md transition-shadow">
                  <service.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tours */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Tour Packages
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Handpicked destinations for your perfect getaway
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TOUR_PACKAGES.map((tour) => (
              <div key={tour.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-3 py-1 rounded-full">
                    <span className="text-sm font-semibold text-gray-900 capitalize">{tour.type}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{tour.title}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-700">{tour.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{tour.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-sky-600">${tour.price}</span>
                      <span className="text-gray-500 ml-1">/ {tour.duration}</span>
                    </div>
                    <Link
                      to="/tour-planner"
                      className="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-shadow"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Travelers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real experiences from real travelers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-sky-600 to-blue-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-sky-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied travelers and create memories that last a lifetime
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/tour-planner"
              className="bg-white text-sky-600 px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
            >
              Plan Your Tour
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/auth"
              className="bg-sky-500 bg-opacity-20 backdrop-blur-sm text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-opacity-30 transition-all duration-300 border border-white border-opacity-30"
            >
              Sign Up Free
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;