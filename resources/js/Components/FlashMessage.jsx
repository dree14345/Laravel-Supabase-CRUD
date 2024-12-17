import React, { useState, useEffect } from 'react';

const FlashMessage = ({ message, type, onClose }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setVisible(false);
                if (onClose) onClose();
            }, 5000); // Hide message after 5 seconds

            return () => clearTimeout(timer); // Clean up the timer
        }
    }, [message, onClose]);

    if (!visible || !message) return null;

    return (
        <div
            className={`fixed top-4 right-4 ${type === 'success' ? 'bg-green-500' :
                type === 'danger' ? 'bg-yellow-500' :
                    'bg-red-500'
                } text-white p-4 rounded shadow-lg`}
            style={{ zIndex: 50 }} // Set a high z-index value
        >
            {message}
        </div>
    );
};

export default FlashMessage;
