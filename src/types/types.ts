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
}
// [key: string]: string | number

type Patients_ByCategoryT = {
    category: string,
    count: number
}

type ChartPropsT = {
    patientsData_All: PatientsDataAllT[],
    getPatientsByCategory: (category: string) => Patients_ByCategoryT[]
}

// separate objects to preserve order of the properties
type PatientCount_byAgeT = {
    '0-15': number,
    '15-30': number,
    '30-45': number,
    '45-60': number,
    '60-75': number,
    '75+': number,
}

type PatientCount_byLengthOfStayT = {
    '0-3': number,
    '3-7': number,
    '7-14': number,
    '14-30': number,
    '30-45': number,
    '45-60': number,
    '60-75': number,
    '75+': number,
}

type PatientCount_bySatisfactionT = {
    'Very Dissatisfied': number,
    'Dissatisfied': number,
    'Neutral': number,
    'Satisfied': number,
    'Very Satisfied': number,
}

type Patients_ByMultipleCategoriesT = {
    category: string,
    satisfaction: PatientCount_bySatisfactionT
}