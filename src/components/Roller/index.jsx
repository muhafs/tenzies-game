/* eslint-disable react/prop-types */
import './style.css'

export default function Roller({ atRoll, atWin }) {
	return (
		<button onClick={atRoll} className="roller">
			{atWin ? 'New Game' : 'Roll'}
		</button>
	)
}
