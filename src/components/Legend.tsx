import React from 'react'

function Legend() {
    return (
        <>
        <p> <strong>Keyboard Directions:</strong></p>
        <div className="directions-container" >
            <p className="directions">"*"= multiply </p>
            <p className="directions">"/" = divide</p>
            <p className="directions">"+" = add</p>
            <p className="directions">"-"=subtract </p>
            <p className="directions"> "^"= exponent</p>
            <p className="directions">"=" or "Enter"</p>
            <p className="directions">"Esc" clears all input</p>
            <p className="directions">"Backspace" removes the last char</p>
            <p className="directions">"n" multiply current number by -1</p>
        </div>
        </>
    )
}

export default Legend