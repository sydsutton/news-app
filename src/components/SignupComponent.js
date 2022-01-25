import React, {useContext, useState} from 'react';
import {Link, useNavigate} from "react-router-dom"
import {Context} from "../Context"

const SignupComponent = () => {
    const {setModalOpen, signup} = useContext(Context)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            setError("Please make sure your passwords match")
        } else if (password === confirmPassword && password.length < 6){
            setError("You password must be at least 6 characters")
        } else {
            try {
                setError("")
                await signup(email, password)
                navigate("/")
            } catch {
                setError("Failed to create an account")
            }   
        }
        
    }

    return (
        <div className="signup-container">
            <h2 className="letter-spacing">Sign Up</h2>
            <hr className="hr mb-2"/>
            <div className="signup-error">{error ? error : null}</div>
            <form className="login-form" onSubmit={handleSubmit}>
                <input 
                    className="my-shadow" 
                    type="email" 
                    value={email} 
                    placeholder="Email" 
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input 
                    className="my-shadow" 
                    type="password" 
                    value={password} 
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input 
                    className="my-shadow" 
                    type="password" 
                    value={confirmPassword} 
                    placeholder="Confirm Password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button className="my-shadow login-btn" type="submit">Sign Up</button>
            </form>
            <div className="alt-login">
                <p>Already have an account?</p>
                <Link to="/" onClick={() => setModalOpen(true)}><p>Login</p></Link>
                <hr className="hr mb-3"/>
            </div>
            <button className="close-modal-btn" onClick={() => setModalOpen(false)}>X</button>
        </div>
    )
}

export default SignupComponent;