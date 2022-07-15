import { useEffect, useState } from "react";
import "./App.css";
import Buttons from "./components/Buttons";
import { MAX, options } from "./keywords/keywords";
import StopWatch from "./components/StopWatch";

function App() {
  const [correctans, setCorrectans] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);
  const [answer, setAnswer] = useState("");

  //For generating 20Random Alphabets.
  const getRandomString = () => {
    let res = "";
    for (let i = 0; i < 1; i++) {
      res = res + options[Math.floor(Math.random() * 10) % MAX];
    }
    return res;
  };

  const [alphabet, setAlphabet] = useState(getRandomString(1));

  //For updating the time continuosly.
  useEffect(() => {
    let interval = null;
    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused]);

  //For getting Highscore from localStorage.
  const highScore = localStorage.getItem("highScore")
    ? localStorage.getItem("highScore")
    : 0;

  //For staring the timer.
  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  //For generating the alphabet after pressing correct Keyword.
  const generateText = () => {
    const alpha = getRandomString();
    setAlphabet(alpha);
  };

  //For reset the game and autoFocus the inputField for next game.
  let nameInput = null;
  const handleReset = () => {
    setAnswer("");
    setCorrectans(0);
    generateText();
    setIsActive(false);
    setTime(0);
    nameInput.focus();
  };

  //For incorrect Keyword increase the timing.
  const handlePenalty = () => {
    const incresedTime = time + 500;
    setTime(incresedTime);
  };

  //For checking the answer.
  const checkAnswer = (e) => {
    handleStart();
    const userInput = e.target.value;
    const isCorrectAnswer =
      userInput.charAt(userInput.length - 1).toLowerCase() === alphabet;
    if (isCorrectAnswer) {
      setCorrectans(correctans + 1);
      generateText();
    } else {
      handlePenalty();
    }
    setAnswer(userInput.toUpperCase());
    if (correctans === 20) {
      const isSuccess = highScore ? time <= highScore : true;
      setIsActive(false);
      if (isSuccess) {
        setAlphabet("success");
        localStorage.setItem("highScore", time);
      } else setAlphabet("failure");
    }
  };

  return (
    <>
      <div className="container text-center my-5 ">
        <div className="App">
          <p className="text-white h2">
            <strong>Type The Alphabet</strong>
          </p>
          <p className="text-white mt-3">
            Typing game to see how fast you type. Timer starts when you do :)
          </p>
          <div className="col-md-12 text-center bg-light rounded my-5 mx-3">
            <h3 className="animate-charcter"> {alphabet} </h3>
          </div>
          <StopWatch time={time} highScore={highScore} />
          <div className="my-4 d-flex justify-content-between">
            <input
              type="text"
              className="form-control rounded-0 text-center"
              placeholder="Type here"
              autoFocus
              value={answer}
              onChange={(e) => {
                checkAnswer(e);
              }}
              ref={(input) => {
                nameInput = input;
              }}
            />
            <Buttons
              isActive={isActive || answer.length >= 20}
              handleReset={handleReset}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
