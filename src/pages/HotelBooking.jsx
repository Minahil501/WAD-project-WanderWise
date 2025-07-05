import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Star, 
  MapPin, 
  Wifi, 
  Car, 
  Coffee, 
  Waves,
  Filter,
  Search,
  ArrowRight,
  Users,
  Calendar
} from 'lucide-react';
import { useTour } from '../contexts/TourContext';
import { SAMPLE_HOTELS } from '../utils/constants';

const HotelBooking = () => {
  const { bookingState, selectHotel } = useTour();
  const navigate = useNavigate();
  const [hotels] = useState(SAMPLE_HOTELS);
  const [filteredHotels, setFilteredHotels] = useState(SAMPLE_HOTELS);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  
  const [filters, setFilters] = useState({
    priceRange: [0, 500],
    rating: 0,
    amenities: [],
    sortBy: 'price'
  });

  const [searchTerm, setSearchTerm] = useState('');

  const amenityIcons = {
    'WiFi': Wifi,
    'Pool': Waves,
    'Spa': Coffee,
    'Restaurant': Coffee,
    'Gym': Users,
    'Beach Access': Waves,
    'Parking': Car,
    'Room Service': Coffee,
    'Business Center': Users,
    'Pet Friendly': Users
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    applyFilters(newFilters, searchTerm);
  };

  const applyFilters = (currentFilters, search) => {
    let filtered = hotels.filter(hotel => {
      const matchesPrice = hotel.price >= currentFilters.priceRange[0] && hotel.price <= currentFilters.priceRange[1];
      const matchesRating = hotel.rating >= currentFilters.rating;
      const matchesSearch = hotel.name.toLowerCase().includes(search.toLowerCase()) || 
                           hotel.location.toLowerCase().includes(search.toLowerCase());
      const matchesAmenities = currentFilters.amenities.length === 0 || 
                              currentFilters.amenities.every(amenity => hotel.amenities.includes(amenity));
      
      return matchesPrice && matchesRating && matchesSearch && matchesAmenities;
    });

    // Sort results
    filtered.sort((a, b) => {
      switch (currentFilters.sortBy) {
        case 'price':
          return a.price - b.price;
        case 'rating':
          return b.rating - a.rating;
        case 'reviews':
          return b.reviews - a.reviews;
        default:
          return 0;
      }
    });

    setFilteredHotels(filtered);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    applyFilters(filters, value);
  };

  const handleHotelSelect = (hotel) => {
    setSelectedHotel(hotel);
    selectHotel(hotel);
  };

  const handleContinue = () => {
    if (selectedHotel) {
      navigate('/checkout');
    }
  };

  const allAmenities = Array.from(new Set(hotels.flatMap(hotel => hotel.amenities)));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Find Your Perfect Stay</h1>
            {bookingState.currentBooking.destination && (
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {bookingState.currentBooking.destination}
                </div>
                {bookingState.currentBooking.startDate && (
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {bookingState.currentBooking.startDate} - {bookingState.currentBooking.endDate}
                  </div>
                )}
                {bookingState.currentBooking.travelers && (
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {bookingState.currentBooking.travelers} traveler(s)
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Filters</h2>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
                >
                  <Filter className="h-5 w-5" />
                </button>
              </div>

              <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                {/* Search */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Search Hotels
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => handleSearch(e.target.value)}
                      placeholder="Hotel name or location"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range (per night)
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="500"
                      value={filters.priceRange[1]}
                      onChange={(e) => handleFilterChange({
                        ...filters,
                        priceRange: [0, parseInt(e.target.value)]
                      })}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>$0</span>
                      <span>${filters.priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Rating
                  </label>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => handleFilterChange({ ...filters, rating: rating })}
                        className={`p-1 ${
                          filters.rating >= rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      >
                        <Star className="h-5 w-5 fill-current" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amenities
                  </label>
                  <div className="space-y-2">
                    {allAmenities.slice(0, 6).map((amenity) => (
                      <label key={amenity} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.amenities.includes(amenity)}
                          onChange={(e) => {
                            const newAmenities = e.target.checked
                              ? [...filters.amenities, amenity]
                              : filters.amenities.filter(a => a !== amenity);
                            handleFilterChange({ ...filters, amenities: newAmenities });
                          }}
                          className="mr-2 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                        />
                        <span className="text-sm text-gray-700">{amenity}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Sort By */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sort By
                  </label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange({ ...filters, sortBy: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  >
                    <option value="price">Price (Low to High)</option>
                    <option value="rating">Rating (High to Low)</option>
                    <option value="reviews">Most Reviews</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Hotels List */}
          <div className="lg:w-3/4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {filteredHotels.length} hotel(s) found
              </h2>
            </div>

            <div className="space-y-6">
              {filteredHotels.map((hotel) => (
                <div
                  key={hotel.id}
                  className={`bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border-2 ${
                    selectedHotel?.id === hotel.id ? 'border-sky-500 bg-sky-50' : 'border-transparent'
                  }`}
                >
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <img
                        src={hotel.image}
                        alt={hotel.name}
                        className="w-full h-64 md:h-full object-cover"
                      />
                    </div>
                    <div className="p-6 md:w-2/3 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">{hotel.name}</h3>
                            <div className="flex items-center text-gray-600 mb-2">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span className="text-sm">{hotel.location}</span>
                            </div>
                            <div className="flex items-center">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < Math.floor(hotel.rating)
                                        ? 'text-yellow-400 fill-current'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="ml-2 text-sm text-gray-600">
                                {hotel.rating} ({hotel.reviews} reviews)
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-sky-600">${hotel.price}</div>
                            <div className="text-sm text-gray-600">per night</div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {hotel.amenities.slice(0, 4).map((amenity) => {
                            const IconComponent = amenityIcons[amenity] || Coffee;
                            return (
                              <div
                                key={amenity}
                                className="flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700"
                              >
                                <IconComponent className="h-3 w-3 mr-1" />
                                {amenity}
                              </div>
                            );
                          })}
                          {hotel.amenities.length > 4 && (
                            <div className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
                              +{hotel.amenities.length - 4} more
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => handleHotelSelect(hotel)}
                          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                            selectedHotel?.id === hotel.id
                              ? 'bg-sky-600 text-white'
                              : 'bg-sky-100 text-sky-600 hover:bg-sky-200'
                          }`}
                        >
                          {selectedHotel?.id === hotel.id ? 'Selected' : 'Select Hotel'}
                        </button>
                        <button className="text-sky-600 hover:text-sky-700 text-sm font-medium">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredHotels.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No hotels found</h3>
                <p className="text-gray-600">Try adjusting your filters or search criteria</p>
              </div>
            )}
          </div>
        </div>

        {/* Continue Button */}
        {selectedHotel && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">{selectedHotel.name}</h3>
                <p className="text-sm text-gray-600">${selectedHotel.price} per night</p>
              </div>
              <button
                onClick={handleContinue}
                className="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center"
              >
                Continue to Checkout
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelBooking;