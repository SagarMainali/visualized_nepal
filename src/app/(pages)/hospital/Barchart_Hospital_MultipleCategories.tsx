import CustomDropDown from '@/components/CustomDropdown';
import CustomTooltip_Hospital_MultipleCategories from '@/components/customRecharts/customTooltip_Hospital_MultipleCategories';
import Loader from '@/components/Loader';
import React, { useEffect, useRef, useState } from 'react'
import { Bar, CartesianGrid, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, LabelList, Label, Legend, Cell } from 'recharts';

export default function Barchart_Hospital_MultipleCategories({ patientsData_All, getPatientsByCategory }: ChartPropsT) {

    const [patients_byMultipleCategories, setPatients_byMultipleCategories] = useState<Patients_ByMultipleCategoriesT[] | null>(null);

    const [firstCategory, setFirstCategory] = useState<keyof PatientsDataAllT>('Condition');
    const [secondCategory, setSecondCategory] = useState<keyof PatientsDataAllT>('Length of Stay');

    const getPatientsByMultipleCategories = () => {
        setSelectedGroupData(null); // to unmount the dynamic rendering chart

        const firstCategoryData_Arr = getPatientsByCategory(firstCategory);

        const patients_byMultipleCategories: Record<string, any> = {};

        const subCategoryCount_of_firstCategory_Arr: number[] = []; // categories count in a separate field - this is to be added later after the required object has been created

        // function that generates data for first and second category and structure them to be passed to the chart 
        firstCategoryData_Arr.forEach(fcd => {
            const { category, count } = fcd;
            subCategoryCount_of_firstCategory_Arr.push(count);

            patientsData_All.forEach(patientRecord => {
                if (category !== patientRecord[firstCategory]) return;

                const sc_value = patientRecord[secondCategory] as number;

                if (secondCategory === 'Satisfaction') {
                    if (!patients_byMultipleCategories[category]) {
                        patients_byMultipleCategories[category] = {
                            'Very Dissatisfied': 0,
                            'Dissatisfied': 0,
                            'Neutral': 0,
                            'Satisfied': 0,
                            'Very Satisfied': 0,
                        } as PatientCount_bySatisfactionT;
                    }

                    if (sc_value === 1) {
                        patients_byMultipleCategories[category] = {
                            ...patients_byMultipleCategories[category],
                            'Very Dissatisfied': (patients_byMultipleCategories[category]['Very Dissatisfied'] || 0) + 1
                        }
                    } else if (sc_value === 2) {
                        patients_byMultipleCategories[category] = {
                            ...patients_byMultipleCategories[category],
                            'Dissatisfied': (patients_byMultipleCategories[category]['Dissatisfied'] || 0) + 1
                        }
                    } else if (sc_value === 3) {
                        patients_byMultipleCategories[category] = {
                            ...patients_byMultipleCategories[category],
                            'Neutral': (patients_byMultipleCategories[category]['Neutral'] || 0) + 1
                        }
                    } else if (sc_value === 4) {
                        patients_byMultipleCategories[category] = {
                            ...patients_byMultipleCategories[category],
                            'Satisfied': (patients_byMultipleCategories[category]['Satisfied'] || 0) + 1
                        }
                    } else {
                        patients_byMultipleCategories[category] = {
                            ...patients_byMultipleCategories[category],
                            'Very Satisfied': (patients_byMultipleCategories[category]['Very Satisfied'] || 0) + 1
                        }
                    }
                }

                else if (secondCategory === 'Age') {
                    if (!patients_byMultipleCategories[category]) {
                        patients_byMultipleCategories[category] = {
                            '0-15': 0,
                            '15-30': 0,
                            '30-45': 0,
                            '45-60': 0,
                            '60-75': 0,
                            '75+': 0,
                        } as PatientCount_byAgeT;
                    }

                    if (sc_value < 15) {
                        patients_byMultipleCategories[category] = {
                            ...patients_byMultipleCategories[category],
                            '0-15': (patients_byMultipleCategories[category]['0-15'] || 0) + 1
                        }
                    } else if (sc_value < 30) {
                        patients_byMultipleCategories[category] = {
                            ...patients_byMultipleCategories[category],
                            '15-30': (patients_byMultipleCategories[category]['15-30'] || 0) + 1
                        }
                    } else if (sc_value < 45) {
                        patients_byMultipleCategories[category] = {
                            ...patients_byMultipleCategories[category],
                            '30-45': (patients_byMultipleCategories[category]['30-45'] || 0) + 1
                        }
                    } else if (sc_value < 60) {
                        patients_byMultipleCategories[category] = {
                            ...patients_byMultipleCategories[category],
                            '45-60': (patients_byMultipleCategories[category]['45-60'] || 0) + 1
                        }
                    } else if (sc_value < 75) {
                        patients_byMultipleCategories[category] = {
                            ...patients_byMultipleCategories[category],
                            '60-75': (patients_byMultipleCategories[category]['60-75'] || 0) + 1
                        }
                    } else {
                        patients_byMultipleCategories[category] = {
                            ...patients_byMultipleCategories[category],
                            '75+': (patients_byMultipleCategories[category]['75+'] || 0) + 1
                        }
                    }
                }

                else if (secondCategory === 'Length of Stay') {
                    if (!patients_byMultipleCategories[category]) {
                        patients_byMultipleCategories[category] = {
                            '0-3': 0,
                            '3-7': 0,
                            '7-14': 0,
                            '14-30': 0,
                            '30-45': 0,
                            '45-60': 0,
                            '60-75': 0,
                            '75+': 0,
                        } as PatientCount_byLengthOfStayT;
                    }

                    if (sc_value < 3) {
                        patients_byMultipleCategories[category] = {
                            ...patients_byMultipleCategories[category],
                            '0-3': (patients_byMultipleCategories[category]['0-3'] || 0) + 1
                        }
                    } else if (sc_value < 7) {
                        patients_byMultipleCategories[category] = {
                            ...patients_byMultipleCategories[category],
                            '3-7': (patients_byMultipleCategories[category]['3-7'] || 0) + 1
                        }
                    } else if (sc_value < 14) {
                        patients_byMultipleCategories[category] = {
                            ...patients_byMultipleCategories[category],
                            '7-14': (patients_byMultipleCategories[category]['7-14'] || 0) + 1
                        }
                    } else if (sc_value < 30) {
                        patients_byMultipleCategories[category] = {
                            ...patients_byMultipleCategories[category],
                            '14-30': (patients_byMultipleCategories[category]['14-30'] || 0) + 1
                        }
                    } else if (sc_value < 45) {
                        patients_byMultipleCategories[category] = {
                            ...patients_byMultipleCategories[category],
                            '30-45': (patients_byMultipleCategories[category]['30-45'] || 0) + 1
                        }
                    } else if (sc_value < 60) {
                        patients_byMultipleCategories[category] = {
                            ...patients_byMultipleCategories[category],
                            '45-60': (patients_byMultipleCategories[category]['45-60'] || 0) + 1
                        }
                    } else if (sc_value < 75) {
                        patients_byMultipleCategories[category] = {
                            ...patients_byMultipleCategories[category],
                            '60-75': (patients_byMultipleCategories[category]['60-75'] || 0) + 1
                        }
                    } else {
                        patients_byMultipleCategories[category] = {
                            ...patients_byMultipleCategories[category],
                            '75+': (patients_byMultipleCategories[category]['75+'] || 0) + 1
                        }
                    }
                }

            })
        })

        const patientCount_byMultipleCategories_formatted = Object.entries(patients_byMultipleCategories).map(
            ([subCategory_of_firstCategory, secondCategory], index) => ({
                subCategory_of_firstCategory,
                count_of_subCategory_of_firstCategory: subCategoryCount_of_firstCategory_Arr[index],
                secondCategory
            })
        )

        setPatients_byMultipleCategories(patientCount_byMultipleCategories_formatted);
    }

    // extract keys from the second category to render required number of bars in the barchart
    const getAllKeysFromSecondCategory = (data: Patients_ByMultipleCategoriesT[]): string[] => {
        const secondCategory = data[0].secondCategory;
        return Object.keys(secondCategory);
    };

    useEffect(() => {
        if (patientsData_All) {
            getPatientsByMultipleCategories();
        }
    }, [patientsData_All, firstCategory, secondCategory])

    const longLabelCategories = ['Condition', 'Procedure'];
    const isSelectedCategoryLabelLong = longLabelCategories.includes(firstCategory);

    const dynamicChart_ref = useRef<HTMLDivElement | null>(null);
    const [selectedGroupData, setSelectedGroupData] = useState<SelectedGroupDataT | null>(null);

    const handleBarClick = (data: any) => {
        const { activeLabel, activePayload } = data;

        // Prevent execution if the click was inside the bar chart but not the actual bar
        if (!activePayload || activePayload.length === 0) return;

        const selectedBarData = activePayload;

        const selectedBarData_refined = selectedBarData.map((sbd: any) => {
            const { name, value, fill } = sbd;
            return {
                label: name,
                count: value,
                fill: fill,
            }
        })

        setSelectedGroupData({
            subCategory: activeLabel,
            selectedBarData: selectedBarData_refined
        })
    };

    console.log(selectedGroupData?.selectedBarData)

    // automatically scroll to the dynamic chart
    useEffect(() => {
        if (selectedGroupData && dynamicChart_ref.current) {
            dynamicChart_ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [selectedGroupData])

    const colorMap: Record<string, string> = {
        // Satisfaction
        'Satisfaction.Very Dissatisfied': '#d73027',
        'Satisfaction.Dissatisfied': '#fc8d59',
        'Satisfaction.Neutral': '#8DBCC7 ',
        'Satisfaction.Satisfied': '#a6d96a ',
        'Satisfaction.Very Satisfied': '#1a9850',

        // Age
        'Age.0-15': '#FFD447',
        'Age.15-30': '#4FD1C5',
        'Age.30-45': '#3C4F76',
        'Age.45-60': '#E76F51',
        'Age.60-75': '#A8C686',
        'Age.75+': '#796548',

        // Length of Stay
        'Length of Stay.0-3': '#64E2B7',
        'Length of Stay.3-7': '#7F8CAA',
        'Length of Stay.7-14': '#4DD0E1',
        'Length of Stay.14-30': '#26A69A',
        'Length of Stay.30-45': '#F79B72',
        'Length of Stay.45-60': '#FFB74D',
        'Length of Stay.60-75': '#F57C00',
        'Length of Stay.75+': '#CB0404',
    };

    return (
        <div className='h-auto w-full'>
            {patients_byMultipleCategories
                ? (<>
                    <div className='h-[93vh] w-full flex flex-col items-center py-4 gap-2'>
                        <div className='w-[90%] flex gap-2 items-center justify-end'>
                            <CustomDropDown label={firstCategory} arrowIcon={true} items={['Condition', 'Procedure', 'Gender', 'Readmission', 'Outcome']} onClickHandler={setFirstCategory} selectedValue={firstCategory} />
                            <span className='font-semibold'>vs</span>
                            <CustomDropDown label={secondCategory} arrowIcon={true} items={['Age', 'Satisfaction', 'Length of Stay']} onClickHandler={setSecondCategory} selectedValue={secondCategory} />
                        </div>

                        <ResponsiveContainer width="90%" height="85%">
                            <BarChart data={patients_byMultipleCategories} margin={{ top: 20, left: 10 }} onClick={handleBarClick}>
                                <XAxis
                                    dataKey="subCategory_of_firstCategory"
                                    angle={isSelectedCategoryLabelLong ? -45 : 0}
                                    textAnchor={isSelectedCategoryLabelLong ? 'end' : 'middle'}
                                    interval={0}
                                    height={isSelectedCategoryLabelLong ? 160 : 50}
                                    tickFormatter={(value) =>
                                        value.length > 20 ? `${value.substring(0, 10)}...` : value
                                    }
                                    tickMargin={isSelectedCategoryLabelLong ? 5 : 10}
                                >
                                    <Label value={firstCategory} position="insideBottom" />
                                </XAxis>

                                <YAxis label={{ value: 'No. of patients', angle: -90, position: 'insideLeft' }} />

                                <Tooltip content={<CustomTooltip_Hospital_MultipleCategories selectedValue={firstCategory} selectedValue2={secondCategory} />} />

                                <Legend />

                                <CartesianGrid stroke="#f5f5f5" />

                                {
                                    getAllKeysFromSecondCategory(patients_byMultipleCategories).map((key, index, thisArr) => (
                                        <Bar
                                            key={key}
                                            dataKey={`secondCategory.${key}`}
                                            stackId="a"
                                            fill={colorMap[`${secondCategory}.${key}`]}
                                            name={key}
                                            cursor="pointer"
                                        >
                                            {index === thisArr.length - 1 && (
                                                <LabelList dataKey="count_of_subCategory_of_firstCategory" position="top" offset={10} />
                                            )}
                                        </Bar>
                                    ))
                                }

                            </BarChart>
                        </ResponsiveContainer>
                        <p className='chart-label'>Number of patients categorized by <strong>'{firstCategory}'</strong> vs <strong>'{secondCategory}'</strong></p>
                    </div>

                    {selectedGroupData && (
                        <div className='h-[75vh] w-full flex flex-col items-center py-4 gap-2 mt-1' ref={dynamicChart_ref}>
                            <ResponsiveContainer width="80%" height="100%">
                                <BarChart data={selectedGroupData.selectedBarData} margin={{ top: 30, left: 10 }}>
                                    <XAxis dataKey="label" height={60} tickMargin={5}>
                                        <Label value={secondCategory} position="insideBottom" height={100} />
                                    </XAxis>

                                    <YAxis label={{ value: 'No. of patients', angle: -90, position: 'insideLeft' }} />

                                    <CartesianGrid stroke="#f5f5f5" />

                                    <Bar dataKey="count" animationBegin={200}>
                                        <LabelList dataKey="count" position="top" offset={10} />
                                        {selectedGroupData.selectedBarData.map((sbd, index) => (
                                            <Cell key={`cell-${index}`} fill={sbd.fill} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                            <p className='chart-label'>Number of patients categorized by <strong>'{secondCategory}'</strong> for <strong>{firstCategory}: '{selectedGroupData.subCategory}'</strong></p>
                        </div>
                    )}
                </>
                )
                :
                <Loader />
            }
        </div >
    )
}
