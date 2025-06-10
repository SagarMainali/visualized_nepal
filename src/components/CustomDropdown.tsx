import { Dropdown, DropdownItem } from "flowbite-react";

export default function CustomDropDown({ label, arrowIcon = false, items, onClickHandler, selectedValue }: CustomDropdownPropsT) {
  return (
    <Dropdown label={label} arrowIcon={arrowIcon} className='filter-dropdown max-h-[70vh] overflow-y-auto'>
      {
        items.map((item, i) => ( //  item could be just a plain string or an object with 'name' & 'value' properties
          <DropdownItem key={i} onClick={() => onClickHandler(item.value ?? item)} className={`${selectedValue === (item.value ?? item) ? 'bg-gray-500' : ''}`}>
            {item.name ?? item}
          </DropdownItem>
        ))
      }
    </Dropdown >
  )
}
