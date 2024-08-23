export default function GearImg({ gear, index=0, className }) {
    if (!gear.photos?.length) {
        return '';
    }
    if (!className) {
        className = 'object-cover rounded-xl';
    }
    return (
        <img className={className} src={'http://localhost:4000/uploads/'+gear.photos[index]} alt="" />
    );
}
