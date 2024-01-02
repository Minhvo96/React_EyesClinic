import React from 'react'
import FormRegister from './FormRegister'
import { Link } from 'react-router-dom'



export default function Register() {
    return (
        <>
            <div style={{
                backgroundImage: 'url("images/background_2.jpg")',
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                height: "100vh",
                margin: 0,
            }} className=''>
                <div className="text-center">
                    <Link to='/'><img className="mt-3 mb-4" src='images/logo1.jpg' style={{ width: 200 }}></img></Link>
                </div>
                <FormRegister />
            </div >
        </>

    )
}
