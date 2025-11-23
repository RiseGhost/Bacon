export function MapBlockEmpty(props){
    return (
        <div className="MapBlockEmpty" onClick={props.onClick} style={props.style}></div>
    )
}

export function MapBlockVisited(props){
    return(
        <div className="MapBlockVisited" onClick={props.onClick} style={props.style}></div>
    )
}

export function Burned(props){
    return (
        <div className="BurnedBlock" style={props.style}></div>
    )
}

export function CheeseCell(props){
    return(
        <div className="CheeseCell" style={props.style}></div>
    )
}

export function StartCell(props){
    return (
        <div className="MapBlockEmpty Start" style={props.style}></div>
    )
}

export function EndCell(props){
    return (
        <div className="MapBlockEmpty End" style={props.style}></div>
    )
}

export function HamburgerBreadButtom(){
    return (
        <div className="HamburgerBreadBottom"/>
    )
}

export function HamburgerBreadTop(){
    return (
        <div className="HamburgerBreadTop"/>
    )
}

export function Hamburguer(){
    return (
        <div className="Hamburger"/>
    )
}

export function Cheese(){
    return (
        <div className="Cheese"/>
    )
}