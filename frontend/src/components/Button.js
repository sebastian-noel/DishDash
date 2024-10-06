import React, { useState } from 'react';

// Create the Button component with state
function Button() {
    const[text, setText] = useState('Clickme!');

    function handleClick() {
        setText('You clicked me!');
    }

    return (
        <button onClick={handleClick}>
            {text}
        </button>
    );
}

export default Button;