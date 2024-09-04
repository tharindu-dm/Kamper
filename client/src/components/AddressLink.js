/*
* AddressLink component is used to display the address of the campsite in the form of a link.
* the link is clickable and will open the address in google maps.
* result is not an exact location, but it will help to narrow down the search area.
* better the address input by the user, better the result.
*/

export default function AddressLink({children, className='null '}) {
    if (!className) {
        className = 'my-3 block'
    }
    className += 'flex gap-1 font-semibold underline'
    return (
        <a
        className={className}
        target="_blank"
        rel="noreferrer"
        href={"http://maps.google.com/?q=" + children}
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
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
          />
        </svg>

        {children}
      </a>
    );
}