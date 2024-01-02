import React from 'react'
import FormLogin from './FormLogin'
import { Link } from 'react-router-dom'


export default function Login() {
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
                    <Link to='/'><img className=" mb-5" src='images/logo1.jpg' style={{ width: 200, marginTop: 200 }} /></Link>
                </div>
                <FormLogin />
            </div >
        </>
    )
}
