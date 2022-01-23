import React, {useContext} from "react"
import {Context} from "../Context"

const LoginComponent = () => {
    const {setModalOpen} = useContext(Context)
    return (
        <div className="my-modal">
            <div className="inner">
                <h1>Header</h1>
                <button className="close-modal-btn" onClick={() => setModalOpen(false)}>X</button>
            </div>
        </div>
    )
}

export default LoginComponent