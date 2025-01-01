import Card from './Card.jsx'

import {useState, useEffect, useRef} from 'react'


function App() {

    let colors = ["#da3e92", "#187dd8",  "#d30d0d", "#da3e92", "#9f41ae", "#5ab194", "#592717", "#d30d0d", "#9f41ae", "#ddbe1b",  "#5ab194", "#e4640b", "#e4640b", "#187dd8", "#592717", "#ddbe1b"];
    let [cards, setCards] = useState([]);
    let [game, setGame] = useState(false);
    let [time, setTime] = useState(0);
    let [move, setMove] = useState(0);
    let [theme, setTheme] = useState(localStorage.getItem('theme') || "light");
    let [gamemode, setGamemode] = useState(localStorage.getItem('gamemode') || "easy");
    let sec = time % 60;
    let minute = Math.floor((time / 60) % 60);
    let hour = Math.floor((time / 3600) % 60);
    let intervalId;

    useEffect(() => {
        setCards(colors.sort(() => Math.random() - 0.5).map((color, index)=> color ? {id: index+1, value: color, isFlipped: false, isMatched: false} : null));
    }, []);

    function newGame(){
        setGame(false)
        clearInterval(intervalId)
        setTime(0)
        setMove(0)

        if(gamemode == "easy") {
            setCards(colors.sort(() => Math.random() - 0.5).map((color, index)=> color ? {id: index+1, value: color, isFlipped: true, isMatched: false} : null));
            setTimeout(() => {
                setCards(prevCards => prevCards.map(card => ({...card, isFlipped: false})));
                setGame(true);
            }, 3501)
        } else {
            setCards(prevCards => prevCards.map(card => ({...card, isFlipped: false, isMatched: false})));
            setTimeout(() => {
                setCards(colors.sort(() => Math.random() - 0.5).map((color, index)=> color ? {id: index+1, value: color, isFlipped: false, isMatched: false} : null));
                setGame(true);
            }, 501)
        }
    }
    useEffect(() => {
        if (game) {
            intervalId = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [game]);

    useEffect(() => {
        if (!cards.find(card => !card.isMatched)) {
            setGame(false);
        }
    }, [cards]);

    function themeChange(){
        setTheme(prevTheme => prevTheme === "light" ? "dark" : "light");
    }
    useEffect(() => {
        if (theme === "dark") document.body.classList.add("dark")
        else document.body.classList.remove("dark")
        localStorage.setItem('theme', theme);
    }, [theme]);

    function gamemodeChange(){
        const newGamemode = gamemode === "easy" ? "hard" : "easy";
        setGamemode(newGamemode);
        localStorage.setItem('gamemode', newGamemode);
    }


    return (
        <>
            <div className="switches">
                <div className={`switch ${theme == "dark" ? "dark" : ""}`} onClick={themeChange}>
                    <div className={`switch-button ${theme == "dark" ? "dark move" : ""}`}></div>
                    <div className={`switch-title ${theme == "dark" ? "dark move" : ""}`}>{theme == "dark" ? "dark" : "light"}</div>
                </div>

                <div className={`switch ${theme == "dark" ? "dark" : ""}`} onClick={gamemodeChange}>
                    <div className={`switch-button ${theme == "dark" ? "dark" : ""} ${gamemode == "hard" ? "move" : ""}`}></div>
                    <div className={`switch-title ${theme == "dark" ? "dark" : ""} ${gamemode == "hard" ? "move" : ""}`}>{gamemode == "hard" ? "hard" : "easy"}</div>
                </div>
            </div>

            {!cards.find(card => !card.isMatched) ? <p className={`win ${theme == "dark" ? "dark" : ""}`}>Gratulálok, nyertél!</p> : <p></p>}
            <div className="ui">
                <div className="buttons">
                    <button onClick={newGame} className={theme == "dark" ? "dark" : ""}>Új játék</button>
                </div>
                <div className="stat">
                    <div className={`counter ${theme == "dark" ? "dark" : ""}`}>Forgatások: <span>{move}</span>
                    </div>
                    <div
                        className={`timer ${theme == "dark" ? "dark" : ""}`}>{hour < 10 ? "0" + hour : hour}:{minute < 10 ? "0" + minute : minute}:{sec < 10 ? "0" + sec : sec}</div>
                </div>
            </div>
            <Card cards={cards} setCards={setCards} game={game} setGame={setGame} move={move} setMove={setMove} theme={theme} />
        </>
    )
}

export default App;