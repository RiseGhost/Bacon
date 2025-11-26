import { useState } from 'react'
import { Link } from 'react-router-dom';
import { CreateNewUser, CreateUserDataObject, UserExist, getUser } from '../db/firebase';
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import './login.css'
import '../HomePage.css'

export function LoginPage() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: "",
        password: ""
    });

    function handleChange(e) {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const user = CreateUserDataObject(formData.name, formData.password)
        const exist = await UserExist(user.name)
        if (exist === true){
            const savedUser = await getUser(user.name,user.password)
            if (savedUser === undefined){
                alert("Password incorret")
                return
            }
            Cookies.set("user",JSON.stringify(savedUser))
            navigate("/")
            return
        }
        const success = await CreateNewUser(user)
        if (!success){}
        if (success) {
            Cookies.set("user",JSON.stringify(user))
            navigate("/")
        }
        setFormData({name:"",password:""})
    }

    return (
        <div className='HomePageContainer'>
            <div className="Glass"></div>
            <nav>
                <div className="NavBlock"></div>
                <h1>Bacon MiniGames 🥓</h1>
                <Link className="NavBlock Login LoginLink" to="/login">Login</Link>
            </nav>
            <div className='FormContainer'>
                <form onSubmit={handleSubmit}>
                    <h1>Login/Register</h1>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder='nick name'
                    />

                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder='password'
                    />

                    <button type="submit">Enviar</button>
                    <br/>
                </form>
            </div>
        </div>
    );
}