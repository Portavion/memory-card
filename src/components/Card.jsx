import "../stylesheets/Card.css";

export function Card({
	pokemonImg = "",
	pokemonName = "test",
	handleClick,
	isClicked,
	id,
}) {
	return (
		<>
			<div className={`card`}>
				<img
					src={pokemonImg}
					alt={pokemonName}
					onClick={handleClick}
					isClicked={isClicked}
					id={id}
				/>
			</div>
		</>
	);
}
