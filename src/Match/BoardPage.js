import { useEffect, useState } from "react";
import { Board } from "./Board";
import { TimerShow } from "../TimerShow";
import { Cheese, HamburgerBreadButtom, HamburgerBreadTop, Hamburguer } from "./MapBlock";
import { HAMBURGUER, CHEESE } from "./CheckWin";
import { PopupRolesMatchGame, PopupGameEnd } from "../PopUps/popup";
var RandomNewMinMeets = 0

//Images to Load in start time
const imagesPaths = [
    "/public/Images/Pão base.svg",
    "/public/Images/Pão topo.svg",
    "/public/Images/Cheese.svg",
    "/public/Images/Hamburguer.svg"
]

export function BoardPage(){
    const [clock,SetClok] = useState(120)
    const [score,SetScore] = useState(0)
    const [foods,setFoods] = useState([])
    const [loading,setLoading] = useState(true)
    const [popupState,setState] = useState(true)
    const [meets,setMeets] = useState(0)
    const [minMeets,setMinMeets] = useState(0)
    const meetsCollets = foods.filter((x) => x == HAMBURGUER)

    useEffect(() => {
        const dif = meets - minMeets
        RandomNewMinMeets = Math.floor(Math.random() * dif) + minMeets
    },[meets,minMeets])

    // Loading images process
    useEffect(() => {
        const loadImages = async () => {
            const load =  imagesPaths.map((imgsrc) => {
                new Promise((resolve,reject) => {
                    const img = new Image()
                    img.src = imgsrc
                    img.onload = resolve()
                    img.onerror = reject()
                })
            })

            try{
                await Promise.all(load)
                setLoading(false)
                console.log("Loading sucess!!!")
            } catch(erro){
                console.log(erro)
                setLoading(false)
            }
        }

        loadImages()
    },[])
    if (loading) return (<h1 style={{color: "white"}}>Loading...</h1>)
    // Ending Loading
    
    setTimeout(() => {if (!popupState) SetClok(clock - 0.050)},50)
    if (popupState) return ( <PopupRolesMatchGame setState={setState}/> )
    if (clock <= 0) return ( <PopupGameEnd/> )
    else return (
        <div className="GamePage">
            <TimerShow startTime={120} currentTime={clock.toFixed(2)}/>
            <div className="BoardContainer">
                <div className="Frigideira">
                    <Board score={score} setScore={SetScore} setFoods={setFoods} setMeets={setMeets} setMinMeets={setMinMeets}>
                    </Board>
                    <div className="Fire"></div>
                    <div className="Pega">
                        <div className="Cano">
                            <div className="CanoHope"></div>
                        </div>
                    </div>
                </div>
                <div className="InfoMatchSide">
                    <div className="MatchScoreContainer">
                        <span>Score Points:</span>
                        <br></br>
                        <span>{score}</span>
                    </div>
                    <div>
                        <span>Customer request</span>
                        <br/>
                        {
                            (() => {
                                if (meetsCollets.length >= RandomNewMinMeets && meetsCollets.length <= meets) return <span>{RandomNewMinMeets} - {meets} (meets) ✅</span>
                                else return <span>{RandomNewMinMeets} - {meets} (meets)</span>
                            })()
                        }
                    </div>
                    <div className="Plate">
                        <HamburgerBreadButtom/>
                        {
                            foods.map(x => {
                                if (x === HAMBURGUER) return <Hamburguer/>
                                else if (x === CHEESE) return <Cheese/>
                            })
                        }
                        <HamburgerBreadTop/>
                    </div>
                </div>
            </div>
        </div>
    )
}