import { useEffect, useState } from 'react';




const Timer = ({ setStop, questionNumber }) => {


    const [timer, setTimer] = useState(30);


    useEffect(() => {
        // Stop the timer when it reaches 0
        if (timer === 0) {
            return setStop(true);
        }

        // Change timer every second
        const interval = setInterval(() => {
            setTimer(prev => prev - 1);
        }, 1000);

        // Clear the Interval
        return () => clearInterval(interval);
    }, [setStop, timer]);


    useEffect(() => {
        // Reset the timer when question number is changed
        setTimer(30);
    }, [questionNumber]);



    // Return the Timer
    return timer;
};



export default Timer;
