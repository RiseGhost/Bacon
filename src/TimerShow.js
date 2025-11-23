import './ShowTime.css'

export function TimerShow({startTime,currentTime}){
    return (
        <div className="ShowTime">
            <progress max={startTime} value={currentTime}></progress>
            <span>{currentTime}</span>
        </div>
    )
}