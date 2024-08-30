import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';

export default function UpdateRentingPage() {
    const { rentingId } = useParams();
    const navigate = useNavigate();
    const [renting, setRenting] = useState(null);
    const [phone, setPhone] = useState('');
    

    useEffect(() => {
        axios.get(`/api/rentings/${rentingId}`).then(response => {
            setRenting(response.data);
            setPhone(response.data.phone);
        }).catch(err => {
            console.error("Error fetching booking:", err);
        });
    }, [rentingId]);

    const handleUpdate = () => {
        axios.put(`/api/rentings/${rentingId}`, { phone })
            .then(() => {
                navigate('/account/rents');
            })
            .catch(err => {
                console.error("Error updating renting:", err);
            });
    };

    if (!renting) return <div>Loading...</div>;

    return (
        <div className="p-4">
            <h2 className="text-2xl mb-4">Update Renting</h2>
            <div className="mb-4">
                <label className="block mb-2">Gear Type</label>
                <input 
                    type="text" 
                    value={renting.gear.type} 
                    readOnly 
                    className="border p-2 w-full" 
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Check-In</label>
                <input 
                    type="text" 
                    value={renting.checkIn} 
                    readOnly 
                    className="border p-2 w-full" 
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Check-Out</label>
                <input 
                    type="text" 
                    value={renting.checkOut} 
                    readOnly 
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