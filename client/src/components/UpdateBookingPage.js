import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';

export default function UpdateBookingPage() {
    const { bookingId } = useParams();
    const navigate = useNavigate();
    const [booking, setBooking] = useState(null);
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [phone, setPhone] = useState('');

    useEffect(() => {
        axios.get(`/api/bookings/${bookingId}`).then(response => {
            setBooking(response.data);
            setNumberOfGuests(response.data.numberOfGuests);
            setPhone(response.data.phone);
        }).catch(err => {
            console.error("Error fetching booking:", err);
        });
    }, [bookingId]);

    const handleUpdate = () => {
        axios.put(`/api/bookings/${bookingId}`, { numberOfGuests, phone })
            .then(() => {
                navigate('/account/bookings');
            })
            .catch(err => {
                console.error("Error updating booking:", err);
            });
    };

    if (!booking) return <div>Loading...</div>;

    return (
        <div className="p-4">
            <h2 className="text-2xl mb-4">Update Booking</h2>
            <div className="mb-4">
                <label className="block mb-2">Place Title</label>
                <input 
                    type="text" 
                    value={booking.place.title} 
                    readOnly 
                    className="border p-2 w-full" 
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Check-In</label>
                <input 
                    type="text" 
                    value={booking.checkIn} 
                    readOnly 
                    className="border p-2 w-full" 
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Check-Out</label>
                <input 
                    type="text" 
                    value={booking.checkOut} 
                    readOnly 
                    className="border p-2 w-full" 
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Number of Guests</label>
                <input 
                    type="number" 
                    value={numberOfGuests} 
                    onChange={(e) => setNumberOfGuests(e.target.value)} 
                    className="border p-2 w-full" 
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Phone</label>
                <input 
                    type="text" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    className="border p-2 w-full" 
                />
            </div>
            <button 
                onClick={handleUpdate} 
                className="bg-blue-500 text-white px-4 py-2 rounded">
                Update
            </button>
        </div>
    );
}
