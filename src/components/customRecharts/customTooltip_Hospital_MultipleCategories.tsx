import React from 'react'

export default function CustomTooltip_Hospital_MultipleCategories({ active, payload, selectedValue, selectedValue2 }: CustomTooltipT) {

    if (!active || !payload || !payload.length) return null;

    const { category, satisfaction } = payload[0].payload;

    return (
        <div className="px-5 py-4 shadow-2xl rounded border border-light flex flex-col bg-slate-50/90">
            <p className="font-semibold mb-1 text-primary-gray underline underline-offset-2">Comparision: {selectedValue} vs {selectedValue2!}</p>
            <p className="font-semibold mb-1 text-primary-gray">{selectedValue}: {category}</p>
            <hr />
            <span className='font-semibold text-[#497D74]'>Very Satisfied: {satisfaction['Very Satisfied']}</span>
            <span className='font-semibold text-[#A0C878]'>Satisfied: {satisfaction['Satisfied']}</span>
            <span className='font-semibold text-[#7886C7]'>Neutral: {satisfaction['Neutral']}</span>
            <span className='font-semibold text-[#F97A00]'>Dissatisfied: {satisfaction['Dissatisfied']}</span>
            <span className='font-semibold text-[#FF0B55]'>Very Dissatisfied: {satisfaction['Very Dissatisfied']}</span>
        </div>
    );
}
