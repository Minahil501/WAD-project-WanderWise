import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Calendar, 
  Users, 
  ArrowRight, 
  ArrowLeft, 
  Check,
  Plus
} from 'lucide-react';
import { useTour } from '../contexts/TourContext';

const TourPlanner = () => {
  const { updateBooking, setStep } = useTour();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    travelers: 1,
    packageType: 'group',
    activities: [],
    budget: 'medium'
  });

  const steps = [
    { number: 1, title: 'Destination & Dates', icon: MapPin },
    { number: 2, title: 'Travelers & Package', icon: Users },
    { number: 3, title: 'Activities & Preferences', icon: Plus },
    { number: 4, title: 'Review & Continue', icon: Check }
  ];

  const popularDestinations = [
    'Bali, Indonesia',
    'Swiss Alps, Switzerland',
    'Tokyo, Japan',
    'Maldives',
    'Paris, France',
    'New York, USA',
    'Dubai, UAE',
    'Thailand'
  ];

  const availableActivities = [
    'Sightseeing Tours',
    'Adventure Sports',
    'Cultural Experiences',
    'Food & Wine Tours',
    'Beach Activities',
    'Mountain Hiking',
    'City Walking Tours',
    'Photography Tours',
    'Spa & Wellness',
    'Shopping Tours'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleActivity = (activity) => {
    setFormData(prev => ({
      ...prev,
      activities: prev.activities.includes(activity)
        ? prev.activities.filter(a => a !== activity)
        : [...prev.activities, activity]
    }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    updateBooking({
      destination: formData.destination,
      startDate: formData.startDate,
      endDate: formData.endDate,
      travelers: formData.travelers,
      packageType: formData.packageType,
      activities: formData.activities
    });
    setStep(1);
    navigate('/hotels');
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.destination && formData.startDate && formData.endDate;
      case 2:
        return formData.travelers > 0;
      case 3:
        return true; // Activities are optional
      case 4:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Plan Your Perfect Tour</h1>
          <p className="text-xl text-gray-600">Let's create an unforgettable journey tailored just for you</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center space-x-4">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className="flex items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors ${
                      currentStep >= step.number
                        ? 'bg-sky-500 border-sky-500 text-white'
                        : 'bg-white border-gray-300 text-gray-500'
                    }`}
                  >
                    <step.icon className="h-5 w-5" />
                  </div>
                  <div className="ml-3 hidden sm:block">
                    <p className={`text-sm font-medium ${
                      currentStep >= step.number ? 'text-sky-600' : 'text-gray-500'
                    }`}>
                      Step {step.number}
                    </p>
                    <p className={`text-xs ${
                      currentStep >= step.number ? 'text-sky-500' : 'text-gray-400'
                    }`}>
                      {step.title}
                    </p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-8 h-0.5 transition-colors ${
                      currentStep > step.number ? 'bg-sky-500' : 'bg-gray-300'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Step 1: Destination & Dates */}
          {currentStep === 1 && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Where would you like to go?</h2>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Choose your destination
                  </label>
                  <input
                    type="text"
                    value={formData.destination}
                    onChange={(e) => handleInputChange('destination', e.target.value)}
                    placeholder="Search or select a destination"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                  {popularDestinations.map((dest) => (
                    <button
                      key={dest}
                      onClick={() => handleInputChange('destination', dest)}
                      className={`p-3 text-sm border rounded-lg transition-colors hover:border-sky-500 hover:text-sky-600 ${
                        formData.destination === dest
                          ? 'border-sky-500 bg-sky-50 text-sky-600'
                          : 'border-gray-300 text-gray-700'
                      }`}
                    >
                      {dest}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => handleInputChange('startDate', e.target.value)}
                      className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => handleInputChange('endDate', e.target.value)}
                      className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Travelers & Package */}
          {currentStep === 2 && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Tell us about your group</h2>
                
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Number of travelers
                  </label>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleInputChange('travelers', Math.max(1, formData.travelers - 1))}
                      className="w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center hover:border-sky-500 transition-colors"
                    >
                      -
                    </button>
                    <span className="text-2xl font-semibold text-gray-900 w-16 text-center">
                      {formData.travelers}
                    </span>
                    <button
                      onClick={() => handleInputChange('travelers', formData.travelers + 1)}
                      className="w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center hover:border-sky-500 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Package Type
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      onClick={() => handleInputChange('packageType', 'solo')}
                      className={`p-6 border-2 rounded-lg text-left transition-colors ${
                        formData.packageType === 'solo'
                          ? 'border-sky-500 bg-sky-50'
                          : 'border-gray-300 hover:border-sky-300'
                      }`}
                    >
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Solo Adventure</h3>
                      <p className="text-gray-600">Perfect for independent travelers seeking freedom and flexibility</p>
                    </button>
                    <button
                      onClick={() => handleInputChange('packageType', 'group')}
                      className={`p-6 border-2 rounded-lg text-left transition-colors ${
                        formData.packageType === 'group'
                          ? 'border-sky-500 bg-sky-50'
                          : 'border-gray-300 hover:border-sky-300'
                      }`}
                    >
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Group Experience</h3>
                      <p className="text-gray-600">Join like-minded travelers and make new friends along the way</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Activities */}
          {currentStep === 3 && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">What interests you?</h2>
                <p className="text-gray-600 mb-6">Select activities you'd like to experience (optional)</p>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {availableActivities.map((activity) => (
                    <button
                      key={activity}
                      onClick={() => toggleActivity(activity)}
                      className={`p-4 border-2 rounded-lg text-left transition-colors ${
                        formData.activities.includes(activity)
                          ? 'border-sky-500 bg-sky-50 text-sky-700'
                          : 'border-gray-300 hover:border-sky-300 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{activity}</span>
                        {formData.activities.includes(activity) && (
                          <Check className="h-4 w-4 text-sky-600" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-8">
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Budget Range
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { value: 'budget', label: 'Budget Friendly', desc: 'Under $1,000 per person' },
                      { value: 'medium', label: 'Moderate', desc: '$1,000 - $3,000 per person' },
                      { value: 'luxury', label: 'Luxury', desc: 'Over $3,000 per person' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleInputChange('budget', option.value)}
                        className={`p-4 border-2 rounded-lg text-left transition-colors ${
                          formData.budget === option.value
                            ? 'border-sky-500 bg-sky-50'
                            : 'border-gray-300 hover:border-sky-300'
                        }`}
                      >
                        <h3 className="font-semibold text-gray-900 mb-1">{option.label}</h3>
                        <p className="text-sm text-gray-600">{option.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {currentStep === 4 && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Review Your Tour Plan</h2>
                
                <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Destination</h3>
                      <p className="text-gray-700">{formData.destination}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Duration</h3>
                      <p className="text-gray-700">
                        {formData.startDate} to {formData.endDate}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Travelers</h3>
                      <p className="text-gray-700">{formData.travelers} person(s)</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Package Type</h3>
                      <p className="text-gray-700 capitalize">{formData.packageType} Experience</p>
                    </div>
                  </div>

                  {formData.activities.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Selected Activities</h3>
                      <div className="flex flex-wrap gap-2">
                        {formData.activities.map((activity) => (
                          <span
                            key={activity}
                            className="bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-sm"
                          >
                            {activity}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-sky-50 border border-sky-200 rounded-lg p-6">
                  <h3 className="font-semibold text-sky-900 mb-2">Next Step</h3>
                  <p className="text-sky-700">
                    We'll help you find the perfect accommodations for your trip. Continue to browse available hotels in {formData.destination}.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </button>

            {currentStep < 4 ? (
              <button
                onClick={nextStep}
                disabled={!isStepValid()}
                className="flex items-center px-8 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next Step
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex items-center px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
              >
                Find Hotels
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourPlanner;