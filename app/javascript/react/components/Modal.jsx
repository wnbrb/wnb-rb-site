import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import '../stylesheets/modal';

const Modal = ({ isOpen, onClose, children }) => {
    const handleKeyDown = useCallback(
        (e) => {
            if (e.key === 'Escape') onClose();
        },
        [onClose],
    );

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [isOpen, handleKeyDown]);

    if (!isOpen) return null;

    return (
        <div
            className="modal-overlay"
            role="presentation"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
            onKeyDown={handleKeyDown}
        >
            <div className="modal-content" role="dialog" aria-modal="true">
                <button className="modal-close" type="button" onClick={onClose} aria-label="Close">
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node,
};

export default Modal;
