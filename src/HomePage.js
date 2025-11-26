import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import './HomePage.css'

export function HomePage(){
    const userCookie = Cookies.get("user")
    const user = userCookie != undefined ? JSON.parse(userCookie) : undefined
    const login = user !== undefined

    function Logout(){
        Cookies.remove("user")
        window.location.reload()
    }

    return (
        <div className="HomePageContainer">
            <div className="Glass"></div>
            <nav>
                <div className="NavBlock"></div>
                <h1>Bacon MiniGames 🥓</h1>
                {
                    login ? <div className="NavBlock Login LoginLink" onClick={Logout}>{user.name} <br/> Logout </div> : <Link className="NavBlock Login LoginLink" to="/login">Login</Link>
                }
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