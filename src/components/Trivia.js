import React, { useEffect, useState } from 'react';
import useSound from 'use-sound';

import play from '../assets/play.mp3';
import correct from '../assets/correct.mp3';
import wrong from '../assets/wrong.mp3';



const Trivia = ({ data, setStop, questionNumber, setQuestionNumber }) => {

    
    const [question, setQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [className, setClassName] = useState(null);

    const [letsPlay] = useSound(play);
    const [correctAnswer] = useSound(correct);
    const [wrongAnswer] = useSound(wrong);


    useEffect(() => {
        // Play Start sound when component is first rendered - user must interact with window in most browsers
        letsPlay();
    }, [letsPlay]);


    useEffect(() => {
        // Store the question in State when component is loaded or question number changes
        console.log("shit");
        setQuestion(data[questionNumber - 1]);
    }, [data, questionNumber]);


    // Method to call a function after set amount of time
    const delay = (duration, callback) => {
        setTimeout(() => {
            callback();
        }, duration);
    };



    const handleClick = answer => {
        // Store selected answer in state
        setSelectedAnswer(answer);
        // Set class name to active
        setClassName("answer active");

        delay(3000, () => {
            // Check whether answer is correct and set new Class Name after 3 second timeout
            setClassName(answer.correct ? 'answer correct' : 'answer wrong');
        });

        delay(5000, () => {
            if (answer.correct) {
                // Play Correct Answer Sound if correct
                correctAnswer();

                // Wait another second and emove selected answer from state and move to next question
                delay(1000, () => {
                    setQuestionNumber(prev => prev + 1);
                    setSelectedAnswer(null);
                });
                
            } else {
                // Play Wrong Answer Sound if incorrect
                wrongAnswer();

                // Stop the game if answer is incorrect
                delay(1000, () => {
                    setStop(true);
                });
            }
        })
    };



    return (
        <div className='trivia'>
            {/* Question */}
            <div className="question">{question?.question}</div>

            {/* Answers */}
            <div className="answers">
                {question?.answers.map(answer => (
                    <div 
                        className={selectedAnswer === answer ? className : "answer"} onClick={() => handleClick(answer)}
                    >
                        {answer.text}
                    </div>
                ))}
            </div>
        </div>
    );
};



export default Trivia;
