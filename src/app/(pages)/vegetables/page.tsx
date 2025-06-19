'use client'

import Loader from '@/components/Loader';
import axios from 'axios';
import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { LineChart, Line, ResponsiveContainer, Legend, Tooltip, XAxis, YAxis, CartesianGrid, Brush, Label } from 'recharts';
import CustomTooltip_Vegetables from './CustomTooltip_Vegetables';
import { commodities } from './vegetablesList';
import CustomActiveDot from './CustomActiveDot';
import SearchableDropDown from './SearchableDropDown';
import Modal from './Modal';

export default function Vegetables() {

    const [rangedDate_SingleVegetable, setRangedDate_SingleVegetable] = useState<RangedDate_SingleVegetable_ForChartT[] | null>(null);

    const [selectedVegetable, setSelectedVegetable] = useState('Tomato Big(Nepali)');

    // get selected vegetable data of all time
    useEffect(() => {
        (async () => {
            const { data } = await axios.get(`/api/vegetables/${selectedVegetable}`);
            setRangedDate_SingleVegetable(data);
        })();
    }, [selectedVegetable])

    const inputRef = useRef<HTMLInputElement | null>(null);
    // const [email, setEmail] = useState('');
    const [selectedVegetablesForNotification, setSelectedVegetablesForNotification] = useState<string[]>([]);

    const [error, setError] = useState('');

    const handleSubmission = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!inputRef.current) {
            return;
        }

        const inputValue: string = inputRef.current.value;

        if (inputValue.trim().length === 0) {
            setError('Please enter your email first');
            return;
        }

        if (selectedVegetablesForNotification.length === 0) {
            setError('Please select at least one vegetable you want to get notified about')
            return;
        }

        setError('');

        try {
            const { data } = await axios.post('/api/vegetables', { email: inputValue, selectedVegetablesForNotification });
            setModalMessage(data.message);
            inputRef.current.value = '';
            setSelectedVegetablesForNotification([]);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log('Submission failed:', error.response?.data);
                setModalMessage(error.response?.data?.message || "Something went wrong");
                setError('Email already in use by someone. Please use another email.')
            } else {
                console.log('Unexpected error:', error);
                setModalMessage("Unexpected error occurred");
            }
        }
    }

    const [modalMessage, setModalMessage] = useState<string | null>(null);

    return (
        <>
            <div className='h-[93vh] w-full'>
                {rangedDate_SingleVegetable
                    ? (
                        <div className='h-full w-full flex flex-col justify-center items-center gap-2'>
                            <div className='w-[85%] flex justify-end items-center gap-2'>
                                <span>Select Vegetable:</span>
                                <SearchableDropDown items={commodities} label={selectedVegetable} onClickHandler={setSelectedVegetable} selectedValue={selectedVegetable} />
                            </div>
                            {rangedDate_SingleVegetable.length !== 0
                                ? <>
                                    <ResponsiveContainer width="100%" height="80%">
                                        <LineChart data={rangedDate_SingleVegetable} margin={{ bottom: 20, left: 85, right: 85 }}>
                                            <CartesianGrid strokeDasharray="2 2" />
                                            <XAxis dataKey="date" angle={-45} textAnchor="end" tickMargin={5} height={120} >
                                                <Label value="Date" position="insideBottom" />
                                            </XAxis >
                                            <YAxis label={{ value: 'Price range', angle: -90, position: 'insideLeft' }} />
                                            <Tooltip content={<CustomTooltip_Vegetables />} />
                                            <Legend verticalAlign='top' height={30} />
                                            <Line dataKey="average" stroke="#67AE6E " strokeWidth={2} dot={false} activeDot={<CustomActiveDot />} type="monotone" name='Price trend' />
                                            <Brush dataKey="date" height={30} stroke="#67AE6E" />
                                        </LineChart>
                                    </ResponsiveContainer>
                                    <p className='text-[#67AE6E]'>Price trend of '{selectedVegetable}'</p>
                                    <div className='w-[80%] relative flex justify-center'>
                                        <span className='text-[12px] text-[#67AE6E] absolute right-0 top-[50%] -translate-y-[50%]'>Last updated: {rangedDate_SingleVegetable[rangedDate_SingleVegetable.length - 1]?.date}</span>
                                    </div>
                                </>
                                : <div className='h-[85%] flex items-center'>
                                    <p className='italic'>Chart couldn't be rendered as data for '{selectedVegetable}' is not available! Please select another vegetable.</p>
                                </div>
                            }
                        </div>
                    )
                    : <Loader />
                }
            </div>

            {/* email collection part */}
            <div className='mx-auto my-6 text-center flex flex-col gap-5 items-center'>
                <div>
                    <h3 className='text-[24px]'>Email Subscription</h3>
                    <p className='text-sm italic'>Subscribe with your email if you want to get notified about fluctuation on your selected vegetables.</p>
                </div>

                <div className='w-[85%] flex gap-2 flex-wrap justify-center mx-auto'>

                    <div className='w-full flex justify-center'>
                        <span className={`rounded px-4 py-2 flex items-center justify-center cursor-pointer text-sm duration-200
                            ${selectedVegetablesForNotification.length === commodities.length
                                ? 'bg-red-300 hover:bg-red-200'
                                : 'bg-blue-200 hover:bg-blue-300'
                            }
                        `}
                            onClick={() => {
                                if (selectedVegetablesForNotification.length === commodities.length) {
                                    setSelectedVegetablesForNotification([]); //deselect all commodities
                                } else {
                                    setSelectedVegetablesForNotification(commodities); //select all commodities
                                }
                            }}
                        >
                            {selectedVegetablesForNotification.length === commodities.length ? 'Deselect all ❌' : 'Select all ✅'}
                        </span>
                    </div>

                    {/* commodities tags */}
                    {commodities.map((commodity, index) => {
                        const isSelected = selectedVegetablesForNotification.includes(commodity);

                        return <span
                            key={index}
                            className={`rounded-full px-3 py-2 flex items-center justify-center cursor-pointer text-sm select-none ${isSelected ? 'bg-gray-500 text-white hover:bg-gray-400' : 'bg-gray-100 hover:bg-gray-300'}`}
                            onClick={() => setSelectedVegetablesForNotification(prev =>
                                isSelected
                                    ? prev.filter(item => commodity !== item)
                                    : [...prev, commodity]
                            )}
                        >
                            {commodity}
                        </span>
                    })}
                </div>

                <div className='flex flex-col gap-2 items-center relative mb-2'>
                    <form onSubmit={handleSubmission}>
                        <input type="email" placeholder='Email' className='px-8 py-3 w-[500px] bg-gray-100 outline-gray-500' ref={inputRef} />
                        <button className='px-12 py-3 bg-blue-500 text-white cursor-pointer text-[18px] ml-2 hover:bg-blue-600 duration-200' type='submit'>Submit</button>
                    </form>
                    {error && <p className='error-msg'>{error}*</p>}
                </div>

                {modalMessage && <Modal modalMessage={modalMessage} setModalMessage={setModalMessage} />}
            </div>
        </>
    )
}
