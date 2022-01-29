import React, {useState, useContext, useEffect} from "react"
import {Context} from "../Context"
import {Link} from "react-router-dom"

const ForgotPasswordComponent = () => {
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const {setModalOpen, reset} = useContext(Context)

    useEffect(() => {
        window.scrollTo(0, 0)
    },[])

    const handleSubmit = async(e) => {
        e.preventDefault()
        setError("")
        setSuccess("")
        try {
            await reset(email)
                .then(() => setSuccess("Please check your inbox to reset your password"))
                .catch((error) => {setError(error.message.slice(9, error.message.length))})

        } catch {
            setError("Failed to reset password")
        }
    }

    return (
        <>
            <h2>Reset Password</h2>
            <hr className="hr" />
            <div className="signup-error">{error ? error : null}</div>
            <div className="success">{success ? success : null}</div>
            <form className="reset-form" onSubmit={(e) => handleSubmit(e)}>
                <input 
                    className="my-shadow" 
                    type="text" 
                    value={email} 
                    placeholder="Email" 
                    onChange={(e) => {
                        setError("")
                        setEmail(e.target.value)
                    }}
                    required
                />
                <button className="my-shadow login-btn" type="submit">Reset password</button>
            </form>
            <div className="d-flex flex-row justify-content-center">
                <div>Remember your password?&nbsp;&nbsp;</div><Link to="/signup" onClick={() => setModalOpen(true)}>Login</Link>
            </div>
        </>
    )
}

export default ForgotPasswordComponent