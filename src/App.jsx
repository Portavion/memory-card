import "./App.css";
import { CardContainer } from "./components/CardContainer.jsx";
import { Header } from "./components/Header.jsx";
import { Score } from "./components/Score.jsx";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
	const [currentScore, setCurrentScore] = useState(0);
	const [bestScore, setBestScore] = useState(0);
	const [pokemons, setPokemons] = useState([]);
	// const [ids, setIds] = useState(generateArray(12));
	const [ids, setIds] = useState([]);
	const [start, setStart] = useState(false);

	let cardContainerKey = uuidv4();

	const handleScoreIncrease = () => {
		setCurrentScore(currentScore + 1);
	};

	const handleBestScore = () => {
		if (currentScore > bestScore) {
			setBestScore(currentScore);
		}
		setCurrentScore(0);
	};

	useEffect(() => {
		const fetchPokemon = async (id) => {
			const response = await fetch(
				`https://pokeapi.co/api/v2/pokemon/${id}/`,
				{
					method: "GET",
					mode: "cors",
				}
			);

			const json = await response.json();
			const newPokemon = await {
				name: json.name,
				id: json.id,
				img: json.sprites.versions["generation-vii"][
					"ultra-sun-ultra-moon"
				].front_default,
				isClicked: false,
			};
			setPokemons((pokemons) => shuffle([...pokemons, newPokemon]));
		};
		for (let i in ids) {
			fetchPokemon(ids[i]);
		}
	}, [ids]);

	function generateRandomPokemon(amount, existingPokemonArray = []) {
		const maxPokemonNb = 151;
		const arrayPokemonIds = existingPokemonArray;
		let newIds = [];
		let counter = 0;

		while (counter < amount) {
			let randomId = Math.floor(Math.random() * maxPokemonNb + 1);

			if (arrayPokemonIds.includes(randomId) === false) {
				newIds.push(randomId);
				counter = counter + 1;
			}
		}

		return newIds;
	}

	function handleListIncrease(array) {
		const pokemonClicked = array.filter(
			(pokemon) => pokemon.isClicked === true
		).length;
		const pokemonTotal = array.length;
		const pokemonUnclicked = pokemonTotal - pokemonClicked;

		if (pokemonUnclicked < 4) {
			const newPokemonIds = generateRandomPokemon(
				4,
				pokemons.map((pokemon) => pokemon.id)
			);
			setIds(newPokemonIds);
		}
	}

	function shuffle(array) {
		for (let i = array.length - 1; i > 0; i--) {
			let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}

	function resetGame() {
		setPokemons([]);
		// setIds([]);
		setStart(false);
		//setIds(generateRandomPokemon(12));
	}

	const init = () => {
		setIds(generateRandomPokemon(12));
		setStart(true);
		cardContainerKey = uuidv4();
	};

	const handleClick = (event) => {
		const clickedId = event.target.id;
		const clickStatus = pokemons.find(
			(pokemon) => pokemon.id == clickedId
		).isClicked;

		if (clickStatus) {
			handleBestScore();
			alert("You lost! Your score is: " + currentScore);
			resetGame();
		} else {
			const modifiedArray = pokemons.map((pokemon) => {
				if (pokemon.id == clickedId) {
					return {
						...pokemon,
						isClicked: true,
					};
				} else {
					return pokemon;
				}
			});

			setPokemons(shuffle(modifiedArray));
			handleScoreIncrease();
			handleListIncrease(modifiedArray);
		}
	};
	if (start === false) {
		return (
			<>
				<Header></Header>
				<Score
					currentScore={currentScore}
					bestScore={bestScore}
				></Score>
				<div className="start">
					<button onClick={init}>Start</button>
				</div>
			</>
		);
	} else {
		return (
			<>
				<Header></Header>
				<Score
					currentScore={currentScore}
					bestScore={bestScore}
				></Score>
				<CardContainer
					key={cardContainerKey}
					pokemons={pokemons}
					handleClick={handleClick}
				></CardContainer>
			</>
		);
	}
}

export default App;
