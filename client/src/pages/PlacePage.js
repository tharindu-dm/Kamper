import {useEffect, useState} from "react";

import BookingWidget from "../BookingWidget";
import CloseIcon from '@mui/icons-material/Close';
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import axios from "axios";
import {useParams} from "react-router-dom";

export default function PlacePage() {
    const {id} = useParams();
    const [place, setPlace] = useState(null);
    const[showAllPhotos, setShowAllPhotos] = useState(false);
    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get(`/api/places/${id}`).then((response) => {
            setPlace(response.data);
        });
    }, [id]);  
    
    if (!place) {
        return '';
    }

    if (showAllPhotos){
        return (
            <div className="absolute inset-0 bg-black text-white min-h-screen">
                <div className="bg-black p-8 grid gap-4">
                    <div>
                        <h2 className="text-3xl mr-48">Photos of {place.title}</h2>
                        <button onClick={() => setShowAllPhotos(false)} className="fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl shadow-black bg-white text-black">
                            <CloseIcon></CloseIcon>
                            Close photos
                        </button>
                    </div>
                    { place?.photos?.length > 0 && place.photos.map((photo) => (
                        <div>
                            <img src={"https://localhost:4000/uploads/"+photo} />
                        </div>
                    ))}
                </div>   
            </div>
        )
    }
    
    return (
        <div className = "mt-4 bg-gray-100 -mx-8 px-8 pt-8">
            <h1 className="text-3xl">{place.title}</h1>
            <a className=" flex gap-1 my-3 block font-semibold underline" target="_blank" href={'https://maps.google.com/?q='+place.address}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>

                {place.address}</a>
            <div className="relative">
                <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
                    <div>
                        {place.photos?.[0] && (
                            <div>
                                <img onClick={() => setShowAllPhotos(true)} className="aspect-square cursor-pointer object-cover" src={"https://localhost:4000/uploads/"+place.photos[0]} />
                            </div>
                        )}
                    </div>
                        
                    <div className="grid">
                        {place.photos?.[1] && (
                            <img onClick={() => setShowAllPhotos(true)} className="aspect-square cursor-pointer object-cover" src={"https://localhost:4000/uploads/"+place.photos[1]} />
                        )}
                        <div className="overflow-hidden"> {/* adjust the 2nd image bottom align with main image(01) */}
                            {place.photos?.[2] && (
                            <img onClick={() => setShowAllPhotos(true)} className="aspect-square cursor-pointer object-cover relative top-2" src={"https://localhost:4000/uploads/"+place.photos[2]} />
                            )}
                        </div>
                    </div>
                </div> 
                <button onClick={() => setShowAllPhotos(true)} className="flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow shadow-md shadow-gray-500"> 
                    <CropOriginalIcon></CropOriginalIcon>
                    Show more photos
                </button>   
            </div>
            
            <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
                <div>
                    <div className="my-4">
                        <h2 className="font-semibold text-2xl">Description</h2>
                        {place.description}
                    </div>
                    Check-in: {place.checkIn} <br />
                    Check-out: {place.checkOut} <br />
                    Max number of guests: {place.maxGuests} 
                </div>
                <div>
                    <BookingWidget place={place}/>
                </div>
            </div>  
            <div className="bg-white -mx-8 px-8 py-8 border-t">
                <div>
                    <h2 className="font-semibold text-2xl">Extra info</h2>
                </div>
                <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">
                    {place.extraInfo}
                </div>  
            </div>
            
        </div>
    );
}