import React from 'react';
import PropTypes from 'prop-types';

import 'stylesheets/button';

const Button = ({ children, type, className, disabled = false }) => {
    const [buttonDisabled, setDisabled] = React.useState(false);
    React.useEffect(() => {
        setDisabled(disabled);
    }, [disabled]);

    return (
        <>
            <div className={`button ${className} ${type} ${buttonDisabled && 'disabled'}`}>
                {children}
            </div>
        </>
    );
};

Button.propTypes = {
    children: PropTypes.node,
    type: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool,
};

export default Button;
