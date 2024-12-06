import { Card } from "./Card";
import "../stylesheets/CardContainer.css";
// import { useEffect, useState } from "react";

export function CardContainer({ pokemons, handleClick }) {
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
