<a name="readme-top"></a>

  <h1 align="center">Tenzies Game</h1>

  <p align="center">
    An easy and entertaining game powered by me for fun and practice purposes.
    <br />
    <a href="https://tenzies-egidiosalinaro.netlify.app/" target="_blank">Try the app!</a>
  </p>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project-question">About The Project</a>
      <ul>
        <li><a href="#built-with-bricks">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started-clapper">Getting Started</a>
      <ul>
        <li><a href="#prerequisites-pencil">Prerequisites</a></li>
        <li><a href="#installation-gear">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage-joystick">Usage</a></li>
    <li><a href="#roadmap-world_map">Roadmap</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project :question:

<br>
<p align="center"><img width="458" alt="tenzies-game-by-egidiosalinaro" src="https://github.com/egidiosalinaro/tenzies-game/assets/129901135/ac2cc75d-f6fb-4e4e-99da-87c394f2f3a8"></p>

The goal of the project is to deliver a fun game application for every dice passionate.
  
At its startup the application displays the title, current score and best score, dice to play with, a button to change the view from dice faces to simple arabic numbers, a button to roll dice and to start a new game, instructions.

Dice numbers are randomly picked using `Math.random` and the `nanoid` library in the `generateNewDice` function. Once a random number from 1 to 6 is picked, it is displayed if the State `showNumbers` is true (it changes via the `changeDiceFace` function called clicking the relative button), otherwise a die face is showed relative to that number using the conditional styling regarding the `box-shadow` property (you can find the conditional styling in `./src/components/dice/diceStyle.js`).

Timer starts whether the user holds a die for the first time or presses the roll button (see `holdDice` and `rollDice` functions).
By clicking on a die, the user changes the `isHeld` prop of the `Dice` component, preventing it to roll when the roll button is clicked (as developed in the `rollDice` function.

Once every die is held and all dice have the same value, the user wins the game: `setGameState` will change the `gameState.tenzies` property to _true_, the _Confetti_ library is activated and the Roll button displays _New Game_ (see the `useEffect` function under the `// setting winnign conditions` comment line). Rolls count and timer are saved in the user local storage if this was the first game or if they are better than the previous ones.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With :bricks:

JavaScript is basically all I used to bootstrap this project.
I created the app using React: every html element is created with the jsx sintax; style is build with Sass and styled components.

<p align="left"><a href="https://www.w3.org/html/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/> </a> Html5 <br>
<a href="https://www.w3schools.com/css/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/></a> Css3 <br>
<a href="https://sass-lang.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/sass/sass-original.svg" alt="sass" width="40" height="40"/> </a> Sass <br>
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> JavaScript ES6 <br>
<a href="https://webpack.js.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/d00d0969292a6569d45b06d3f350f463a0107b0d/icons/webpack/webpack-original-wordmark.svg" alt="webpack" width="40" height="40"/> </a> Webpack <br>
<a href="https://reactjs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a> React</p>


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started :clapper:

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). <br>
I published this code at the link https://tenzies-egidiosalinaro.netlify.app/ so you can use it, but if you want you can also install it in your device using React:


### Prerequisites :pencil:

You need to have Node and npm installed. You can check the version you have installed running:
* npm
  ```sh
  npm -v
  ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Installation :gear:

Once downloaded this repo, in the project directory, you can run:

```sh
npm start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
The page will reload when you make changes.\
You may also see any lint errors in the console.

```sh
npm test
```

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

```sh
npm run build
```

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage :joystick:

At its startup the application displays game instructions. User can decide whether to play showing numbers or dice faces, using the relevant button.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap :world_map:

- [x] generate random numbers
- [x] roll dice functions
- [x] hold dice functions
- [x] winning conditions
- [x] rolls counter and timer
- [x] saving scores to user local storage
- [x] styles improvements
    - [x] coherent color palette
    - [x] organized Sass files
    - [x] styled component for conditional dice faces rendering


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

egidiosalinaro@gmail.com

<p align="right">(<a href="#readme-top">back to top</a>)</p>
