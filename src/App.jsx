import './App.css'
import { useEffect, useState } from 'react'
import { useWindowSize } from '@uidotdev/usehooks'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import Dice from './components/Dice'
import Header from './components/Header'
import Roller from './components/Roller'
import Nav from './components/Nav'

function App() {
	const [dices, setDices] = useState(newDice())
	const [tenzies, setTenzies] = useState(false)
	const [counter, setCounter] = useState(0)
	const { width, height } = useWindowSize()

	useEffect(() => {
		const allHeld = dices.every((d) => d.isHeld)
		const allSame = dices.every((d) => d.value == dices[0].value)

		if (allHeld && allSame) {
			setTenzies(true)
			console.log('You won!')
		}
	}, [dices])

	function newDice() {
		let dices = []
		for (let i = 0; i < 10; i++) {
			dices.push({
				id: nanoid(),
				value: Math.ceil(Math.random() * 6),
				isHeld: false,
			})
		}

		return dices
	}

	function rollDice() {
		if (tenzies) {
			setDices(newDice())
			setTenzies(false)
			setCounter(0)
		} else {
			setDices((prev) => prev.map((dice) => (dice.isHeld ? dice : { id: nanoid(), value: Math.ceil(Math.random() * 6), isHeld: false })))
			setCounter((prev) => prev + 1)
		}
	}

	function holdDice(id) {
		setDices((prev) => prev.map((dice) => (dice.id == id ? { ...dice, isHeld: !dice.isHeld } : dice)))
	}

	return (
		<main className="card">
			<Nav counter={counter} />
			<Header />

			<div className="content">
				{dices.map((dice) => (
					<Dice key={dice.id} value={dice.value} isActive={dice.isHeld} hold={() => holdDice(dice.id)} />
				))}
			</div>

			<Roller atRoll={rollDice} atWin={tenzies} />
			{tenzies && <Confetti width={width} height={height} />}
		</main>
	)
}

export default App
