import React, { useState, useEffect } from 'react';
import Dice from './Dice';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';

export default function App() {
  const [dice, setDice] = useState(allNewDice());
  const [gameState, setGameState] = useState(defaultGameState());
  const [start, setStart] = useState(false);

  const [showNumbers, setShowNumbers] = useState(false);

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);

  const [bestScore, setBestScore] = useState(
    JSON.parse(localStorage.getItem('tenziesBestScore')) || {
      rolls: null,
      time: 0,
    }
  );

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
    setHours(hour => hour + 1);
  }
  if (hours > 23) {
    setSeconds(0);
    setMinutes(0);
    setHours(0);
  }

  function defaultGameState() {
    return { tenzies: false, rolls: 0 };
  }

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

  useEffect(() => {
    localStorage.setItem('tenziesBestScore', JSON.stringify(bestScore));
  }, [bestScore]);

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
      setHours(0);
      setGameState(defaultGameState());
      setDice(allNewDice());
    }
  }

  function changeDiceFace() {
    setShowNumbers(!showNumbers);
  }

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
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. <br /> Click each die to freeze it at
        its current value between rolls.
      </p>
      <p>
        Time {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}
        :{String(seconds).padStart(2, '0')}
      </p>
      <p>{gameState.rolls} rolls</p>
      <p>
        Best Scores: <br />
        {bestScore.rolls === null ? '0' : bestScore.rolls} rolls Time{' '}
        {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:
        {String(bestScore.time).padStart(2, '0')}
      </p>
      <button onClick={changeDiceFace}>
        Show {showNumbers ? 'Dice' : 'Numbers'}
      </button>
      <div className="dice-container">{diceElements}</div>
      <button className="roll-dice" onClick={rollDice}>
        {gameState.tenzies ? 'New Game' : 'Roll'}
      </button>
    </main>
  );
}
