import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { getToken } from '../api/authApi';
import { createBooking, cancelBooking, getVehicleTypes, getBookingDetail, getOngoingBookings } from '../api/bookingApi';
import AuthModal from '../components/AuthModal';
import {
    HiMapPin,
    HiPlusCircle,
    HiChevronRight,
    HiXMark,
    HiArrowLeft,
    HiPhone,
    HiChevronDown
} from 'react-icons/hi2';
import {
    FaShareAlt,
    FaCommentDots,
    FaSmile,
    FaPaperPlane,
    FaChevronLeft
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useJsApiLoader, GoogleMap, Autocomplete, Marker } from '@react-google-maps/api';

// Imports and constants moved around

// Import assets
import standardCar from '../assets/standard_car.png';
import suvCar from '../assets/suv_car.png';
import vanCar from '../assets/van_car.png';
import driverProfile from '../assets/driver_profile.png';

const libraries = ['places'];
const center = { lat: 31.5204, lng: 74.3587 };
const PRICING = {
    baseFare: 5.00,
    ratePerKm: 1.20,
    ratePerMin: 0.30,
    stopFee: 2.50
};

const VEHICLE_MULTIPLIERS = {
    1: 1.0, // Economy
    2: 1.2, // Comfort
    3: 1.4, // Sedan
    4: 2.0, // Premium Sedan
    5: 1.8, // SUV
    6: 2.5, // Premium SUV
    7: 2.2, // Van / XL
    8: 1.3, // Electric
    9: 1.5  // Handicap
};

const darkGlowStyle = [
    { elementType: "geometry", stylers: [{ saturation: -100 }] },
    { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
    { elementType: "labels.text.fill", stylers: [{ saturation: -100 }, { lightness: 20 }] },
    { elementType: "labels.text.stroke", stylers: [{ saturation: -100 }, { lightness: 80 }] },
    { featureType: "road", elementType: "geometry", stylers: [{ lightness: 10 }] },
    { featureType: "water", elementType: "geometry", stylers: [{ lightness: 80 }] },
];

const formatEstimatedTime = (timeStr) => {
    if (!timeStr) return '5';
    if (typeof timeStr === 'number') return Math.ceil(timeStr / 60);
    const parts = timeStr.split(':');
    if (parts.length === 3) {
        const h = parseInt(parts[0]);
        const m = parseInt(parts[1]);
        const total = (h * 60) + m;
        return total > 0 ? total : (parseInt(parts[2]) > 0 ? '1' : '0');
    }
    return timeStr;
};

const getCoordValue = (coord, type) => {
    if (!coord) return null;
    // Handle Google Maps LatLng object
    if (typeof coord[type] === 'function') return coord[type]();
    // Handle plain object {lat: 1, lng: 2}
    return coord[type];
};

// Cleans an address: strips Plus Code prefixes and postal codes
const cleanAddress = (address) => {
    if (!address) return '';
    // Strip Plus Code prefix like "7355+P8Q," or "WQ64+83H "
    let cleaned = address.replace(/^[A-Z0-9]{4,}\+[A-Z0-9]{2,},?\s*/i, '');
    // Strip postal/zip codes (standalone 4-6 digit numbers)
    cleaned = cleaned.replace(/,?\s*\b\d{4,6}\b/g, '');
    // Clean up any leftover leading commas or whitespace
    cleaned = cleaned.replace(/^,\s*/, '').replace(/,\s*,/g, ',').trim();
    return cleaned;
};

// Builds a friendly address: prepends place name if available
const buildFriendlyAddress = (place) => {
    const raw = place.formatted_address || place.name || '';
    const cleaned = cleanAddress(raw);
    // If place.name exists and isn't already part of the formatted address, prepend it
    if (place.name && !cleaned.toLowerCase().startsWith(place.name.toLowerCase())) {
        // Make sure place.name itself isn't a Plus Code
        const nameLooksLikePlusCode = /^[A-Z0-9]{4,}\+/i.test(place.name);
        if (!nameLooksLikePlusCode) {
            return `${place.name}, ${cleaned}`;
        }
    }
    return cleaned;
};

const reverseGeocode = async (lat, lng) => {
    if (!window.google?.maps?.Geocoder) return null;
    const geocoder = new window.google.maps.Geocoder();
    try {
        const response = await geocoder.geocode({
            location: { lat: parseFloat(lat), lng: parseFloat(lng) },
            language: 'en'
        });
        if (response.results) {
            // Filter out Plus Code results entirely
            const validResults = response.results.filter(res =>
                !res.types.includes('plus_code') &&
                !/^[A-Z0-9]{4,}\+/i.test(res.formatted_address)
            );

            // Prefer results that include an establishment/POI name
            const poiResult = validResults.find(res =>
                res.types.some(t => ['establishment', 'point_of_interest', 'premise', 'subpremise'].includes(t))
            );

            const best = poiResult || validResults[0] || response.results[0];
            return cleanAddress(best.formatted_address);
        }
    } catch (err) {
        console.error('Geocoding failed', err);
    }
    return null;
};



const CAR_OPTIONS_DATA = [
    { id: 1, name: 'Economy', type: 'Budget', time: '2 min', capacity: 4, image: standardCar },
    { id: 2, name: 'Comfort', type: 'Relax', time: '4 min', capacity: 4, image: standardCar },
    { id: 3, name: 'Sedan', type: 'Standard', time: '3 min', capacity: 4, image: standardCar },
    { id: 4, name: 'Premium Sedan', type: 'Luxury', time: '5 min', capacity: 4, image: standardCar },
    { id: 5, name: 'SUV', type: 'Large', time: '4 min', capacity: 6, image: suvCar },
    { id: 6, name: 'Premium SUV', type: 'VIP', time: '6 min', capacity: 6, image: suvCar },
    { id: 7, name: 'Van / XL', type: 'Group', time: '7 min', capacity: 8, image: vanCar },
    { id: 8, name: 'Electric', type: 'Eco', time: '4 min', capacity: 4, image: standardCar },
    { id: 9, name: 'Handicap', type: 'Assist', time: '8 min', capacity: 2, image: vanCar },
];

const BookingPage = () => {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY || "",
        libraries: libraries
    });

    const [sidebarStep, setSidebarStep] = useState('details');
    const [selectedCar, setSelectedCar] = useState(CAR_OPTIONS_DATA[0]);
    const [isLoggedIn, setIsLoggedIn] = useState(!!getToken());
    const [isDrawerOpen, setIsDrawerOpen] = useState(true);
    const [step, setStep] = useState('booking');

    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [authInitialStep, setAuthInitialStep] = useState('phone');


    const [map, setMap] = useState(null);
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [routePath, setRoutePath] = useState([]);
    const [currentBooking, setCurrentBooking] = useState(null);
    const [bookingLoading, setBookingLoading] = useState(false);
    const [backendVehicleTypes, setBackendVehicleTypes] = useState([]);

    React.useEffect(() => {
        const fetchTypes = async () => {
            try {
                const res = await getVehicleTypes();
                const types = res.vehicleTypes || res.data || res;
                console.log('BACKEND VEHICLE TYPES:', types);
                if (Array.isArray(types)) {
                    setBackendVehicleTypes(types);
                } else if (types && typeof types === 'object' && Array.isArray(types.vehicleTypes)) {
                    setBackendVehicleTypes(types.vehicleTypes);
                }
            } catch (err) {
                console.error('Failed to fetch vehicle types', err);
            }
        };
        fetchTypes();
    }, []);

    React.useEffect(() => {
        const fetchOngoing = async () => {
            if (!getToken()) return;
            try {
                const res = await getOngoingBookings();
                // Check if there is an ongoing booking in the response
                const booking = res.booking || res.data || (Array.isArray(res) ? res[0] : (res.bookings ? res.bookings[0] : null));

                if (booking && booking.id) {
                    console.log('RESUMING ONGOING BOOKING:', booking);
                    setCurrentBooking(booking);

                    // Set immediate loading state while geocoding
                    setPickupLoc(booking.pickup_address || 'Loading...');
                    setDropoffLoc(booking.dropoff_address || 'Loading...');

                    // Reverse geocode in background
                    if (isLoaded) {
                        if (!booking.pickup_address) {
                            reverseGeocode(booking.pickup_lat, booking.pickup_lng).then(addr => {
                                if (addr) setPickupLoc(addr);
                            });
                        }
                        if (!booking.dropoff_address) {
                            reverseGeocode(booking.dropoff_lat, booking.dropoff_lng).then(addr => {
                                if (addr) setDropoffLoc(addr);
                            });
                        }
                    }

                    const pCoords = {
                        lat: parseFloat(booking.pickup_lat),
                        lng: parseFloat(booking.pickup_lng)
                    };
                    const dCoords = {
                        lat: parseFloat(booking.dropoff_lat),
                        lng: parseFloat(booking.dropoff_lng)
                    };

                    setPickupCoords(pCoords);
                    setDropoffCoords(dCoords);

                    // Center map on pickup
                    if (map) {
                        map.panTo(pCoords);
                        map.setZoom(15);
                    }

                    if (booking.status === 'requested') {
                        setSidebarStep('searching');
                    } else {
                        setSidebarStep('arriving'); // accepted, ongoing, etc.
                    }
                }
            } catch (err) {
                console.error('Failed to fetch ongoing booking', err);
            }
        };
        fetchOngoing();
    }, [isLoaded, map]);

    React.useEffect(() => {
        let interval;
        if (currentBooking && (currentBooking.id || currentBooking.booking_id) && sidebarStep === 'searching') {
            const bookingId = currentBooking.id || currentBooking.booking_id;
            interval = setInterval(async () => {
                try {
                    const res = await getBookingDetail(bookingId);
                    const booking = res.booking || res.data || res;
                    console.log('POLLING RESULT:', booking);

                    // Strictly transition only if status is definitely NOT 'requested'
                    if (booking && booking.status === 'accepted') {
                        console.log('RIDE ACCEPTED! Transitioning to Arriving screen');
                        setCurrentBooking(booking);
                        setSidebarStep('arriving');
                        clearInterval(interval);
                    }
                } catch (err) {
                    console.error('Polling error', err);
                }
            }, 5000); // Poll every 5 seconds
        }
        return () => clearInterval(interval);
    }, [currentBooking, sidebarStep]);

    const [pickupLoc, setPickupLoc] = useState('');
    const [dropoffLoc, setDropoffLoc] = useState('');
    const [stopsList, setStopsList] = useState([]);

    const [pickupCoords, setPickupCoords] = useState(null);
    const [dropoffCoords, setDropoffCoords] = useState(null);

    const [pickupAutocomplete, setPickupAutocomplete] = useState(null);
    const [dropoffAutocomplete, setDropoffAutocomplete] = useState(null);
    const stopAutocompletes = React.useRef({});

    // Dynamic Stats
    const [distanceKm, setDistanceKm] = useState(0);
    const [durationMin, setDurationMin] = useState(0);

    const pickupRef = React.useRef(null);
    const dropoffRef = React.useRef(null);
    const stopRefs = React.useRef({});

    // Request tracking to prevent race conditions
    const requestIdRef = React.useRef(0);
    const lastValidPickup = React.useRef('');
    const lastValidDropoff = React.useRef('');

    // Imperative polyline refs for guaranteed map cleanup
    const polylineRefs = React.useRef([]);

    const clearRouteFromMap = React.useCallback(() => {
        polylineRefs.current.forEach(pl => { if (pl) pl.setMap(null); });
        polylineRefs.current = [];
        setDirectionsResponse(null);
        setRoutePath([]);
        setDistanceKm(0);
        setDurationMin(0);
    }, []);

    const drawPolylineOnMap = React.useCallback((mapInstance, path) => {
        // Clear any existing polylines first
        polylineRefs.current.forEach(pl => { if (pl) pl.setMap(null); });
        polylineRefs.current = [];

        const configs = [
            { strokeColor: '#93c5fd', strokeWeight: 10, strokeOpacity: 0.25 },
            { strokeColor: '#60a5fa', strokeWeight: 5, strokeOpacity: 0.6 },
            { strokeColor: '#ffffff', strokeWeight: 2.5, strokeOpacity: 0.9 },
        ];
        configs.forEach(opts => {
            const pl = new window.google.maps.Polyline({ path, ...opts, map: mapInstance });
            polylineRefs.current.push(pl);
        });
    }, []);

    const handleAddStop = () => {
        setStopsList([...stopsList, { id: Date.now(), val: '' }]);
    };

    const handleStopChange = (id, val) => {
        setStopsList(stopsList.map(s => s.id === id ? { ...s, val } : s));
        stopRefs.current[id] = { value: val };
        requestIdRef.current++;
        clearRouteFromMap();
    };

    const handleRemoveStop = (id) => {
        setStopsList(stopsList.filter(s => s.id !== id));
        setTimeout(calculateRoute, 100);
    };

    const calculateRoute = async () => {
        const id = ++requestIdRef.current;
        const pickupVal = pickupRef.current?.value || lastValidPickup.current;
        const dropoffVal = dropoffRef.current?.value || lastValidDropoff.current;

        if (!pickupVal || !dropoffVal || !window.google) {
            clearRouteFromMap();
            if (!dropoffVal) setDropoffCoords(null);
            if (!pickupVal) setPickupCoords(null);
            return;
        }

        try {
            const directionsService = new window.google.maps.DirectionsService();
            const waypoints = stopsList.filter(s => !!stopRefs.current[s.id]).map(s => ({
                location: stopRefs.current[s.id].value,
                stopover: true
            }));

            const results = await directionsService.route({
                origin: pickupVal,
                destination: dropoffVal,
                waypoints: waypoints,
                travelMode: window.google.maps.TravelMode.DRIVING,
            });

            // If a newer request was started or input cleared, discard this one
            if (id !== requestIdRef.current || !pickupRef.current?.value || !dropoffRef.current?.value) {
                return;
            }

            setDirectionsResponse(results);
            const route = results.routes[0];
            setRoutePath([...route.overview_path]);

            // Draw imperatively on the map instance
            if (map) drawPolylineOnMap(map, route.overview_path);

            setPickupCoords(route.legs[0].start_location);
            setDropoffCoords(route.legs[route.legs.length - 1].end_location);

            let totalDist = 0;
            let totalDur = 0;
            route.legs.forEach(leg => {
                totalDist += leg.distance.value;
                totalDur += leg.duration.value;
            });

            setDistanceKm(totalDist / 1000);
            setDurationMin(totalDur / 60);
        } catch (error) {
            if (id === requestIdRef.current) {
                console.error("Calculate route error", error);
                clearRouteFromMap();
            }
        }
    };

    React.useEffect(() => {
        if (map && pickupCoords && !directionsResponse) {
            map.panTo(pickupCoords);
            map.setZoom(15);
        }
    }, [pickupCoords, map, directionsResponse]);

    React.useEffect(() => {
        const autoCalculateResumed = async () => {
            if (isLoaded && pickupCoords && dropoffCoords && !directionsResponse) {
                try {
                    const directionsService = new window.google.maps.DirectionsService();
                    const results = await directionsService.route({
                        origin: pickupCoords,
                        destination: dropoffCoords,
                        travelMode: window.google.maps.TravelMode.DRIVING,
                    });
                    setDirectionsResponse(results);
                    const route = results.routes[0];
                    setRoutePath([...route.overview_path]);
                    if (map) drawPolylineOnMap(map, route.overview_path);
                } catch (err) {
                    console.error('Auto route calculation failed', err);
                }
            }
        };
        autoCalculateResumed();
    }, [isLoaded, pickupCoords, dropoffCoords, directionsResponse, map, drawPolylineOnMap]);

    React.useEffect(() => {
        if (map && directionsResponse) {
            const bounds = new window.google.maps.LatLngBounds();
            directionsResponse.routes[0].overview_path.forEach(point => bounds.extend(point));
            map.fitBounds(bounds);
        }
    }, [directionsResponse, map]);


    const getCalculatedPrice = (carId) => {
        if (distanceKm === 0) return 0;
        const multiplier = VEHICLE_MULTIPLIERS[carId] || 1.0;
        const distCost = distanceKm * PRICING.ratePerKm * multiplier;
        const timeCost = durationMin * PRICING.ratePerMin;
        const stopsCost = stopsList.length * PRICING.stopFee;
        return PRICING.baseFare + distCost + timeCost + stopsCost;
    };

    const getCalculatedPriceStr = (carId) => {
        const total = getCalculatedPrice(carId);
        return `C$ ${total.toFixed(2)}`;
    };

    const getBaseRatePerKm = (carId) => {
        const multiplier = VEHICLE_MULTIPLIERS[carId] || 1.0;
        return (PRICING.ratePerKm * multiplier).toFixed(2);
    };

    const carOptions = CAR_OPTIONS_DATA.map(car => {
        const backendType = backendVehicleTypes.find(t => t.id === car.id);
        const imageHost = "https://api.itimium.com.pk/storage/";

        return {
            ...car,
            name: backendType?.category || car.name,
            // Construct the full storage URL for the vehicle image
            image: backendType?.image_path ? `${imageHost}${backendType.image_path}` : car.image,
            capacity: backendType?.capacity || car.capacity,
            price: getCalculatedPriceStr(car.id),
            baseRate: getBaseRatePerKm(car.id)
        };
    });

    const renderRideDetails = () => (
        <div className="flex flex-col gap-5 pb-8">
            <h2 className="text-xl audiowide-regular uppercase text-[#0E0E0E] text-center mt-4">
                Book Your Ride
            </h2>

            {/* Location Inputs */}
            <div className="space-y-3">
                <div className="flex items-center gap-3 border-b border-zinc-200 pb-2">
                    <div className="w-5 h-5 rounded-full border-4 border-black flex-shrink-0" />
                    {isLoaded ? (
                        <div className="flex-1">
                            <Autocomplete
                                onLoad={setPickupAutocomplete}
                                onPlaceChanged={() => {
                                    if (pickupAutocomplete) {
                                        const place = pickupAutocomplete.getPlace();
                                        if (place.geometry) {
                                            const addr = buildFriendlyAddress(place);
                                            setPickupLoc(addr);
                                            lastValidPickup.current = addr;
                                            setPickupCoords(place.geometry.location);
                                            calculateRoute();
                                        }
                                    }
                                }}>
                                <input
                                    type="text"
                                    ref={pickupRef}
                                    id="pickup-ac"
                                    placeholder="From"
                                    value={pickupLoc}
                                    onChange={(e) => {
                                        setPickupLoc(e.target.value);
                                        lastValidPickup.current = e.target.value;
                                        requestIdRef.current++;
                                        setPickupCoords(null);
                                        clearRouteFromMap();
                                    }}
                                    className="w-full bg-transparent outline-none text-[#0E0E0E] font-medium dm-sans text-sm"
                                />
                            </Autocomplete>
                        </div>
                    ) : <input type="text" placeholder="From..." className="w-full bg-transparent outline-none text-sm" />}
                </div>

                {stopsList.length > 0 && (
                    <div className="flex flex-col gap-2 pl-4 border-l-2 border-dashed border-zinc-200 ml-2">
                        {stopsList.map((stop) => (
                            <div key={stop.id} className="flex items-center gap-3 border-b border-zinc-200 pb-2 relative">
                                <div className="w-3 h-3 rounded-full border-4 border-zinc-400 flex-shrink-0" />
                                {isLoaded ? (
                                    <div className="flex-1">
                                        <Autocomplete
                                            onLoad={(auto) => stopAutocompletes.current[stop.id] = auto}
                                            onPlaceChanged={() => {
                                                const auto = stopAutocompletes.current[stop.id];
                                                if (auto) {
                                                    const place = auto.getPlace();
                                                    if (place.geometry) {
                                                        const addr = buildFriendlyAddress(place);
                                                        setStopsList(stopsList.map(s => s.id === stop.id ? { ...s, val: addr } : s));
                                                        calculateRoute();
                                                    }
                                                }
                                            }}>
                                            <input
                                                type="text"
                                                ref={(el) => stopRefs.current[stop.id] = el}
                                                id={`stop-${stop.id}`}
                                                placeholder="Stop Location"
                                                value={stop.val}
                                                onChange={(e) => handleStopChange(stop.id, e.target.value)}
                                                className="w-full bg-transparent outline-none text-[#0E0E0E] font-medium dm-sans text-sm"
                                            />
                                        </Autocomplete>
                                    </div>
                                ) : <input type="text" placeholder="Stop..." className="w-full bg-transparent outline-none text-sm" />}
                                <button onClick={() => handleRemoveStop(stop.id)} className="text-red-400 absolute right-0 hover:text-red-600"><HiXMark /></button>
                            </div>
                        ))}
                    </div>
                )}

                <div className="flex items-center gap-3 border-b border-zinc-200 pb-2">
                    <div className="w-5 h-5 rounded-full border-4 border-[#1660C3] flex-shrink-0" />
                    {isLoaded ? (
                        <div className="flex-1">
                            <Autocomplete
                                onLoad={setDropoffAutocomplete}
                                onPlaceChanged={() => {
                                    if (dropoffAutocomplete) {
                                        const place = dropoffAutocomplete.getPlace();
                                        if (place.geometry) {
                                            const addr = buildFriendlyAddress(place);
                                            setDropoffLoc(addr);
                                            lastValidDropoff.current = addr;
                                            setDropoffCoords(place.geometry.location);
                                            calculateRoute();
                                        }
                                    }
                                }}>
                                <input
                                    type="text"
                                    ref={dropoffRef}
                                    id="dropoff-ac"
                                    placeholder="To"
                                    value={dropoffLoc}
                                    onChange={(e) => {
                                        setDropoffLoc(e.target.value);
                                        lastValidDropoff.current = e.target.value;
                                        requestIdRef.current++;
                                        setDropoffCoords(null);
                                        clearRouteFromMap();
                                    }}
                                    className="w-full bg-transparent outline-none text-[#0E0E0E] font-medium dm-sans text-sm"
                                />
                            </Autocomplete>
                        </div>
                    ) : <input type="text" placeholder="To..." className="w-full bg-transparent outline-none text-sm" />}
                </div>

                <button onClick={handleAddStop} className="flex items-center gap-2 text-[#1660C3] text-xs font-bold dm-sans pt-1">
                    <HiPlusCircle className="text-lg" /> Add Stop
                </button>
            </div>

            {/* Compact Route Summary - single row */}
            {distanceKm > 0 && (
                <div className="flex items-center justify-between bg-[#EEF4FF] rounded-xl px-4 py-3 border border-blue-100">
                    <div className="flex items-center gap-1.5 text-zinc-700">
                        <HiMapPin className="text-[#1660C3] text-sm flex-shrink-0" />
                        <span className="font-bold text-sm">{distanceKm.toFixed(1)} km</span>
                    </div>
                    <div className="w-px h-4 bg-zinc-300" />
                    <span className="font-bold text-sm text-zinc-700">{durationMin.toFixed(0)} min</span>
                    <div className="w-px h-4 bg-zinc-300" />
                    <div className="flex items-center gap-1">
                        <span className="font-bold text-sm text-[#1660C3]">
                            {selectedCar
                                ? getCalculatedPriceStr(selectedCar.id)
                                : carOptions[0].price}
                        </span>
                        {!selectedCar && <span className="text-[10px] text-zinc-400">from</span>}
                    </div>
                </div>
            )}

            {/* Inline Car List */}
            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
                {carOptions.map((car) => (
                    <div
                        key={car.id}
                        onClick={() => setSelectedCar(car)}
                        className={`flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all border-2 ${selectedCar?.id === car.id ? 'bg-[#1660C3] border-transparent' : 'bg-white border-zinc-100 hover:border-blue-100 shadow-sm'}`}
                    >
                        <div className="flex items-center gap-3">
                            <img src={car.image} alt={car.name} className="w-16 h-auto object-contain" />
                            <div>
                                <h5 className={`font-bold text-sm ${selectedCar?.id === car.id ? 'text-white' : 'text-zinc-900'}`}>{car.name}</h5>

                            </div>
                        </div>
                        <span className={`font-bold text-sm flex-shrink-0 ${selectedCar?.id === car.id ? 'text-white' : 'text-zinc-900'}`}> <span>C$ {car.baseRate}/km</span></span>
                    </div>
                ))}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
                <button
                    onClick={() => setStep('for_whom')}
                    className="w-full flex items-center justify-between bg-zinc-100/70 p-4 rounded-xl hover:bg-zinc-100 transition-colors"
                >
                    <span className="text-sm font-bold text-zinc-600">For Someone Else</span>
                    <HiChevronRight className="text-zinc-500" />
                </button>

                <button
                    disabled={!selectedCar}
                    onClick={() => {
                        if (!isLoggedIn) {
                            setAuthInitialStep('login');
                            setIsAuthModalOpen(true);
                        }
                        else setSidebarStep('request');
                    }}
                    className={`w-full text-white py-4 rounded-xl font-bold dm-sans uppercase tracking-[1px] shadow-lg transition-all ${selectedCar ? 'bg-gradient-to-r from-[#1660C3] to-[#2671D8] shadow-blue-200/50 hover:opacity-90' : 'bg-zinc-300 shadow-none cursor-not-allowed'}`}
                >
                    {isLoggedIn ? 'Continue' : 'Log in To continue'}
                </button>
            </div>
        </div >
    );

    const renderRequestRide = () => (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-8">
                <button onClick={() => setSidebarStep('selection')} className="p-2 hover:bg-zinc-100 rounded-full">
                    <HiArrowLeft className="text-xl" />
                </button>
                <h2 className="text-xl audiowide-regular uppercase text-[#0E0E0E]">Request Ride</h2>
                <div className="w-8" /> {/* Spacer */}
            </div>

            <h3 className="text-lg audiowide-regular uppercase mb-4 text-zinc-900">Car Selected</h3>

            <div className="bg-[#D9E8FF] p-6 rounded-[2rem] relative mb-8">
                <div className="flex items-center justify-between mb-4">
                    <img src={selectedCar?.image} alt={selectedCar?.name} className="w-32 h-20 object-contain" />
                    <div className="text-right">
                        <div className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 rounded-full bg-[#1660C3]" />
                            <span className="text-[10px] font-bold text-[#1660C3]">SUGGESTED</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="font-bold text-lg text-zinc-900">{selectedCar?.name}</h4>
                        <div className="flex items-center gap-4 text-xs text-zinc-600 mt-1">
                            <span className="flex items-center gap-1"><HiMapPin /> {durationMin ? durationMin.toFixed(0) + ' min' : selectedCar?.time}</span>
                            <span className="uppercase">{selectedCar?.type}</span>
                            <span className="flex items-center gap-1 font-bold">● {selectedCar?.capacity}</span>
                        </div>
                    </div>
                    <span className="text-xl font-bold text-zinc-900">{getCalculatedPriceStr(selectedCar?.id)}</span>
                </div>
            </div>

            <div className="space-y-6">
                <div>
                    <label className="text-sm font-bold text-zinc-600 mb-2 block">Payment Method</label>
                    <div className="relative">
                        <select className="w-full bg-zinc-100/80 border-none rounded-xl p-4 outline-none text-sm font-bold appearance-none cursor-pointer">
                            <option>Choose Payment Method</option>
                            <option>Cash</option>
                            <option>Credit Card</option>
                        </select>
                        <HiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                    </div>
                </div>

                <div>
                    <label className="text-sm font-bold text-zinc-600 mb-2 block">Discount Code (Optional)</label>
                    <input
                        type="text"
                        placeholder="Enter your discount Code"
                        className="w-full bg-zinc-100/80 border-none rounded-xl p-4 outline-none text-sm font-medium"
                    />
                </div>

                <button
                    disabled={bookingLoading || !pickupCoords || !dropoffCoords}
                    onClick={async () => {
                        setBookingLoading(true);
                        try {
                            const data = {
                                pickup_address: pickupRef.current?.value || pickupLoc,
                                dropoff_address: dropoffRef.current?.value || dropoffLoc,
                                pickup_lat: getCoordValue(pickupCoords, 'lat'),
                                pickup_lng: getCoordValue(pickupCoords, 'lng'),
                                dropoff_lat: getCoordValue(dropoffCoords, 'lat'),
                                dropoff_lng: getCoordValue(dropoffCoords, 'lng'),
                                vehicle_type_id: selectedCar?.id,
                                req_veh_type_id: selectedCar?.id,
                                fare: getCalculatedPrice(selectedCar?.id),
                                estimated_distance: distanceKm,
                                estimated_time: Math.round(durationMin * 60),
                                status: 'requested',
                                payment_method: 'cash' // Default
                            };
                            const res = await createBooking(data);
                            setCurrentBooking(res.data || res.booking || res);
                            setSidebarStep('searching');
                        } catch (err) {
                            const errorData = err.response?.data || err;
                            console.error('BOOKING ERROR:', JSON.stringify(errorData, null, 2));
                            const msg = errorData.message || (errorData.errors ? Object.values(errorData.errors)[0][0] : null) || 'Failed to create booking. Please check your connection.';
                            toast.error(msg);
                            if (err.response?.status === 401) {
                                setIsLoggedIn(false);
                                setSidebarStep('details');
                            }
                        } finally {
                            setBookingLoading(false);
                        }
                    }}
                    className="w-full bg-gradient-to-r from-[#1660C3] to-[#2671D8] text-white py-5 rounded-2xl font-bold audiowide-regular uppercase tracking-[2px] shadow-xl shadow-blue-200/50 hover:opacity-95 transition-all mt-8 disabled:opacity-50"
                >
                    {bookingLoading ? 'Requesting...' : 'Request Ride'}
                </button>
            </div>
        </div>
    );

    const renderSearching = () => (
        <div className="flex flex-col items-center justify-center h-full py-20">
            <h2 className="text-2xl audiowide-regular uppercase text-[#0E0E0E] mb-12 text-center">Searching For Car</h2>

            <div className="relative w-48 h-48 mb-12">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border-[12px] border-zinc-100 border-t-[#1660C3]"
                />
                <div className="absolute inset-4 rounded-full bg-zinc-50 flex items-center justify-center overflow-hidden">
                    <motion.img
                        animate={{ x: [-100, 100] }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
                        src={selectedCar?.image}
                        alt="searching"
                        className="w-32 h-auto object-contain grayscale opacity-50"
                    />
                </div>
            </div>

            <button
                disabled={bookingLoading}
                onClick={async () => {
                    const bookingId = currentBooking?.id;
                    if (!bookingId) {
                        setSidebarStep('request');
                        return;
                    }
                    setBookingLoading(true);
                    try {
                        await cancelBooking(bookingId);
                        setCurrentBooking(null);
                        setSidebarStep('request');
                    } catch (err) {
                        console.error('Cancellation failed', err);
                        setSidebarStep('request');
                    } finally {
                        setBookingLoading(false);
                    }
                }}
                className="bg-zinc-100/80 text-[#1660C3] px-12 py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-zinc-200 transition-colors disabled:opacity-50"
            >
                {bookingLoading ? 'Cancelling...' : 'Cancel Ride'}
            </button>
        </div>
    );

    const renderCarArriving = () => {
        console.log('RENDERING ARRIVING - currentBooking:', currentBooking);
        return (
            <div className="flex flex-col h-full bg-[#F4F4F4] -mx-6 md:-mx-8 -my-8 p-6 md:p-8 overflow-y-auto scrollbar-hide">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-zinc-900">Car Arriving</h2>

                </div>

                {/* Driver Info */}
                <div className="bg-white p-4 rounded-2xl flex items-center justify-between mb-4 shadow-sm">
                    <div className="flex items-center gap-4">
                        <img
                            src={currentBooking?.driver?.avatar_url || currentBooking?.driver?.avatar || driverProfile}
                            alt="Driver"
                            className="w-14 h-14 rounded-full object-cover border-2 border-zinc-100 shadow-sm"
                            onError={(e) => { e.target.src = driverProfile; }}
                        />
                        <div>
                            <h4 className="font-bold text-zinc-900">
                                {currentBooking?.driver?.first_name ? `${currentBooking.driver.first_name} ${currentBooking.driver.last_name || ''}` : 'Driver Found!'}
                            </h4>
                            <p className="text-xs text-zinc-400 font-medium">Verified Driver • {currentBooking?.driver?.gender || 'N/A'}</p>
                        </div>
                    </div>
                    <div
                        onClick={() => setSidebarStep('chat')}
                        className="bg-[#1660C3] text-white p-3 rounded-xl cursor-pointer hover:opacity-90 shadow-lg shadow-blue-100"
                    >
                        <FaCommentDots className="text-lg" />
                    </div>
                </div>

                {/* Destination Card */}
                <div className="bg-white p-6 rounded-2xl mb-4 shadow-sm">
                    <h5 className="font-bold text-zinc-900 mb-4">Destination</h5>
                    <div className="relative pl-8 space-y-8">
                        {/* Road Line */}
                        <div className="absolute left-[7px] top-2 bottom-2 w-0.5 border-l-2 border-dashed border-zinc-200" />

                        <div className="relative">
                            <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-black border-4 border-white shadow-sm" />
                            <h6 className="text-[14px] font-bold text-zinc-900">Pickup</h6>
                            <p className="text-[12px] text-zinc-400 font-medium line-clamp-1">{currentBooking?.pickup_address || pickupLoc}</p>
                        </div>

                        <div className="relative">
                            <div className="absolute -left-[35px] top-1 flex items-center justify-center">
                                <HiMapPin className="text-2xl text-[#1660C3]" />
                            </div>
                            <h6 className="text-[14px] font-bold text-zinc-900">Dropoff</h6>
                            <p className="text-[12px] text-zinc-400 font-medium line-clamp-1">{currentBooking?.dropoff_address || dropoffLoc}</p>
                        </div>
                    </div>
                </div>

                {/* Ride Details Card */}
                <div className="bg-white p-6 rounded-2xl mb-4 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h5 className="font-bold text-zinc-900">Ride Details</h5>
                        <span className="text-[10px] text-zinc-400 font-bold uppercase">Booking ID: {currentBooking?.id || currentBooking?.booking_id}</span>
                    </div>

                    <div className="flex items-center gap-5 p-4 bg-zinc-50 rounded-2xl border border-zinc-100 mb-6">
                        <div className="bg-white p-2 rounded-xl shadow-sm border border-zinc-50">
                            <img
                                src={
                                    currentBooking?.req_veh_type_id
                                        ? `https://api.itimium.com.pk/storage/${backendVehicleTypes.find(t => t.id === currentBooking.req_veh_type_id)?.image_path}`
                                        : selectedCar?.image
                                }
                                alt="Vehicle"
                                className="w-20 h-auto object-contain"
                                onError={(e) => { e.target.src = selectedCar?.image; }}
                            />
                        </div>
                        <div>
                            <h6 className="text-sm font-black text-zinc-800 uppercase tracking-tight">
                                {currentBooking?.vehicle?.model || selectedCar?.name}
                            </h6>
                            <div className="flex items-center gap-2">
                                <p className="text-[10px] text-[#1660C3] font-black uppercase tracking-widest">
                                    {backendVehicleTypes.find(t => t.id === currentBooking?.req_veh_type_id)?.category || selectedCar?.type}
                                </p>

                            </div>
                        </div>
                    </div>

                    <div className="bg-zinc-50/50 p-4 rounded-2xl border border-zinc-100 mb-6">
                        <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                            <div>
                                <span className="text-[10px] text-zinc-400 font-black uppercase tracking-wider block mb-1">Capacity</span>
                                <span className="text-sm font-bold text-zinc-800">
                                    {backendVehicleTypes.find(t => t.id === currentBooking?.req_veh_type_id)?.capacity || selectedCar?.capacity} Seats
                                </span>
                            </div>
                            <div>
                                <span className="text-[10px] text-zinc-400 font-black uppercase tracking-wider block mb-1">License Plate</span>
                                <span className="text-sm font-black text-[#1660C3] tracking-widest uppercase">{currentBooking?.vehicle?.license_plate || 'ASSIGNING'}</span>
                            </div>
                            <div>
                                <span className="text-[10px] text-zinc-400 font-black uppercase tracking-wider block mb-1">Color</span>
                                <span className="text-sm font-bold text-zinc-800">{currentBooking?.vehicle?.color || 'N/A'}</span>
                            </div>
                            <div>
                                <span className="text-[10px] text-zinc-400 font-black uppercase tracking-wider block mb-1">Manufacturing Year</span>
                                <span className="text-sm font-bold text-zinc-800">{currentBooking?.vehicle?.year || 'N/A'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {[
                            { label: 'Total Distance', value: `${currentBooking?.estimated_distance || distanceKm} km` },
                            { label: 'Ride Time', value: `${formatEstimatedTime(currentBooking?.estimated_time) || Math.round(durationMin)} mins` },
                            { label: 'Total Fare', value: `C$${currentBooking?.fare || getCalculatedPrice(selectedCar?.id)}` },
                            { label: 'Discount', value: 'C$0' },
                            { label: 'Payment Method', value: currentBooking?.payment_method || 'Cash' }
                        ].map((item, i) => (
                            <div key={i} className="flex justify-between items-center pb-2 border-b border-zinc-50 last:border-0 last:pb-0">
                                <span className="text-xs font-bold text-zinc-400">{item.label}</span>
                                <span className="text-xs font-bold text-zinc-800">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <button className="flex items-center justify-center gap-4 bg-zinc-100 p-5 rounded-2xl font-bold mb-4 hover:bg-zinc-200 transition-colors">
                    <div className="bg-[#1660C3] p-2 rounded-lg text-white">
                        <FaShareAlt className="text-sm" />
                    </div>
                    <span className="text-sm text-zinc-800">Share Ride Details</span>
                </button>

                <button
                    disabled={bookingLoading}
                    onClick={async () => {
                        const bookingId = currentBooking?.id;
                        if (!bookingId) {
                            setSidebarStep('details');
                            return;
                        }
                        setBookingLoading(true);
                        try {
                            await cancelBooking(bookingId);
                            setCurrentBooking(null);
                            setSidebarStep('details');
                            toast.success('Booking cancelled successfully.');
                        } catch (err) {
                            console.error('Cancellation failed', err);
                            toast.error('Failed to cancel booking.');
                        } finally {
                            setBookingLoading(false);
                        }
                    }}
                    className="w-full bg-[#D9E8FF] text-[#1660C3] py-5 rounded-3xl font-bold uppercase tracking-widest text-sm hover:bg-[#C9E1FF] transition-colors disabled:opacity-50"
                >
                    {bookingLoading ? 'Cancelling...' : 'Cancel Ride'}
                </button>
            </div>
        );
    };

    const renderChat = () => (
        <div className="flex flex-col h-full -mx-4">
            {/* Chat Header */}
            <div className="flex items-center gap-4 pb-6 border-b border-zinc-100 mb-6">
                <button onClick={() => setSidebarStep('arriving')} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
                    <FaChevronLeft className="text-lg text-blue-600" />
                </button>
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-100">
                        <img src={driverProfile} alt="Driver" className="w-full h-full object-cover" />
                    </div>
                    <h3 className="text-xl font-bold text-zinc-900">Sergio Fernandez</h3>
                </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-grow space-y-6 overflow-y-auto pr-2 scrollbar-hide py-2">
                <div className="flex justify-end">
                    <div className="bg-[#A5C0E5] text-white p-4 px-6 rounded-tl-[25px] rounded-tr-[25px] rounded-bl-[25px] max-w-[85%] shadow-sm">
                        <p className="text-sm font-medium">Hi There excited for the ride</p>
                    </div>
                </div>

                <div className="flex justify-start">
                    <div className="bg-[#D1DCEE] text-zinc-900 p-4 px-6 rounded-tr-[25px] rounded-tl-[25px] rounded-br-[25px] max-w-[85%] shadow-sm">
                        <p className="text-sm font-medium">Is your location is correct are you there</p>
                    </div>
                </div>

                <div className="flex justify-end">
                    <div className="bg-[#A5C0E5] text-white p-4 px-6 rounded-tl-[25px] rounded-tr-[25px] rounded-bl-[25px] max-w-[85%] shadow-sm">
                        <p className="text-sm font-medium">Yes it is correct and i am there</p>
                    </div>
                </div>
            </div>

            {/* Chat Input */}
            <div className="pt-6 mt-auto">
                <div className="relative flex items-center gap-2">
                    <div className="flex-grow relative">
                        <FaSmile className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-600 text-xl cursor-pointer" />
                        <input
                            type="text"
                            placeholder="Type your message"
                            className="w-full pl-14 pr-14 py-4 bg-[#D1DCEE]/60 rounded-2xl border-none focus:ring-2 focus:ring-blue-400 transition-all outline-none text-blue-900 placeholder:text-blue-500 font-medium text-sm"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white cursor-pointer hover:bg-blue-700 transition-colors">
                            < HiPhone className="text-sm" />
                        </div>
                    </div>
                    <button className="w-10 h-10 flex items-center justify-center text-blue-600 hover:scale-110 transition-transform">
                        <FaPaperPlane className="text-xl" />
                    </button>
                </div>
            </div>
        </div>
    );

    const renderForWhomModal = () => (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <div className="bg-white rounded-[2rem] p-10 w-full max-w-md relative animate-in fade-in zoom-in duration-300">
                <button onClick={() => setStep('booking')} className="absolute top-8 right-8 text-zinc-400 hover:text-black transition-colors">
                    <HiXMark className="text-2xl" />
                </button>

                <h2 className="text-md audiowide-regular uppercase text-[#0E0E0E] mb-10 pr-8">
                    Choose Rider
                </h2>

                <div className="space-y-4">
                    <button
                        onClick={() => {
                            setStep('booking');
                            setSidebarStep('request');
                        }}
                        className="w-full flex items-center gap-4 p-4 rounded-2xl bg-[#D9E8FF] border-2 border-[#1660C3] transition-all group"
                    >
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#1660C3]">
                            <FaSmile className="text-xl" />
                        </div>
                        <div className="text-left">
                            <span className="block font-bold text-zinc-900">For Me</span>
                            <span className="text-xs text-zinc-500">I am the primary rider</span>
                        </div>
                    </button>

                    <button
                        onClick={() => {
                            setAuthInitialStep('phone');
                            setIsAuthModalOpen(true);
                            setStep('booking');
                        }}
                        className="w-full flex items-center gap-4 p-4 rounded-2xl bg-zinc-50 border-2 border-zinc-100 hover:border-blue-100 transition-all group"
                    >
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-zinc-400 group-hover:text-blue-400">
                            <HiPlusCircle className="text-xl" />
                        </div>
                        <div className="text-left">
                            <span className="block font-bold text-zinc-900">For Someone Else</span>
                            <span className="text-xs text-zinc-500">Book for a friend or family</span>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="relative h-[calc(100vh-72px)] lg:h-[calc(100vh-84px)] w-full bg-zinc-100 overflow-hidden mt-[72px] lg:mt-[84px]">
            <style dangerouslySetInnerHTML={{
                __html: `
                .pac-container {
                    width: 380px !important;
                    max-width: 90vw !important;
                    box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.15), 0 8px 16px -6px rgba(0, 0, 0, 0.08);
                    border-radius: 0.875rem;
                    border: 1px solid #e4e4e7;
                    font-family: 'DM Sans', sans-serif;
                    margin-top: 6px;
                    overflow: hidden;
                    z-index: 9999 !important;
                }
                .pac-item {
                    padding: 10px 14px;
                    font-size: 13px;
                    cursor: pointer;
                    border-top: 1px solid #f4f4f5;
                }
                .pac-item:first-child { border-top: none; }
                .pac-item:hover { background-color: #eff6ff; }
                .pac-item-query { font-weight: 600; color: #0E0E0E; }
                .pac-matched { color: #1660C3; }
                .pac-icon { display: none; }
            `}} />
            {/* Real Map (Google Maps Embed) */}
            <div className="absolute inset-0 z-0 bg-zinc-900">
                {isLoaded ? (
                    <GoogleMap
                        mapContainerStyle={{ width: '100%', height: '100%' }}
                        center={center}
                        zoom={16}
                        options={{ disableDefaultUI: true, styles: darkGlowStyle }}
                        onLoad={m => setMap(m)}
                    >
                        {/* Independent Pickup Marker */}
                        {pickupCoords && (
                            <Marker
                                position={pickupCoords}
                                zIndex={1000}
                                icon={{ path: window.google.maps.SymbolPath.CIRCLE, fillColor: '#3b82f6', fillOpacity: 1, strokeColor: '#ffffff', strokeWeight: 3, scale: 8 }}
                            />
                        )}

                        {/* Independent Dropoff Marker */}
                        {dropoffCoords && (
                            <Marker
                                position={dropoffCoords}
                                zIndex={1000}
                                icon={{ path: window.google.maps.SymbolPath.CIRCLE, fillColor: '#ef4444', fillOpacity: 1, strokeColor: '#ffffff', strokeWeight: 3, scale: 8 }}
                            />
                        )}

                        {/* NEW: Explicitly check for both response and path to avoid ghosting */}
                        {(directionsResponse && routePath && routePath.length > 0) ? (
                            <React.Fragment key={`route-${requestIdRef.current}`}>
                                {/* Polylines are drawn imperatively; only render stop markers here */}
                                {(() => {
                                    const route = directionsResponse.routes[0];
                                    const legs = route.legs;
                                    let stopMarkers = [];
                                    for (let i = 0; i < legs.length - 1; i++) {
                                        stopMarkers.push(
                                            <Marker key={`stop-${i}-${requestIdRef.current}`} position={legs[i].end_location} zIndex={998}
                                                icon={{ path: window.google.maps.SymbolPath.CIRCLE, fillColor: '#9ca3af', fillOpacity: 1, strokeColor: '#ffffff', strokeWeight: 2, scale: 4 }} />
                                        );
                                    }
                                    return stopMarkers;
                                })()}
                            </React.Fragment>
                        ) : null}
                    </GoogleMap>
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-white">Loading Map...</div>
                )}
                <div className="absolute inset-0 bg-[#1660C3]/5 pointer-events-none" />
            </div>

            {/* Sidebar */}
            <div className={`absolute top-0 left-0 h-full w-[320px] sm:w-[380px] lg:w-[450px] bg-white shadow-2xl px-6 md:px-8 pt-8 pb-0 z-40 overflow-y-auto scrollbar-hide flex flex-col transition-transform duration-500 ease-in-out ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <button
                    onClick={() => setIsDrawerOpen(false)}
                    className="absolute top-4 right-4 p-2 hover:bg-zinc-100 rounded-full transition-colors z-30"
                >
                    <HiXMark className="text-xl text-zinc-600" />
                </button>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={sidebarStep}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                        className="h-full"
                    >
                        {sidebarStep === 'details' && renderRideDetails()}
                        {(sidebarStep === 'selection' || sidebarStep === 'details') && null}
                        {sidebarStep === 'request' && renderRequestRide()}
                        {sidebarStep === 'searching' && renderSearching()}
                        {sidebarStep === 'arriving' && renderCarArriving()}
                        {sidebarStep === 'chat' && renderChat()}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Open Drawer Button */}
            {!isDrawerOpen && (
                <button
                    onClick={() => setIsDrawerOpen(true)}
                    className="absolute top-1/2 -translate-y-1/2 left-0 bg-white shadow-[10px_0_20px_rgba(0,0,0,0.1)] p-4 rounded-r-2xl z-10 hover:bg-zinc-50 transition-colors border border-l-0 border-zinc-200"
                >
                    <HiChevronRight className="text-2xl text-[#1660C3]" />
                </button>
            )}

            {step === 'for_whom' && renderForWhomModal()}
            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
                initialStep={authInitialStep}
                onAuthSuccess={() => {
                    setIsLoggedIn(true);
                    setIsAuthModalOpen(false);
                    setSidebarStep('request');
                }}
            />

            {/* Map Interactive HUD */}
            <div className="absolute top-10 right-10 flex flex-col gap-4 z-10">
                <button className="w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-xl text-zinc-600 hover:text-[#1660C3] transition-colors">
                    <HiMapPin />
                </button>
            </div>
            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 5px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #dfe7ef;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #cbd5e1;
                }
                /* modal-scroll: scrollbar only on mobile, hidden on desktop */
                .modal-scroll::-webkit-scrollbar {
                    width: 5px;
                }
                .modal-scroll::-webkit-scrollbar-track {
                    background: transparent;
                }
                .modal-scroll::-webkit-scrollbar-thumb {
                    background: #dfe7ef;
                    border-radius: 10px;
                }
                .modal-scroll::-webkit-scrollbar-thumb:hover {
                    background: #cbd5e1;
                }
                @media (min-width: 640px) {
                    .modal-scroll::-webkit-scrollbar {
                        width: 0;
                        display: none;
                    }
                }
            `}</style>
        </div>
    );
};

export default BookingPage;

