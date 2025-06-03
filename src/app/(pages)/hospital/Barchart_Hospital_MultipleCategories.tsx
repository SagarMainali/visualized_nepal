import CustomDropDown from '@/components/CustomDropdown';
import CustomTooltip_Hospital_MultipleCategories from '@/components/customRecharts/customTooltip_Hospital_MultipleCategories';
import Loader from '@/components/Loader';
import React, { useEffect, useRef, useState } from 'react'
import { Bar, CartesianGrid, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, LabelList, Label, Legend, Cell } from 'recharts';

export default function Barchart_Hospital_MultipleCategories({ patientsData_All, getPatientsByCategory }: ChartPropsT) {

    const [patients_byMultipleCategories, setPatients_byMultipleCategories] = useState<Patients_ByMultipleCategoriesT[] | null>(null);

    const [firstCategory, setFirstCategory] = useState<keyof PatientsDataAllT>('Condition');
    const [secondCategory, setSecondCategory] = useState<keyof PatientsDataAllT>('Satisfaction');

    const getPatientsByMultipleCategories = () => {
        setSelectedGroupData(null);
        const firstCategoryData_Arr = getPatientsByCategory(firstCategory);

        const patients_byMultipleCategories: Record<string, any> = {};

        const categoryCounts: number[] = []; // categories count in a separate field - this is to be added later after the required object has been created

        firstCategoryData_Arr.forEach(fcd => {
            const { category, count } = fcd;
            categoryCounts.push(count);

            patientsData_All.forEach(patientRecord => {
                if (category !== patientRecord[firstCategory]) return;

                const sc = patientRecord[secondCategory];

                if (!patients_byMultipleCategories[category]) {
                    patients_byMultipleCategories[category] = {
                        'Very Dissatisfied': 0,
                        'Dissatisfied': 0,
                        'Neutral': 0,
                        'Satisfied': 0,
                        'Very Satisfied': 0,
                    };
                }

                if (sc === 1) {
                    patients_byMultipleCategories[category] = {
                        ...patients_byMultipleCategories[category],
                        'Very Dissatisfied': (patients_byMultipleCategories[category]['Very Dissatisfied'] || 0) + 1
                    }
                } else if (sc === 2) {
                    patients_byMultipleCategories[category] = {
                        ...patients_byMultipleCategories[category],
                        'Dissatisfied': (patients_byMultipleCategories[category]['Dissatisfied'] || 0) + 1
                    }
                } else if (sc === 3) {
                    patients_byMultipleCategories[category] = {
                        ...patients_byMultipleCategories[category],
                        'Neutral': (patients_byMultipleCategories[category]['Neutral'] || 0) + 1
                    }
                } else if (sc === 4) {
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
            })
        })

        const patientCount_byMultipleCategories_formatted = Object.entries(patients_byMultipleCategories).map(
            ([category, satisfaction], index) => ({
                category,
                count: categoryCounts[index],
                satisfaction
            })
        )

        setPatients_byMultipleCategories(patientCount_byMultipleCategories_formatted);
    }

    useEffect(() => {
        if (patientsData_All) {
            getPatientsByMultipleCategories();
        }
    }, [patientsData_All, firstCategory])

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
            const { fill, name, value } = sbd;
            return {
                satisfactionLabel: name,
                satisfactionCount: value,
                satisfactionFill: fill,
            }
        })

        setSelectedGroupData({
            category: activeLabel,
            satisfaction: selectedBarData_refined
        })
    };

    // automatically scroll to the dynamic chart
    useEffect(() => {
        if (selectedGroupData && dynamicChart_ref.current) {
            dynamicChart_ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [selectedGroupData])

    return (
        <div className='h-auto w-full'>
            {patients_byMultipleCategories
                ? (<>
                    <div className='h-[93vh] w-full flex flex-col items-center py-4 gap-2'>
                        <div className='w-[90%] flex gap-2 items-center justify-end'>
                            <CustomDropDown label={firstCategory} arrowIcon={true} items={['Condition', 'Procedure', 'Gender', 'Readmission', 'Outcome']} onClickHandler={setFirstCategory} selectedValue={firstCategory} />
                            <span className='font-semibold'>vs</span>
                            <CustomDropDown label={secondCategory} arrowIcon={true} items={['Satisfaction']} onClickHandler={setSecondCategory} selectedValue={secondCategory} />
                        </div>

                        <ResponsiveContainer width="90%" height="85%">
                            <BarChart data={patients_byMultipleCategories} margin={{ top: 20, left: 10 }} onClick={handleBarClick}>
                                <XAxis
                                    dataKey="category"
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

                                <Bar dataKey="satisfaction.Very Dissatisfied" stackId='a' fill="#FF0B55" name='Very Dissatisfied' cursor="pointer" />
                                <Bar dataKey="satisfaction.Dissatisfied" stackId='a' fill="#F97A00" name='Dissatisfied' cursor="pointer" />
                                <Bar dataKey="satisfaction.Neutral" stackId='a' fill="#7886C7" name='Neutral' cursor="pointer" />
                                <Bar dataKey="satisfaction.Satisfied" stackId='a' fill="#A0C878" name='Satisfied' cursor="pointer" />
                                <Bar dataKey="satisfaction.Very Satisfied" stackId='a' fill="#497D74" name='Very Satisfied' cursor="pointer">
                                    <LabelList dataKey="count" position="top" offset={10} />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                        <p className='chart-label'>Number of patients categorized by <strong>'{firstCategory}'</strong> vs <strong>'{secondCategory}'</strong></p>
                    </div>

                    {selectedGroupData && (
                        <div className='h-[75vh] w-full flex flex-col items-center py-4 gap-2 mt-1' ref={dynamicChart_ref}>
                            <ResponsiveContainer width="80%" height="100%">
                                <BarChart data={selectedGroupData.satisfaction} margin={{ top: 30, left: 10 }}>
                                    <XAxis dataKey="satisfactionLabel" height={60} tickMargin={5}>
                                        <Label value={selectedGroupData.category} position="insideBottom" height={100} />
                                    </XAxis>

                                    <YAxis label={{ value: 'No. of patients', angle: -90, position: 'insideLeft' }} />

                                    <CartesianGrid stroke="#f5f5f5" />

                                    <Bar dataKey="satisfactionCount" animationBegin={200}>
                                        <LabelList dataKey="satisfactionCount" position="top" offset={10} />
                                        {selectedGroupData.satisfaction.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.satisfactionFill} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                            <p className='chart-label'>Number of patients categorized by <strong>'{secondCategory}'</strong> for <strong>'{selectedGroupData.category}'</strong></p>
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
