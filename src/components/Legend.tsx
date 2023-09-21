import React from 'react'

function Legend() {
    return (
        <div className="directions-container" >
            <p className="directions"> <strong>Keyboard Directions:</strong></p>
            <p className="directions">"*"= multilpy, "/" = divide, "+" = add, "-"== subtract, "^"= raise the the power of,</p>
            <p className="directions">"=" or "Enter" computes the current sum,"Esc" clears all input, </p>
            <p className="directions">"Backspace" removes the last character input, "n" multiplies the current number by -1</p>
        </div>
    )
}

export default Legend