import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CreditCard, 
  Calendar, 
  MapPin, 
  Users, 
  Hotel,
  Shield,
  CheckCircle,
  ArrowLeft,
  Lock
} from 'lucide-react';
import { useTour } from '../contexts/TourContext';

const Checkout = () => {
  const { bookingState, resetBooking } = useTour();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    email: '',
    phone: ''
  });

  const { currentBooking, selectedHotel } = bookingState;

  // Calculate pricing
  const calculateDuration = () => {
    if (!currentBooking.startDate || !currentBooking.endDate) return 1;
    const start = new Date(currentBooking.startDate);
    const end = new Date(currentBooking.endDate);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  };

  const duration = calculateDuration();
  const basePrice = 1200; // Base tour price
  const hotelPrice = selectedHotel ? selectedHotel.price * duration : 0;
  const travelers = currentBooking.travelers || 1;
  const subtotal = (basePrice + hotelPrice) * travelers;
  const taxes = subtotal * 0.12;
  const total = subtotal + taxes;

  const handleInputChange = (field, value) => {
    setPaymentData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));

    setIsProcessing(false);
    setShowSuccess(true);

    setTimeout(() => {
      resetBooking();
      navigate('/dashboard');
    }, 3000);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Booking Confirmed!</h2>
          <p className="text-gray-600 mb-6">
            Your tour has been successfully booked. You'll receive a confirmation email shortly.
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800 font-medium">Booking Reference: #WW-2025-001</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate('/hotels')}
            className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            Back to Hotels
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Payment Details</h2>

              {/* Payment Method Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { id: 'credit', name: 'Credit Card', icon: CreditCard },
                    { id: 'paypal', name: 'PayPal', icon: Shield },
                    { id: 'bank', name: 'Bank Transfer', icon: Shield }
                  ].map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-4 border-2 rounded-lg flex items-center justify-center space-x-2 transition-colors ${
                        paymentMethod === method.id
                          ? 'border-sky-500 bg-sky-50 text-sky-700'
                          : 'border-gray-300 hover:border-sky-300 text-gray-700'
                      }`}
                    >
                      <method.icon className="h-5 w-5" />
                      <span className="font-medium">{method.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Credit Card Form */}
              {paymentMethod === 'credit' && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={paymentData.cardNumber}
                        onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                        placeholder="1234 5678 9012 3456"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={paymentData.expiryDate}
                        onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                        placeholder="MM/YY"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        value={paymentData.cvv}
                        onChange={(e) => handleInputChange('cvv', e.target.value)}
                        placeholder="123"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        value={paymentData.cardName}
                        onChange={(e) => handleInputChange('cardName', e.target.value)}
                        placeholder="John Doe"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={paymentData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="john@example.com"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={paymentData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="+1 (555) 123-4567"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <Lock className="h-5 w-5 text-gray-600 mr-2" />
                      <p className="text-sm text-gray-700">
                        Your payment information is encrypted and secure. We never store your card details.
                      </p>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Processing Payment...
                      </>
                    ) : (
                      <>
                        <Lock className="h-5 w-5 mr-2" />
                        Complete Booking (${total.toFixed(2)})
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Other Payment Methods */}
              {paymentMethod !== 'credit' && (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <Shield className="h-12 w-12 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {paymentMethod === 'paypal' ? 'PayPal Payment' : 'Bank Transfer'}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    You'll be redirected to complete your payment securely.
                  </p>
                  <button
                    onClick={handleSubmit}
                    disabled={isProcessing}
                    className="bg-gradient-to-r from-sky-500 to-blue-600 text-white py-3 px-8 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    Continue to {paymentMethod === 'paypal' ? 'PayPal' : 'Bank Transfer'}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Booking Summary</h3>

              {/* Trip Details */}
              <div className="space-y-4 mb-6">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-sky-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">{currentBooking.destination}</p>
                    <p className="text-sm text-gray-600">Destination</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Calendar className="h-5 w-5 text-sky-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">
                      {currentBooking.startDate} - {currentBooking.endDate}
                    </p>
                    <p className="text-sm text-gray-600">{duration} nights</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Users className="h-5 w-5 text-sky-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">{travelers} traveler(s)</p>
                    <p className="text-sm text-gray-600 capitalize">{currentBooking.packageType} package</p>
                  </div>
                </div>

                {selectedHotel && (
                  <div className="flex items-start space-x-3">
                    <Hotel className="h-5 w-5 text-sky-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">{selectedHotel.name}</p>
                      <p className="text-sm text-gray-600">${selectedHotel.price}/night</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Activities */}
              {currentBooking.activities && currentBooking.activities.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-2">Selected Activities</h4>
                  <div className="space-y-1">
                    {currentBooking.activities.map((activity, index) => (
                      <p key={index} className="text-sm text-gray-600">• {activity}</p>
                    ))}
                  </div>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tour package ({travelers} × ${basePrice})</span>
                  <span className="text-gray-900">${(basePrice * travelers).toFixed(2)}</span>
                </div>
                
                {selectedHotel && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Hotel ({duration} nights × ${selectedHotel.price})</span>
                    <span className="text-gray-900">${(hotelPrice * travelers).toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxes & fees</span>
                  <span className="text-gray-900">${taxes.toFixed(2)}</span>
                </div>
                
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-lg font-semibold text-sky-600">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-sky-50 border border-sky-200 rounded-lg p-4">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-sky-600 mr-2" />
                  <div>
                    <p className="text-sm font-medium text-sky-900">Free Cancellation</p>
                    <p className="text-xs text-sky-700">Cancel up to 24 hours before your trip</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;