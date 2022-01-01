import { useEffect, useMemo, useState } from 'react';

import './app.css';
import Timer from './components/Timer';
import Trivia from './components/Trivia';
import Start from './components/Start';



function App() {


    const [username, setUsername] = useState(null);
    const [questionNumber, setQuestionNumber] = useState(1);
    const [stop, setStop] = useState(false);
    const [earned, setEarned] = useState("$ 0");



    // Values for Money Pyramid
    const moneyPyramid = useMemo(() => 
        [
            { id: 1, amount: "$ 100" },
            { id: 2, amount: "$ 200" },
            { id: 3, amount: "$ 300" },
            { id: 4, amount: "$ 500" },
            { id: 5, amount: "$ 1000" },
            { id: 6, amount: "$ 2000" },
            { id: 7, amount: "$ 4000" },
            { id: 8, amount: "$ 8000" },
            { id: 9, amount: "$ 16000" },
            { id: 10, amount: "$ 32000" },
            { id: 11, amount: "$ 64000" },
            { id: 12, amount: "$ 125000" },
            { id: 13, amount: "$ 250000" },
            { id: 14, amount: "$ 500000" },
            { id: 15, amount: "$ 1000000" }
        ].reverse(), 
    []);
     



    // Test questions
    const data = [
        {
            id: 1,
            question: "Ah they do though don't they though?",
            answers: [
                {
                    text: "They do",
                    correct: true,
                },
                {
                    text: "They don't",
                    correct: false,
                },
                {
                    text: "What?",
                    correct: false,
                },
                {
                    text: "Yeah",
                    correct: false,
                }
            ]
        },

        {
            id: 2,
            question: "Howiya?",
            answers: [
                {
                    text: "Could be better",
                    correct: false,
                },
                {
                    text: "Grand",
                    correct: true,
                },
                {
                    text: "Not the best",
                    correct: false,
                },
                {
                    text: "Great",
                    correct: false,
                }
            ]
        },

        {
            id: 3,
            question: "That's mad innit?",
            answers: [
                {
                    text: "What's mad?",
                    correct: false,
                },
                {
                    text: "Who?",
                    correct: false,
                },
                {
                    text: "Tis?",
                    correct: true,
                },
                {
                    text: "Tisn't",
                    correct: false,
                }
            ]
        }
    ];


    useEffect(() => {
        // Check atleast one question has been answered and set amount Earned in state when question number changed
        questionNumber > 1 && setEarned(moneyPyramid.find(money => money.id === questionNumber - 1).amount);
    }, [questionNumber, moneyPyramid]);




    return (
        <div className="app">

            {username ? (
                <>
                    <div className="main">
                        {stop ? 
                            // Game Over Screen if game Stopped
                            (<h1 className='endText'>You earned: {earned}</h1>) : (
                                <>
                                    <div className="top">
                                        {/* Timer */}
                                        <div className="timer">
                                            <Timer setStop={setStop} questionNumber={questionNumber} />
                                        </div>
                                    </div>

                                    <div className="bottom">
                                        {/* Game Section */}
                                        <Trivia 
                                            data={data} setStop={setStop} setQuestionNumber={setQuestionNumber} questionNumber={questionNumber} 
                                        />
                                    </div>
                                </>
                            )
                        } 
                    </div>

                    {/* Money Pyramid */}
                    <div className="pyramid">
                        <ul className="moneyList">
                            {moneyPyramid.map(money => (
                                <li className={questionNumber === money.id ? "moneyListItem active" : "moneyListItem"}>
                                    {/* Question Number */}
                                    <span className="moneyListItemNumber">{money.id}</span>

                                    {/* Question Value */}
                                    <span className="moneyListItemAmount">{money.amount}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            ) : (
                <Start setUsername={setUsername} />
            )}
        </div>
    );
};



export default App;
