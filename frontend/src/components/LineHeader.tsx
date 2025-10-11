import React from 'react'

type LineHeaderProps = {
    Heading: string;}
const LineHeader = ({Heading}:LineHeaderProps) => {
    return (
        <div className="flex items-center gap-4 w-full ">
            <div className="flex-1 h-px bg-gray-300" />
            <h2 className="text-sm font-semibold text-gray-600 whitespace-nowrap">{Heading}</h2>
            <div className="flex-1 h-px bg-gray-300" />
        </div>

    )
}

export default LineHeader