import React, { createContext, useContext, useState } from 'react';

const TourContext = createContext(undefined);

const initialBookingState = {
  currentBooking: {},
  step: 1,
};

export const TourProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [bookingState, setBookingState] = useState(initialBookingState);

  const updateBooking = (booking) => {
    setBookingState(prev => ({
      ...prev,
      currentBooking: { ...prev.currentBooking, ...booking }
    }));
  };

  const selectHotel = (hotel) => {
    setBookingState(prev => ({
      ...prev,
      selectedHotel: hotel,
      currentBooking: { ...prev.currentBooking, hotel }
    }));
  };

  const setStep = (step) => {
    setBookingState(prev => ({ ...prev, step }));
  };

  const resetBooking = () => {
    setBookingState(initialBookingState);
  };

  return (
    <TourContext.Provider value={{
      user,
      bookingState,
      setUser,
      updateBooking,
      selectHotel,
      setStep,
      resetBooking,
    }}>
      {children}
    </TourContext.Provider>
  );
};

export const useTour = () => {
  const context = useContext(TourContext);
  if (context === undefined) {
    throw new Error('useTour must be used within a TourProvider');
  }
  return context;
};