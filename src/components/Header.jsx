import pokeballLogo from "../assets/3.svg";
import "../stylesheets/Header.css";

export function Header() {
	return (
		<>
			<h1>
				<img src={pokeballLogo} className="logo" alt="Pokeball logo" />
				Pokemon Memory Game
			</h1>
			<p className="instructions">
				Get points by clicking on a pokemon card but don&apos;t click on
				any more than once!
			</p>
		</>
	);
}
