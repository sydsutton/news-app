import React, {useContext, useState} from "react"
import {Context} from "../Context"

const LoginComponent = () => {
    const {setModalOpen} = useContext(Context)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    return (
        <div className="my-modal">
            <div className="inner my-shadow">
                <h1>Log In</h1>
                <hr className="hr"/>
                <form className="login-form">
                    <input 
                        className="my-shadow" 
                        type="text" 
                        value={username} 
                        placeholder="Username" 
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input 
                        className="my-shadow" 
                        type="password" 
                        value={password} 
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="my-shadow login-btn" type="submit">Log In</button>
                </form>
                <div className="alt-login">
                    <p>Don't have an account?</p>
                    <hr className="hr mb-3"/>
                    <div className="btn-group">
                        <button>Create an account</button>
                        <button>Log in with Google</button>
                        <button>Log in with Facebook</button>
                    </div>
                </div>
                <button className="close-modal-btn" onClick={() => setModalOpen(false)}>X</button>
            </div>
        </div>
    )
}

export default LoginComponent