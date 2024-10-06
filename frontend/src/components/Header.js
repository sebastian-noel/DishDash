import React from 'react';

// Define the header component
function Header(props) {
    return (
        <header>
            <h1>{props.title}</h1>
            <p>{props.subtitle}</p>
        </header>
    );
}

// Export the header to be used elsewhere
export default Header;