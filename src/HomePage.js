import { Link } from "react-router-dom";
import './HomePage.css'

export function HomePage(){
    return (
        <div className="HomePageContainer">
            <div className="Glass"></div>
            <nav>
                <div className="NavBlock"></div>
                <h1>Bacon MiniGames 🥓</h1>
                <Link className="NavBlock Login LoginLink" to="/login">Login</Link>
            </nav>
            <div className="MiniGameCardContainer">
                <div className="Knife">
                    <div className="KnifeCabe">
                        <div className="Hole"></div>
                    </div>
                    <Link className="MiniGameCard" to="/match">Match Game</Link>
                </div>
                <br/>
                <div className="Knife">
                    <div className="KnifeCabe">
                        <div className="Hole"></div>
                    </div>
                    <Link className="MiniGameCard" to="/wordrush" >Word rush</Link>
                </div>
            </div>
            <img className="ChefeImage" src="/Images/Chefe.png"></img>
            <footer>
                <div className="FooterCardContainer">
                    <div className="FooterCardLeft">
                        <strong>Project developed in:</strong> <br/>
                        <a href="https://www.ubi.pt/">Universidade da Beira Interior</a>
                    </div>
                    <div className="FooterCardRight">
                        <strong>Programmer, Artist and Game Design:</strong> <br/>
                        José Miguel Alves Melo dos Santos
                    </div>
                </div>
            </footer>
        </div>
    )
}