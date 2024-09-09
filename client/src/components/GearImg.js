export default function GearImg({ gear, index=0, className }) {
    if (!gear.photos?.length) { //Checks if the gear object has a photos array and if it's length is greater than 0
        return '';
    }
    if (!className) {
        className = 'object-cover rounded-xl';
    }
    return (
        <img className={className} src={'http://localhost:4000/uploads/'+gear.photos[index]} alt="" />
    );
}
