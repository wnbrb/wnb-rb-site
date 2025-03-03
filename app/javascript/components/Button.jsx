import React from 'react';
import PropTypes from 'prop-types';

import 'stylesheets/button';

const Button = ({ children, type = '', className = '', disabled = false, onClick = () => {} }) => {

    const [buttonDisabled, setDisabled] = React.useState(false);
    React.useEffect(() => {
        setDisabled(disabled);
    }, [disabled]);

    return (
        <>
            <button
                className={`button ${className} ${type} ${buttonDisabled && 'disabled'}`}
                onClick={onClick}
            >
                {children}
            </button>
        </>

    );
};

Button.propTypes = {
    children: PropTypes.node,
    type: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func, 

};

export default Button;
