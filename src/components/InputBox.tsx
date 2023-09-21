import React from 'react'
import { InputBoxProps } from '../interfaces/inputBoxProps';



export default function InputBox({ handleInput, screenStr }: InputBoxProps): JSX.Element {
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const key = event.key
        if (
            // List of accepted keys
            (key >= '0' && key <= '9') ||
            key === '+' ||
            key === '-' ||
            key === '*' ||
            key === '/' ||
            key === '^' ||
            key === '=' ||
            key === 'Enter' ||
            key === 'Backspace' ||
            key === 'Escape' ||
            key == 'n'
        ) {
            event.preventDefault(); // Prevent default behavior

            if (key === 'Enter') {
                handleInput('=')
            } else if (key === 'Backspace') {
                handleInput("del")
            } else if (key === 'Escape') {
                handleInput('ac') // Handle escape key as clear (ac) button
            } else {
                handleInput(key)
            }
        }
    }; // Function to handle keyboard input

    return (
        <input onKeyDown={handleKeyDown} type="text" readOnly={true} value={screenStr} id="calculator-input" placeholder='click here to use your keyboard'/>
    )
}