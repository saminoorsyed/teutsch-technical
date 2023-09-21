import React from 'react'
import { CalcButtonProps } from '../interfaces/calcButtonProps'

export default function CalcButton({operator, handleInput}: CalcButtonProps): JSX.Element {
  return (
    <button className="calculator-button" onClick = {()=>handleInput(operator)}>{operator}</button>
  )
}