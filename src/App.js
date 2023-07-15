import React, { useState, useEffect } from 'react';
import Dice from './Dice';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';

export default function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [showNumbers, setShowNumbers] = useState(false);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const allHeld = dice.every(dice => dice.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every(dice => dice.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
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
    if (!tenzies) {
      setCounter(counter + 1);
      setDice(oldDice =>
        oldDice.map(dice => {
          return dice.isHeld ? dice : generateNewDice();
        })
      );
    } else {
      setTenzies(false);
      setDice(allNewDice());
    }
  }

  function changeDiceFace() {
    setShowNumbers(!showNumbers);
  }

  function holdDice(id) {
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
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. <br /> Click each dice to freeze it at
        its current value between rolls.
      </p>
      <p> You rolled {counter} times </p>
      <button onClick={changeDiceFace}>
        Show {showNumbers ? 'Dices' : 'Numbers'}
      </button>
      <div className="dice-container">{diceElements}</div>
      <button className="roll-dice" onClick={rollDice}>
        {tenzies ? 'New Game' : 'Roll'}
      </button>
    </main>
  );
}
