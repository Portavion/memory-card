import { Card } from "./Card";
import "../stylesheets/CardContainer.css";
import { useEffect, useState } from "react";

export function CardContainer({
	handleScoreIncrease,
	handleBestScore,
	initialArray,
}) {
	const [pokemons, setPokemons] = useState([]);
	const [ids, setIds] = useState(initialArray);

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
			img: json.sprites.versions["generation-vii"]["ultra-sun-ultra-moon"]
				.front_default,
			isClicked: false,
		};
		setPokemons((pokemons) => shuffle([...pokemons, newPokemon]));
	};

	useEffect(() => {
		for (let i in ids) {
			fetchPokemon(ids[i]);
		}
	}, [ids]);

	function handleClick(event) {
		const clickedId = event.target.id;
		const clickStatus = pokemons.find(
			(pokemon) => pokemon.id == clickedId
		).isClicked;

		if (clickStatus) {
			handleBestScore();
			setPokemons([]);
			setIds(generateRandomPokemon(12));
			alert("already clicked you lost");
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
	}

	function handleListIncrease(array) {
		const pokemonClicked = array.filter(
			(pokemon) => pokemon.isClicked === true
		).length;
		const pokemonTotal = array.length;
		const pokemonUnclicked = pokemonTotal - pokemonClicked;

		console.log(pokemonUnclicked + "left");

		if (pokemonUnclicked < 4) {
			setIds(generateRandomPokemon(4));
		}
	}

	function generateRandomPokemon(amount) {
		const maxPokemonNb = 151;
		const arrayPokemonIds = pokemons.map((pokemon) => pokemon.id);
		let newIds = [];
		let counter = 0;

		while (counter < amount) {
			let randomId = Math.floor(Math.random() * maxPokemonNb + 1);

			if (arrayPokemonIds.includes(randomId) === false) {
				newIds.push(randomId);
				counter = counter + 1;
			}
		}

		return shuffle(newIds);
	}

	const cards = pokemons.map((pokemon) => (
		<Card
			key={pokemon.id}
			id={pokemon.id}
			pokemonImg={pokemon.img}
			pokemonName={pokemon.name}
			handleClick={handleClick}
			isClicked={pokemon.isClicked}
		></Card>
	));

	return <div className="card-container">{cards}</div>;
}

function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

		// swap elements array[i] and array[j]
		// we use "destructuring assignment" syntax to achieve that
		// you'll find more details about that syntax in later chapters
		// same can be written as:
		// let t = array[i]; array[i] = array[j]; array[j] = t
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}
