import "../stylesheets/Score.css";

export function Score({ currentScore = 0, bestScore = 0 }) {
	return (
		<>
			<p className="score">Current score: {currentScore}</p>
			<p className="score">Best score: {bestScore}</p>
		</>
	);
}
