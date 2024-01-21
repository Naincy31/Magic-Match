import { useState } from 'react';
import './App.css';

const cardImages = [
  { "src": "/img/biryani.png" },
  { "src": "/img/burger.png" },
  { "src": "/img/momo.png" },
  { "src": "/img/pizza.png" },
  { "src": "/img/spaghetti.png" },
  { "src": "/img/fried-chicken.png" },
]

function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)

  //duplicate each card once bcz we two of each card
  //shuffle cards randomize the order
  //random id to each of the 12 cards

  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

    setCards(shuffleCards)
    setTurns(0)
  }

  console.log(cards, turns);

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className='card-grid'>{cards.map(card => (
        <div className='card' key={card.id}>
          <div>
            <img className='front' src ={card.src} alt='card front'/>
            <img className='back' src='/img/cover.jpg' alt='card back'/>
          </div>
        </div>
      ))}</div>
    </div>
  );
}

export default App;
