import React, {useContext, useState, useRef} from "react"
import {Link} from "react-router-dom"
import {Context} from "../Context"

const LoginComponent = () => {
    const {setModalOpen} = useContext(Context)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const emailRef = useRef() 
    const passwordRef = useRef() 
    const confirmPasswordRef = useRef()

    const handleSubmit = (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            setError("Please make sure your passwords match")
        } else {
            setError("")
        }
    }

    return (
        <div className="my-modal">
            <div className="inner my-shadow">
                <h1>Sign Up</h1>
                <hr className="hr"/>
                <div className="signup-error">{error ? error : null}</div>
                <form className="login-form" onSubmit={handleSubmit}>
                    <input 
                        className="my-shadow" 
                        type="email" 
                        value={username} 
                        placeholder="Email" 
                        onChange={(e) => setUsername(e.target.value)}
                        ref={emailRef}
                        required
                    />
                    <input 
                        className="my-shadow" 
                        type="password" 
                        value={password} 
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        ref={passwordRef}
                        required
                    />
                    <input 
                        className="my-shadow" 
                        type="password" 
                        value={confirmPassword} 
                        placeholder="Confirm Password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        ref={confirmPasswordRef}
                        required
                    />
                    <button className="my-shadow login-btn" type="submit">Sign Up</button>
                </form>
                <div className="alt-login">
                    <p>Already have an account?</p>
                    <Link to=""><p>Login</p></Link>
                    <hr className="hr mb-3"/>
                </div>
                <button className="close-modal-btn" onClick={() => setModalOpen(false)}>X</button>
            </div>
        </div>
    )
}

export default LoginComponent