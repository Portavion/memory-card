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
					// eslint-disable-next-line react/no-unknown-property
					isClicked={isClicked}
					id={id}
				/>
			</div>
		</>
	);
}
