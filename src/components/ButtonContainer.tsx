import React from 'react'
import CalcButton from "./CalcButton";
import { ButtonContainerProps } from "../interfaces/buttonContainerProp"
import { toggleNeg } from '../functions/calcUtils';

function ButtonContainer({ handleInput, makeNegative }: ButtonContainerProps): JSX.Element {
    // lists to layout buttons in columns
    const firstCol: string[] = ["7", "4", "1", "0"]
    const secondCol: string[] = ["8", "5", "2", "."]
    const thirdCol: string[] = ["9", "6", "3", "="]
    const fourthCol: string[] = ["/", "*", "-", "+"]
    const fifthCol: string[] = ["^", "ac", "del"]
    return (
        <div className='button-container'>
            <div className='calc-columns'>
                {firstCol.map((item, index) => (
                    <CalcButton key={index} operator={item} handleInput={handleInput} />
                ))}
            </div>
            <div className='calc-columns'>
                {secondCol.map((item, index) => (
                    <CalcButton key={index} operator={item} handleInput={handleInput} />
                ))}
            </div>
            <div className='calc-columns'>
                {thirdCol.map((item, index) => (
                    <CalcButton key={index} operator={item} handleInput={handleInput} />
                ))}
            </div>
            <div className='calc-columns'>
                {fourthCol.map((item, index) => (
                    <CalcButton key={index} operator={item} handleInput={handleInput} />
                ))}
            </div>
            <div className='calc-columns'>
                {fifthCol.map((item, index) => (
                    <CalcButton key={index} operator={item} handleInput={handleInput} />
                ))}
                {/* pass a different function as a prop here to make the current number negative */}
                <CalcButton operator='+/-' handleInput={makeNegative} />
            </div>
        </div>
    )
}


export default ButtonContainer