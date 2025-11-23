import "./WordRush.css"

export function WordCard( { Word, posX } ){
    const style = {
        right: posX + "%"
    }
    return (
        <div className="WordCard" style={style}>{Word}</div>
    )
}