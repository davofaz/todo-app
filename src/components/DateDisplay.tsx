import React, { useState, useEffect } from 'react';

const DateDisplay: React.FC = () => {
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        const today = new Date();
        const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        setCurrentDate(today.toLocaleDateString(undefined, options));
    }, []);

    return (
        <>
            <h3 className="header-date">{currentDate}</h3>
        </>

    )

}

export default DateDisplay;