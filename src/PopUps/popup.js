import './popup.css'
import './matchAnimator.css'
import './wordrushAnimator.css'
import { useNavigate } from 'react-router-dom'

/*
state = false if popup is closed (finish)
state = true if popup is open
*/
export function Popup({btnFunc, children, btnText}){
    return (
        <div className='popupContainer'>
            <div className='popup'>
                <div className='popupContent'>
                    {children}
                    <button onClick={btnFunc}>{btnText}</button>
                </div>
            </div>
        </div>
    )
}

export function PopupRolesMatchGame({setState}){
    return (
        <Popup btnFunc={() => setState(false)} btnText={"Let's play"}>
            <h1 className='PopupTittle'>Game Rules</h1>
                <div className='example'>
                <img src='/Images/Pão base.svg'/>
                <img className='Meet1' src='/Images/Hamburguer.svg'/>
                <img className='Meet2' src='/Images/Hamburguer.svg'/>
                <img src='/Images/Pão topo.svg'/>
            </div>
            <span>
                Connect the two slices of bread <strong>through the burger meat</strong>.
                <br/>
                <span className='SpawnWithImages'>
                    <table>
                        <tr>
                            <td><span>Meats that have cheese in the spaces around them give extra points.</span></td>
                            <th><img className='InfoTextImage' src="./Images/Cheese.svg"/> </th>
                        </tr>
                    </table>
                </span>
            </span>
        </Popup>
    )
}

export function PopupRolesWordRush({setState}){
    return (
        <Popup btnFunc={() => setState(false)} btnText={"Let's play"}>
            <h1 className='PopupTittle'>Game Rule</h1>
            <div className='ContainerWordsDrop'>
                <div className='ExampleWord1'>Hamburguer</div>
                <div className='ExampleWord2'>Hotdog</div>
                <div className='ExampleWord3'>Cheese</div>
            </div>
            <span>
                I'll be <strong>dropping food orders</strong>.
                <br/>
                Your mission as an attendant is to take note of as many orders as possible.
                <br/>
                Words written in uppercase or lowecase are counted the same way.
            </span>
        </Popup>
    )
}

export function PopupGameEnd(){
    const navigate = useNavigate()

    return (
        <Popup btnFunc={() => navigate("/")} btnText={"Back Menu"}>
            <h1 className='PopupTittle'>End Game</h1>
        </Popup>
    )
}