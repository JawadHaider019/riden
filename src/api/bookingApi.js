import api from './api';

/**
 * Create a new booking
 * POST /passenger/bookings/create
 */
export const createBooking = async (bookingData) => {
    const res = await api.post('/passenger/bookings/create', bookingData);
    return res.data;
};

/**
 * Cancel a booking
 * POST /passenger/bookings/{id}/cancel
 */
export const cancelBooking = async (bookingId) => {
    const res = await api.post(`/passenger/bookings/${bookingId}/cancel`);
    return res.data;
};

/**
 * Get ongoing bookings
 * GET /passenger/bookings/ongoing
 */
export const getOngoingBookings = async () => {
    const res = await api.get('/passenger/bookings/ongoing');
    return res.data;
};

/**
 * Get booking history
 * GET /passenger/bookings/history
 */
export const getBookingHistory = async () => {
    const res = await api.get('/passenger/bookings/history');
    return res.data;
};

/**
 * Get vehicle types
 * GET /passenger/vehicle/types
 */
export const getVehicleTypes = async () => {
    const res = await api.get('/passenger/vehicle/types');
    return res.data;
};

/**
 * Get booking detail
 * GET /passenger/bookings/{id}
 */
export const getBookingDetail = async (id) => {
    const res = await api.get(`/passenger/bookings/${id}`);
    return res.data;
};
