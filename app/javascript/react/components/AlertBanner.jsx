import React from 'react';
import PropTypes from 'prop-types';
import '../stylesheets/alert-banner.scss';

const AlertBanner = ({ message, type, onClose }) => {
    const emojis = { success: '👍🏼', error: '😨', warning: '⚠️❗️' };

    const handleAlertClose = () => {
        onClose();
    };

    return (
        <div
            className={`alert-banner ${type}`}
            role={type === 'error' ? 'alert' : 'status'}
            aria-live={type === 'error' ? 'assertive' : 'polite'}
        >
            <p className="message m-0">
                <span className="emoji-icon">{emojis[type]}</span>
                <span className="ml-1">{message}</span>
            </p>
            <button
                className="close-button"
                onClick={handleAlertClose}
                aria-label="Dismiss this message"
            >
                X
            </button>
        </div>
    );
};

AlertBanner.propTypes = {
    type: PropTypes.oneOf(['success', 'error', 'warning']),
    message: PropTypes.string,
    onClose: PropTypes.func,
};

export default AlertBanner;
