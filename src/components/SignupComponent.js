import React, {useContext, useState, useEffect } from 'react';
import {Link, useNavigate} from "react-router-dom"
import {AiOutlineCheck} from "react-icons/ai"
import {BsX} from "react-icons/bs"
import {Context} from "../Context"

const SignupComponent = () => {
    const {setModalOpen, signup} = useContext(Context)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const navigate = useNavigate()

    useEffect(()=> {
        window.scrollTo(0, 0);
    }, [])

    const checkPass = (str) => {
        const specialChar = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
        return specialChar.test(str)
    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        if(password !== confirmPassword || password === confirmPassword && password.length < 6 || !checkPass(password)){
            console.log("Error")
        } else {
            try {
                setError("")
                await signup(email, password)
                    .then(() => {
                        navigate("/")
                        setModalOpen(true)
                    })
                    .catch((error) => {setError(error.message.slice(9, error.message.length))})
            } catch {
                setError("Failed to create an account")
            }   
        }
        
    }

    return (
        <div className="signup-container">
            <h2 className="letter-spacing">Sign Up</h2>
            <hr className="hr mb-2"/>
            <div className="signup-error mb-3">{error ? error : null}</div>

            <div className="small">
                <div className={password.length > 6 ? `text-success` : `text-secondary`}>
                    <div className="d-flex flex-row align-items-center justify-content-center">
                        {password.length > 6 ? 
                            <><AiOutlineCheck size={20} className="mr-3" />Password must be at least 6 characters long</>
                            : 
                            <><BsX size={15} className="mr-3"/>Password must be at least 6 characters long</>
                        }
                    </div>
                </div>
                <div className={checkPass(password) ? `text-success` : `text-secondary`}>
                    {checkPass(password)  ? 
                        <><AiOutlineCheck size={20} className="mr-3" />Password must include at least one special character</>
                        : 
                        <><BsX size={15} className="mr-3"/>Password must include at least one special character</>
                        }
                </div>
                <div className={password !== "" && password === confirmPassword ? `text-success` : `text-secondary`}>
                    {password !== "" && password === confirmPassword  ? 
                        <><AiOutlineCheck size={20} className="mr-3" />Password and confirmation password must match</>
                        : 
                        <><BsX size={15} className="mr-3"/>Password and confirmation password must match</>
                        }
                </div>
            </div>
            
            <div className="mt-3 d-flex flex-row justify-content-evenly alt-login">
                <div>Already have an account?</div>
                <Link to="/" className="link" onClick={() => setModalOpen(true)}>Login</Link>
            </div>
            
            <form className="login-form" onSubmit={handleSubmit}>
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
                <input 
                    className="my-shadow" 
                    type="password" 
                    value={password} 
                    placeholder="Password"
                    onChange={(e) => {
                        setError("")
                        setPassword(e.target.value)
                    }}
                    required
                />
                <input 
                    className="my-shadow" 
                    type="password" 
                    value={confirmPassword} 
                    placeholder="Confirm Password"
                    onChange={(e) => {
                        setError("")
                        setConfirmPassword(e.target.value)
                    }}
                    required
                />
                <button className="my-shadow login-btn" type="submit">Sign Up</button>
            </form>
            <button className="close-modal-btn" onClick={() => setModalOpen(false)}>X</button>
            <hr className="hr mb-3"/>
        </div>
    )
}

export default SignupComponent;