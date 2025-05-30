type GoldRateDataT = {
    nepaliDate: string,
    englishDate: string,
    price: number,
}

type CustomTooltipT = {
    active?: boolean,
    payload?: any[],
    dateType?: 'AD' | 'BS',
    selectedValue?: string
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
    arrowIcon?: boolean,
    items: any[],
    onClickHandler: React.Dispatch<React.SetStateAction<any>>,
    selectedValue: any
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

type PatientsDataAllT = {
    Patient_ID: number,
    Age: number,
    Gender: string,
    Condition: string,
    Procedure: string,
    Cost: string,
    Length_of_Stay: number,
    Readmission: string,
    Satisfaction: number
    // [key: string]: string | number
}

type Patients_ByCategoryT = {
    category: string,
    count: number
}

type ChartPropsT = {
    patientsData_All: PatientsDataAllT[],
    getPatientsByCategory: (category: string) => Patients_ByCategoryT[]
}