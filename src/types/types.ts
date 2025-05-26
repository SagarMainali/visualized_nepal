type GoldRateDataT = {
    nepaliDate: string,
    englishDate: string,
    price: number,
}

type CustomTooltipT = {
    active?: boolean,
    payload?: any[],
    label?: string,
    dateType?: 'AD' | 'BS',
}

type CustomActiveDropT = {
    cx?: number,
    cy?: number,
    value?: number
}

type GoldPageFiltersT = {
    dateType: 'AD' | 'BS',
    time: number | 'max'
}

type CustomDropdownPropsT = {
    label: string,
    className?: string,
    items: any[],
    onClickHandler: (selected: any) => void,
    filteredValue: any
}

type InflationRateDataT = {
    year: string,
    value: number,
}

type InflationRateData_ResponseT = {
    lastUpdated: string,
    inflationRateData: InflationRateDataT[]
}

type TourismDataT = {
    year: number,
    total: number,
    annualGrowthRate: number,
    byAir: {
        number: number,
        percent: number
    },
    byLand: {
        number: number,
        percent: number
    }
}