import "./App.css";
import { CardContainer } from "./components/CardContainer.jsx";
import { Header } from "./components/Header.jsx";
import { Score } from "./components/Score.jsx";
import { useState } from "react";

function App() {
	const [currentScore, setCurrentScore] = useState(0);
	const [bestScore, setBestScore] = useState(0);

	const handleScoreIncrease = () => {
		setCurrentScore(currentScore + 1);
	};

	const handleBestScore = () => {
		setBestScore(currentScore);
		setCurrentScore(0);
	};

	function generateArray(amount) {
		const maxPokemonNb = 151;
		let newIds = [];
		let counter = 0;

		while (counter < amount) {
			let randomId = Math.floor(Math.random() * maxPokemonNb + 1);

			if (newIds.includes(randomId) === false) {
				newIds.push(randomId);
				counter = counter + 1;
			}
		}
		return newIds;
	}

	const initialArray = generateArray(12);
	console.log(initialArray);

	return (
		<>
			<Header></Header>
			<Score currentScore={currentScore} bestScore={bestScore}></Score>
			<CardContainer
				handleScoreIncrease={handleScoreIncrease}
				handleBestScore={handleBestScore}
				initialArray={initialArray}
			></CardContainer>
		</>
	);
}

export default App;
