import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Calendar, 
  Users, 
  Settings, 
  TrendingUp, 
  Clock,
  ArrowRight,
  Star,
  Hotel
} from 'lucide-react';
import { useTour } from '../contexts/TourContext';

const Dashboard = () => {
  const { user } = useTour();

  const stats = [
    { icon: MapPin, label: 'Tours Completed', value: '3', color: 'text-sky-600' },
    { icon: Calendar, label: 'Upcoming Trips', value: '1', color: 'text-green-600' },
    { icon: Users, label: 'Travel Companions', value: '12', color: 'text-purple-600' },
    { icon: Star, label: 'Total Reviews', value: '8', color: 'text-yellow-600' }
  ];

  const recentBookings = [
    {
      id: '1',
      destination: 'Bali, Indonesia',
      date: '2025-03-15',
      status: 'confirmed',
      image: 'https://images.pexels.com/photos/2386653/pexels-photo-2386653.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 1299
    },
    {
      id: '2',
      destination: 'Swiss Alps',
      date: '2025-04-20',
      status: 'pending',
      image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 2199
    }
  ];

  const quickActions = [
    {
      title: 'Plan New Tour',
      description: 'Create your next adventure',
      icon: MapPin,
      link: '/tour-planner',
      color: 'from-sky-500 to-blue-600'
    },
    {
      title: 'Browse Hotels',
      description: 'Find perfect accommodations',
      icon: Hotel,
      link: '/hotels',
      color: 'from-green-500 to-emerald-600'
    },
    {
      title: 'View Bookings',
      description: 'Manage your reservations',
      icon: Calendar,
      link: '/dashboard',
      color: 'from-purple-500 to-violet-600'
    },
    {
      title: 'Account Settings',
      description: 'Update your profile',
      icon: Settings,
      link: '/dashboard',
      color: 'from-orange-500 to-red-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-sky-500 to-blue-600 rounded-2xl p-8 text-white mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {user?.name || 'Traveler'}!
              </h1>
              <p className="text-sky-100 text-lg">
                Ready for your next adventure? Let's plan something amazing.
              </p>
            </div>
            <div className="mt-6 md:mt-0">
              <Link
                to="/tour-planner"
                className="bg-white text-sky-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 inline-flex items-center"
              >
                Plan New Tour
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg bg-gray-100 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Quick Actions</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  to={action.link}
                  className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-200"
                >
                  <div className={`bg-gradient-to-r ${action.color} p-3 rounded-lg w-fit mb-4 group-hover:shadow-md transition-shadow`}>
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-sky-600 transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{action.description}</p>
                  <div className="flex items-center mt-4 text-sky-600 group-hover:text-sky-700">
                    <span className="text-sm font-medium">Get Started</span>
                    <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Recent Bookings</h3>
                <Link to="/dashboard" className="text-sky-600 hover:text-sky-700 text-sm font-medium">
                  View All
                </Link>
              </div>

              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <img
                      src={booking.image}
                      alt={booking.destination}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{booking.destination}</h4>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(booking.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            booking.status === 'confirmed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {booking.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">${booking.price}</div>
                      <div className="text-sm text-gray-600">per person</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="space-y-6">
            {/* Profile Summary */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Profile Summary</h3>
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-sky-500 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">
                    {user?.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{user?.name || 'User'}</h4>
                  <p className="text-gray-600 text-sm">{user?.email}</p>
                  <div className="flex items-center mt-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">Premium Traveler</span>
                  </div>
                </div>
              </div>
              <Link
                to="/dashboard"
                className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center justify-center"
              >
                <Settings className="h-4 w-4 mr-2" />
                Edit Profile
              </Link>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {[
                  { action: 'Booked hotel in Bali', time: '2 hours ago', icon: Hotel },
                  { action: 'Completed Swiss Alps tour', time: '3 days ago', icon: MapPin },
                  { action: 'Left review for Tokyo tour', time: '1 week ago', icon: Star },
                  { action: 'Updated profile information', time: '2 weeks ago', icon: Settings }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="bg-sky-100 p-2 rounded-lg">
                      <activity.icon className="h-4 w-4 text-sky-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-600 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;