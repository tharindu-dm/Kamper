export default function SearchCriteria({ selected = [], onChange }){
  function handleCbClick(ev) {
    const { name, checked } = ev.target;
    if (checked) {
      onChange([...selected, name]);
    } else {
      onChange(...selected.filter((selectedName) => selectedName !== name));
    }
  }  

    return(
        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
            <input type="checkbox" checked={ selected.includes('sleepingEssential') } name="sleepingEssential" onChange={handleCbClick}/>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 576 512"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6">
                <path d="M274.4 4.2c8.2-5.7 19-5.7 27.3 0L521.5 155.9c13.5 9.3 22.2 24 23.9 40.2l26.7 254c3.5 33.1-22.4 61.9-55.7 61.9L440 512l-176 0L59.5 512C26.3 512 .4 483.2 3.9 450.1l26.7-254c1.7-16.3 10.4-31 23.9-40.2L274.4 4.2zM516.5 464c4.7 0 8.5-4.1 8-8.8l-26.7-254c-.2-2.3-1.5-4.4-3.4-5.7L312 69.7l0 209.6L413.6 464l102.9 0zM264 69.7L81.7 195.4c-1.9 1.3-3.2 3.4-3.4 5.7l-26.7 254c-.5 4.7 3.2 8.8 8 8.8L264 464l0-136 0-136 0-122.3z"/>
            </svg>
            <span>Sleeping Essentials</span>
          </label>

          <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input type="checkbox" checked={ selected.includes('clothingEssential') } name="clothingEssential" onChange={handleCbClick} />
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 640 512"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6">
            <path d="M211.8 0c7.8 0 14.3 5.7 16.7 13.2C240.8 51.9 277.1 80 320 80s79.2-28.1 91.5-66.8C413.9 5.7 420.4 0 428.2 0l12.6 0c22.5 0 44.2 7.9 61.5 22.3L628.5 127.4c6.6 5.5 10.7 13.5 11.4 22.1s-2.1 17.1-7.8 23.6l-56 64c-11.4 13.1-31.2 14.6-44.6 3.5L480 197.7 480 448c0 35.3-28.7 64-64 64l-192 0c-35.3 0-64-28.7-64-64l0-250.3-51.5 42.9c-13.3 11.1-33.1 9.6-44.6-3.5l-56-64c-5.7-6.5-8.5-15-7.8-23.6s4.8-16.6 11.4-22.1L137.7 22.3C155 7.9 176.7 0 199.2 0l12.6 0z"/>
          </svg>
            <span>Clothing Essentials</span>
          </label>

          <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input type="checkbox" checked={ selected.includes('survivalEssential') } name="survivalEssential" onChange={handleCbClick} />
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 512 512"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6">
              <path d="M78.6 5C69.1-2.4 55.6-1.5 47 7L7 47c-8.5 8.5-9.4 22-2.1 31.6l80 104c4.5 5.9 11.6 9.4 19 9.4l54.1 0 109 109c-14.7 29-10 65.4 14.3 89.6l112 112c12.5 12.5 32.8 12.5 45.3 0l64-64c12.5-12.5 12.5-32.8 0-45.3l-112-112c-24.2-24.2-60.6-29-89.6-14.3l-109-109 0-54.1c0-7.5-3.5-14.5-9.4-19L78.6 5zM19.9 396.1C7.2 408.8 0 426.1 0 444.1C0 481.6 30.4 512 67.9 512c18 0 35.3-7.2 48-19.9L233.7 374.3c-7.8-20.9-9-43.6-3.6-65.1l-61.7-61.7L19.9 396.1zM512 144c0-10.5-1.1-20.7-3.2-30.5c-2.4-11.2-16.1-14.1-24.2-6l-63.9 63.9c-3 3-7.1 4.7-11.3 4.7L352 176c-8.8 0-16-7.2-16-16l0-57.4c0-4.2 1.7-8.3 4.7-11.3l63.9-63.9c8.1-8.1 5.2-21.8-6-24.2C388.7 1.1 378.5 0 368 0C288.5 0 224 64.5 224 144l0 .8 85.3 85.3c36-9.1 75.8 .5 104 28.7L429 274.5c49-23 83-72.8 83-130.5zM56 432a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z"/>
          </svg>
            <span>Survival Essentials</span>
          </label>

          <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input type="checkbox" checked={ selected.includes('cookingEssential') } name="cookingEssential" onChange={handleCbClick} />
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 448 512"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6">
              <path d="M416 0C400 0 288 32 288 176l0 112c0 35.3 28.7 64 64 64l32 0 0 128c0 17.7 14.3 32 32 32s32-14.3 32-32l0-128 0-112 0-208c0-17.7-14.3-32-32-32zM64 16C64 7.8 57.9 1 49.7 .1S34.2 4.6 32.4 12.5L2.1 148.8C.7 155.1 0 161.5 0 167.9c0 45.9 35.1 83.6 80 87.7L80 480c0 17.7 14.3 32 32 32s32-14.3 32-32l0-224.4c44.9-4.1 80-41.8 80-87.7c0-6.4-.7-12.8-2.1-19.1L191.6 12.5c-1.8-8-9.3-13.3-17.4-12.4S160 7.8 160 16l0 134.2c0 5.4-4.4 9.8-9.8 9.8c-5.1 0-9.3-3.9-9.8-9L127.9 14.6C127.2 6.3 120.3 0 112 0s-15.2 6.3-15.9 14.6L83.7 151c-.5 5.1-4.7 9-9.8 9c-5.4 0-9.8-4.4-9.8-9.8L64 16zm48.3 152l-.3 0-.3 0 .3-.7 .3 .7z"/>
          </svg>
            <span>Cooking Essentials</span>
          </label>
        </div>
    )
}