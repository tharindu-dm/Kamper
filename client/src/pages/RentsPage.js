import { Link, useParams } from "react-router-dom";
import AccountNav from "../components/AccountNav";

function RentsPage() {
    

    return (
        <div>
            <AccountNav />
            <div className="text-center mt-5">
                List of all equipments <br />
                <Link
                    className="bg-primary inline-flex gap-1 text-white py-2 px-6 rounded-full"
                    to={"/account/rents/new"}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                    >
                        <path
                            fillRule="evenodd"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                        />
                    </svg>
                    Add new equipment
                </Link>
            </div>
        </div>
    );
};

export default RentsPage;