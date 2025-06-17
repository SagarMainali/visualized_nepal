import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";

export default function SearchableDropDown({ label, items, onClickHandler, selectedValue }: CustomDropdownPropsT) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="bg-gray-600 text-white px-4 py-2 rounded-lg text-sm w-48 flex gap-2 justify-center items-center cursor-pointer">
        <span>
          {label}
        </span>
        <FontAwesomeIcon icon={faCaretDown} />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-gray-600 text-white max-h-[75vh] overflow-y-auto">
          <div className="px-3 py-2">
            <input type="text" placeholder="Search..." className="w-full p-1 rounded text-sm border outline-none" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} autoFocus />
          </div>
          {filteredItems.length > 0 ? (
            filteredItems.map((item, i) => (
              <div
                key={i}
                onClick={() => {
                  onClickHandler(item);
                  setIsOpen(false);
                }}
                className={`px-3 py-2 cursor-pointer text-sm hover:bg-gray-700 ${selectedValue === item ? "bg-gray-800" : ""}`}>
                {item}
              </div>
            ))
          ) : (
            <div className="px-3 py-2 text-sm text-gray-200">No results found</div>
          )}
        </div>
      )}
    </div>
  );
}
