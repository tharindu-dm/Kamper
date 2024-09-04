/**
 * @component Perks
 * @description This component is a checkbox list of perks that can be added to a campsite. The perks are wifi, parking, firewood, pets, and separate washrooms. This page use Material Icons for the icons of each perk.
 */

import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import WcOutlinedIcon from '@mui/icons-material/WcOutlined';
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';

export default function Perks({ selected = [], onChange }) {
  function handleCbClick(ev) {
    const { name, checked } = ev.target;
    if (checked) {
      onChange([...selected, name]);
    } else {
      onChange(...selected.filter((selectedName) => selectedName !== name));
    }
  }

  return (
    <div className="mt-2 grid gap-2 gird-cols-2 md:grid-col-3 lg:grid-col-6">
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" checked={ selected.includes('wifi') } name="wifi" onChange={handleCbClick} />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z"
          />
        </svg>
        {/*wifi perk is added for maybe some places offer a lodging with a small public wifi access*/}
        <span>Wifi</span>
      </label>
      
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" checked={ selected.includes('parking') } name="parking" onChange={handleCbClick} />
        <DirectionsCarFilledOutlinedIcon/>
        <span>Free Parking</span>
      </label>

      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" checked={ selected.includes('firewood') } name="firewood" onChange={handleCbClick} />
        <LocalFireDepartmentOutlinedIcon/>
        <span>Firewood for sale</span>
      </label>

      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" checked={ selected.includes('pets') } name="pets" onChange={handleCbClick} />
        <PetsOutlinedIcon/>
        <span>Pets</span>
      </label>

      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" name="entrance" onChange={handleCbClick} />
        <WcOutlinedIcon/>
        <span>Seperate Washrooms</span>
      </label>
    </div>
  );
}
