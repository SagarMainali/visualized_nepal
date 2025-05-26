import { Dropdown, DropdownItem } from "flowbite-react";

export default function CustomDropDown({ label, className, items, onClickHandler, filteredValue }: CustomDropdownPropsT) {
  return (
    <Dropdown label={label} arrowIcon={false} className={`filter-dropdown ${className}`}>
      {
        items.map((item, i) => ( //  item could be just a plain string or an object with 'name' & 'value' properties
          <DropdownItem key={i} onClick={() => onClickHandler(item.value ?? item)} className={`${filteredValue === (item.value ?? item) ? 'bg-gray-500' : ''}`}>
            {item.name ?? item}
          </DropdownItem>
        ))
      }
    </Dropdown >
  )
}
