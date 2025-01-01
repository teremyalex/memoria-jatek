import ReactLogo from './assets/img/react.svg';
import {useEffect} from "react";

function Card({ cards, setCards, game, setGame, move, setMove, theme }) {



    function flip(index){

        let match = cards.filter(card => card.isFlipped && !card.isMatched);

        if(!cards[index].isFlipped && match.length < 2 && game) {
            let newCards = [...cards];
            newCards[index] = {...newCards[index], isFlipped: true};
            setCards(newCards);
        }
    }

    useEffect(() => {
        if(!game) return;
        let match = cards.filter(card => card.isFlipped && !card.isMatched);
        console.table(match);
        if(match.length > 1) {
            setMove(prevMove => prevMove+1)
            if (match[0].value == match[1].value) {
                setCards(prevCards => prevCards.map(card => card.isFlipped ? { ...card, isMatched: true } : card))
            } else {
                setTimeout(()=>{
                    setCards(prevCards => prevCards.map(card => ({ ...card, isFlipped: false })));
                }, 1000)
            }
        }
    }, [cards, game]);

    return (
        <>
            <div className={`board ${theme == "dark" ? "dark" : ""}`}>
                {cards.map((card, index)=> <div key={card.id} className={`card ${theme == "dark" ? "dark" : ""}`} onClick={()=>flip(index)}>
                    <div className={`color ${card.isFlipped || card.isMatched ? 'flip' : ''}`} style={{background: card.value}}></div>
                    <div className={`backface ${card.isFlipped || card.isMatched ? 'flip' : ''} ${theme == "dark" ? "dark" : ""}`}>
                        <img src={ReactLogo}/></div>
                </div>)}
            </div>
        </>
    )
}

export default Card;