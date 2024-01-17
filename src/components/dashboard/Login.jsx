import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import addStyleDashboard from '../../AddStyleDashboard'
import authService from '../../services/authServices';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuthContext } from '../../context/AuthProvider';


export default function Login() {

    addStyleDashboard();

    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [errorLogin, setErrorLogin] = useState("");

    const navigate = useNavigate();
    const auth = useAuthContext();

    const authLogin = async (data) => {
        const token = await authService.login(data)
        if (token) {
            return token;
        }
        return null;
    }

    const registerSchema = yup.object({
        phoneNumber: yup.string().required('Vui lòng nhập số điện thoại'),
        password: yup.string().required('Vui lòng nhập mật khẩu')
    })

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(registerSchema)
    })

    const handleSubmitForm = async () => {
        const user = {
            phoneNumber: phoneNumber,
            password: password,
        }
        authLogin(user)
            .then((token) => {
                if(typeof token !== "object" && token !== null){
                    auth.login(token);
                    navigate('/dashboard/waiting-list');
                } else {
                    setErrorLogin(token.password)
                }           
            })
            .catch((error) => {
                // Handle errors from authLogin
                console.error('Error during authentication:', error);
            });
    }

    const handleChangePhoneNumber = (e) => {
        const phoneNumber = String(e.target.value)
        setPhoneNumber(phoneNumber)
        setErrorLogin("")
    }

    const handleChangePassword = (e) => {
        const password = String(e.target.value)
        setPassword(password)
        setErrorLogin("")
    }

    return (
        <>
            <div
                className="page-wrapper"
                id="main-wrapper"
                data-layout="vertical"
                data-navbarbg="skin6"
                data-sidebartype="full"
                data-sidebar-position="fixed"
                data-header-position="fixed"
            >
                <div className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
                    <div className="row justify-content-end w-100">
                        <div className='body-wrapper'>
                            <div className='container-fluid' style={{ paddingTop: "0px", paddingBottom: "0px" }}>
                                <div className="card mb-0 row" style={{ flexDirection: 'row' }}>

                                    <div className="card-body col-4">
                                        <div                                        
                                            className="text-nowrap logo-img text-center d-block py-3 w-100 mb-3"
                                        >
                                            <img
                                                src="../../images/logo2.png"
                                                width={280}
                                                alt=""
                                            />
                                        </div>
                                        
                                        <form onSubmit={handleSubmit(handleSubmitForm)}>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label">
                                                    Số điện thoại
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control mb-2"
                                                    id="exampleInputEmail1"
                                                    aria-describedby="emailHelp"
                                                    name='phoneNumber'
                                                    value={phoneNumber}
                                                    {...register("phoneNumber")}
                                                    onInput={handleChangePhoneNumber}
                                                />
                                                <span className="text-danger font-weight-bold">{errors?.phoneNumber?.message}</span>
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="exampleInputPassword1" className="form-label">
                                                    Mật khẩu
                                                </label>
                                                <input
                                                    type="password"
                                                    className="form-control mb-2"
                                                    id="exampleInputPassword1"
                                                    name='password'
                                                    value={password}
                                                    {...register("password")}
                                                    onInput={handleChangePassword}
                                                />
                                                <span className="text-danger font-weight-bold">{errors?.password?.message}</span>
                                                <span className="text-danger font-weight-bold">{errorLogin}</span>
                                            </div>
                                            
                                            <button
                                                type='submit'
                                                className="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2"
                                            >
                                                Đăng nhập
                                            </button>

                                        </form>
                                    </div>
                                    <div className='card-body col-8' style={{
                                        backgroundImage: 'url("images/BSMinh3.jpg")',
                                        backgroundPosition: "center",
                                        backgroundRepeat: "",
                                        backgroundSize: "cover",
                                        backgroundPositionX: "-400px",
                                        borderRadius: "0 0.25rem 0.25rem 0"
                                    }}>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
