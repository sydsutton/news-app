import React, {useState, useContext} from "react"
import {Context} from "../Context"
import {Link} from "react-router-dom"

const ForgotPasswordComponent = () => {
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const {setModalOpen, reset} = useContext(Context)

    const handleSubmit = async(e) => {
        e.preventDefault()
        setError("")
        setSuccess("")
        try {
            await reset(email)
            setSuccess("Please check your inbox to reset your password")
        } catch {
            setError("Failed to reset password")
        }
    }

    return (
        <div>
            <h2>Reset Password</h2>
            <hr className="hr" />
            <div className="signup-error">{error ? error : null}</div>
            <div className="success">{success ? success : null}</div>
            <form className="reset-form" onSubmit={(e) => handleSubmit(e)}>
                <input 
                    className="my-shadow" 
                    type="email" 
                    value={email} 
                    placeholder="Email" 
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button className="my-shadow login-btn" type="submit">Reset password</button>
            </form>
            <Link to="/signup" onClick={() => setModalOpen(true)}>Login</Link>
        </div>
    )
}

export default ForgotPasswordComponent