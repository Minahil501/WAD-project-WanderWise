// Type definitions as JSDoc comments for better IDE support

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} email
 * @property {string} name
 * @property {string} [avatar]
 */

/**
 * @typedef {Object} TourPackage
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {number} price
 * @property {string} duration
 * @property {string} image
 * @property {number} rating
 * @property {number} reviews
 * @property {'solo' | 'group'} type
 */

/**
 * @typedef {Object} Hotel
 * @property {string} id
 * @property {string} name
 * @property {string} location
 * @property {number} rating
 * @property {number} price
 * @property {string} image
 * @property {string[]} amenities
 * @property {number} reviews
 */

/**
 * @typedef {Object} TourBooking
 * @property {string} id
 * @property {string} destination
 * @property {string} startDate
 * @property {string} endDate
 * @property {number} travelers
 * @property {'solo' | 'group'} packageType
 * @property {string[]} activities
 * @property {Hotel} [hotel]
 * @property {number} totalPrice
 * @property {'pending' | 'confirmed' | 'completed'} status
 */

/**
 * @typedef {Object} BookingState
 * @property {Partial<TourBooking>} currentBooking
 * @property {Hotel} [selectedHotel]
 * @property {number} step
 */

export {};