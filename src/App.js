import React, { useState, useEffect } from 'react';
import Dice from './components/dice/Dice';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';

export default function App() {
  // game States
  const [dice, setDice] = useState(allNewDice());
  const [gameState, setGameState] = useState(defaultGameState());
  const [start, setStart] = useState(false);
  const [bestScore, setBestScore] = useState(
    JSON.parse(localStorage.getItem('tenziesBestScore')) || {
      rolls: null,
      time: 0,
    }
  );

  // State for visualizing numbers/dice
  const [showNumbers, setShowNumbers] = useState(false);

  // time States and mappers
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

  if (seconds > 59) {
    setSeconds(0);
    setMinutes(minute => minute + 1);
  }
  if (bestScore.time > 59) {
    setSeconds(0);
    setMinutes(minute => minute + 1);
  }
  if (minutes > 59) {
    setMinutes(0);
  }

  function defaultGameState() {
    return { tenzies: false, rolls: 0 };
  }

  // setting best score
  useEffect(() => {
    if (gameState.tenzies) {
      if (bestScore.rolls === null) {
        setBestScore(prevBest => {
          return { ...prevBest, rolls: gameState.rolls, time: seconds };
        });
      }
      if (gameState.rolls < bestScore.rolls || seconds < bestScore.time) {
        setBestScore(prevBest => {
          return { ...prevBest, rolls: gameState.rolls, time: seconds };
        });
      }
    }
  }, [seconds, gameState, bestScore]);

  // saving recorded best score in local storage
  useEffect(() => {
    localStorage.setItem('tenziesBestScore', JSON.stringify(bestScore));
  }, [bestScore]);

  // starting timer
  useEffect(() => {
    let timer = setInterval(() => {
      if (!start) {
        return;
      }
      if (gameState.tenzies) {
        return;
      }
      setSeconds(second => second + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [start, gameState.tenzies]);

  // generating random dice when not held
  function generateNewDice() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDice());
    }
    return newDice;
  }

  // setting winning conditions
  useEffect(() => {
    const allHeld = dice.every(dice => dice.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every(dice => dice.value === firstValue);
    if (allHeld && allSameValue) {
      setGameState(prev => {
        return { ...prev, tenzies: true };
      });
    }
  }, [dice]);

  // main button serving as roll or new game
  function rollDice() {
    if (!gameState.tenzies) {
      !start && setStart(!start);
      setGameState(prev => {
        return { ...prev, rolls: prev.rolls + 1 };
      });
      setDice(oldDice =>
        oldDice.map(dice => {
          return dice.isHeld ? dice : generateNewDice();
        })
      );
    } else {
      setStart(false);
      setSeconds(0);
      setMinutes(0);
      setGameState(defaultGameState());
      setDice(allNewDice());
    }
  }

  // secondary button used to show numbers or dice
  function changeDiceFace() {
    setShowNumbers(!showNumbers);
  }

  // function to hold dice
  function holdDice(id) {
    !start && setStart(!start);
    setDice(oldDice =>
      oldDice.map(dice => {
        return dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice;
      })
    );
  }

  const diceElements = dice.map(dice => (
    <Dice
      key={dice.id}
      value={dice.value}
      isHeld={dice.isHeld}
      holdDice={() => holdDice(dice.id)}
      showNumbers={showNumbers}
    />
  ));

  return (
    <main>
      {gameState.tenzies && <Confetti />}
      <div className="head">
        <h1>Tenzies</h1>
        <h6>by Egidio Salinaro</h6>
      </div>
      <div className="scores">
        <p className="current">
          <b>Score</b> <br />
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}{' '}
          <br />
          rolls {gameState.rolls}
        </p>
        <p className="best">
          <b>Best</b> <br />
          {String(minutes).padStart(2, '0')}:
          {String(bestScore.time).padStart(2, '0')} <br /> rolls{' '}
          {bestScore.rolls === null ? '0' : bestScore.rolls}
        </p>
      </div>
      <button onClick={changeDiceFace}>
        Show {showNumbers ? 'Dice' : 'Numbers'}
      </button>
      <div className="dice-container">{diceElements}</div>
      <button className="roll-dice" onClick={rollDice}>
        {gameState.tenzies ? 'New Game' : 'Roll'}
      </button>
      <p className="instructions">
        <b>HOW TO PLAY:</b> Roll until all dice are the same. <br /> Click each
        die to <b>freeze</b> it at its current value between rolls.
      </p>
    </main>
  );
}
