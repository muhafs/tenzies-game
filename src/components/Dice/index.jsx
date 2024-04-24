/* eslint-disable react/prop-types */
import './style.css'

export default function Dice(props) {
	return (
		<button onClick={props.hold} className={`number${props.isActive ? ' active' : ''}`}>
			{props.value}
		</button>
	)
}
