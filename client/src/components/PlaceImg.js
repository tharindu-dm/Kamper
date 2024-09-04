/**
 * @component PlaceImg
 * @description This component is a helper component that displays the first image of a campsite. The image is displayed as a background image with the URL of the image from the server.
 */

export default function PlaceImg({ place, index=0, className }) {
    if (!place.photos?.length) {
        return '';
    }
    if (!className) {
        className = 'w-full h-full object-cover rounded-xl';
    }
    return (
        <img className={className} src={'http://localhost:4000/uploads/'+place.photos[index]} alt="" />
    );
}
