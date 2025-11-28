import { useEffect, useRef, useState } from 'react'
import './WordRush.css'
import '../App.css'
import data from './words.json'
import { WordCard } from './wordCard'
import { PopupRolesWordRush, PopupGameEnd } from '../PopUps/popup'
import { UpdateWordRushGameScore } from '../db/firebase'
let phasers = 0
let currentPhaser = []
let themeSelect = ""
const TimeToDestroyWords = 5600

function selectRandomTheme(){
    const obj = Object.keys(data.themes)
    const themeIndex = Math.floor(Math.random() * obj.length)
    const theme = obj[themeIndex]
    return theme
}

function getNextWords(theme){
    if (phasers >= Object.keys(theme).length) return undefined
    if (currentPhaser.length === 0 && phasers < Object.keys(theme).length - 1){
        phasers++
        currentPhaser = theme[phasers].phasers.split(" ")
    }
    return currentPhaser.shift()
}

export function WordsContainer(){
    const [words,setWords] = useState([])
    const [playerInput,setPlayerInput] = useState("")
    const [popupState, setPopupState] = useState(true)
    const [updateWords, setUpdateWords] = useState(0)
    const [score, setScore] = useState(0)
    const [finished, setFinished] = useState(false)
    const [save, setSave] = useState(false)
    const inputRef = useRef(null)

    if (themeSelect === "") themeSelect = selectRandomTheme()
    
    useEffect(() => {
        const update = setInterval(() => setUpdateWords(prev => prev + 1),500)
        return () => clearInterval(update)
    },[])
    
    useEffect(() => {
            if (popupState){
                phasers = 0
                currentPhaser = []
                return
            }
            inputRef.current?.focus()
            const spawn = setInterval(() => {
                const word = getNextWords(data.themes[themeSelect])
                setWords(prev => [...prev,{ "word": word, "right": (Math.floor(Math.random() * 40) + 5), "createAt": Date.now()}])
            },1000)
            return () => clearInterval(spawn)
        }
    ,[popupState])

    useEffect(() => {setWords(words.filter((x) => Date.now() - x.createAt < TimeToDestroyWords))},[updateWords])
    useEffect(() => {
        if (words.length === 0) return
        const first = words[0]
        if (first.word === undefined) setFinished(true)
    },[words])

    useEffect(() => {
        if (!words[0] || !words[0].word) return
        if (playerInput.toLowerCase() !== words[0].word.toLowerCase()) return
        setPlayerInput("")
        setWords(words.slice(1))
        setScore(score + 100)
    },[playerInput,words])

    if (popupState) return <PopupRolesWordRush setState={setPopupState}/>
    if (finished){
        if (!save){
            UpdateWordRushGameScore(score)
            setSave(true)
        }
        return <PopupGameEnd/>
    }
    return (
        <div className='GamePage'>
            <div className='WordsContainer'>
                <div className='NoteBookContainer'>
                    <div className='RingsContainer'>
                        {
                            Array(Math.floor(((window.innerWidth/2) * 0.45)/45)).fill(null).map((x) => <div className='Ring'></div>)
                        }
                    </div>
                    <div className='Page'>
                        <span> <strong>Score:</strong> {String(score).padStart(3,"0")} </span>
                    </div>
                </div>
                <div className='WordCascade'>
                    {
                        words.map((x) => <WordCard key={x.createAt} Word={x.word} posX={x.right} />)
                    }
                </div>
            </div>
            <div className='PlayerInputContainer'>
                <input className='PlayerInput'
                    ref={inputRef}
                    type='text'
                    value={playerInput}
                    onChange={(event) => setPlayerInput(event.target.value)}
                    placeholder='Write here'
                ></input>
            </div>
        </div>
    )
}