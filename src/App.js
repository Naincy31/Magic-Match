import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card';

const cardImages = [
  { "src": "/img/biryani.png", matched: false },
  { "src": "/img/burger.png", matched: false },
  { "src": "/img/momo.png", matched: false },
  { "src": "/img/pizza.png", matched: false },
  { "src": "/img/spaghetti.png", matched: false },
  { "src": "/img/fried-chicken.png", matched: false },
]

function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  //duplicate each card once bcz we two of each card
  //shuffle cards randomize the order
  //random id to each of the 12 cards

  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))
    console.log(shuffleCards);
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffleCards)
    setTurns(0)
  }

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card): setChoiceOne(card)
  }

  //Compare two selected cards
  useEffect(() => {
    if(choiceOne && choiceTwo){
      setDisabled(true)
      if(choiceOne.src === choiceTwo.src && choiceOne.id !== choiceTwo.id){
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === choiceOne.src){
              return {...card, matched: true}
            }else{
              return card
            }
          })
        })
        resetTurn()
      }
      else{
        setTimeout(() => resetTurn(), 1000)
        
      }
    }
  }, [choiceOne, choiceTwo])

  console.log(cards);

  //reset choices and increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  //Star a new game automatically
  useEffect(() => {
    shuffleCards()
  }, [])

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className='card-grid'>{cards.map(card => (
        <Card 
          key = {card.id} 
          card = {card}
          handleChoice = {handleChoice}
          flipped = {card === choiceOne || card === choiceTwo || card.matched}
          disabled = {disabled}
        />
      ))}</div>
      <h3>Turns: {turns}</h3>
    </div>
  );
}

export default App;
