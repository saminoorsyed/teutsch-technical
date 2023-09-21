import React from 'react'
import { HistoryBoxProps } from '../interfaces/historyBoxProps'

export default function HistoryBox({ previousLines }: HistoryBoxProps) {
    return (
        <div className='history-box'>
            Prior Calculations:
            {previousLines.map((item, index) => (
                <p key={index}><strong>{index+1}) </strong> {item}</p>
            ))}
        </div>
    )
}