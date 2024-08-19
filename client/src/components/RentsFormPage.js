import AccountNavi from "./AccountNav";

function RentsFormPage() {
  return (
    <div>
      <AccountNavi />
        <form>
            <h2 className="text-2xl mt-4">Type</h2>
            <p className="text-sm text-gray-500">Type of your equipment</p>
            <input type="text" className="w-full p-2 border border-gray-300 rounded mt-2" placeholder="Type, for example: Camping Tent"/>
            <h2 className="text-2xl mt-4">Photos</h2>
            <p className="text-sm text-gray-500">Pictures of your camping gear</p>
            
        </form>
    </div>
  );
}

export default RentsFormPage;