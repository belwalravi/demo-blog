import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import SearchForm from './SearchForm';
import '../../Css/Header.css'
import { RiPencilFill } from 'react-icons/ri'
import { FaUserEdit } from 'react-icons/fa'
import { BiLogOut } from 'react-icons/bi'
import { BsBookmarks } from 'react-icons/bs'
import SkeletonElement from '../Skeletons/SkeletonElement';
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';
import Cookies from 'js-cookie';

const Header = () => {
    const bool = localStorage.getItem("authToken") ? true : false
    const [auth, setAuth] = useState(bool)
    const { activeUser } = useContext(AuthContext)
    const [loading, setLoading] = useState(true)
    const [token, setToken] = useState(null)
    const navigate = useNavigate()

    const [isLoggedIn, setIsLoggedIn] = useState();

    useEffect(async () => {
        const autoLoginHandler = async () => {
            try {
                let loginData = JSON.stringify({
                    "email": "letslearngcp2@gmail.com", "password": "123456"
                });
                    
                let config = !localStorage.getItem("authToken")
                ?   {
                        method: 'post',
                        url: '/auth/login',
                        headers: {
                            "Content-Type": "application/json",
                        },
                        data: loginData
                    }
                :   {
                    method: 'post',
                    url: '/auth/private',
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    },
                }

                const { data } = await axios.request(config)
                console.log(data,"<<**")
                console.log("yeh authToken localstorage mai stored kiya hai abhi (token) >> ", data)
                localStorage.setItem("authToken", data.token);
                setToken(data.token)
                setTimeout(() => {
                    navigate("/")
                }, 1800)

            } catch (error) {
                // setError(error.response.data.error);
                navigate("/unauthorized")
                // setTimeout(() => {
                //     // setError("");
                //     // console.log(">>",error)
                // }, 500);
            }
        };

        autoLoginHandler()

        // Check for 'accessToken' cookie
        const accessToken = await Cookies.get('accessToken');
        if (accessToken) {
            setIsLoggedIn(true);

        } else {
            setIsLoggedIn(false);
        }

    }, []);


    useEffect(() => {

        setAuth(bool)
        setTimeout(() => {
            setLoading(false)
        }, 1600)

    }, [bool])

    useEffect(()=>{
    },[token])

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        if(process.env.IAP_ENABLED)
        navigate('/?gcp-iap-mode=GCIP_SIGNOUT')

        navigate('/')
    };

    return (

        <header>
            <div className="averager">

                <Link to="/" className="logo">
                    <h5>
                        DemoApp
                    </h5>
                </Link>
                <SearchForm />
                <div className='header_options'>
                    {auth ?
                        <div className="auth_options" style={{"display": "flex",
                            "flexDirection": "row",
                            "alignItems": "center"}}>
                            <Link className='addStory-link' to="/addstory"><RiPencilFill /> Write </Link>
                            <Link to="/readList" className='readList-link'>
                                <BsBookmarks />
                                <span id="readListLength">
                                    {activeUser.readListLength}
                                </span>
                            </Link>
                            <div className='header-profile-wrapper '>


                                {loading ? 
                                <SkeletonElement type="minsize-avatar" />
                                    :
                                    // <></>
                                    <img src="https://cdn-icons-png.flaticon.com/512/5332/5332306.png" alt="Logo" className='logo_header' />
                                }
                                <div className="sub-profile-wrap  ">
                                    <Link className='profile-link' to="/profile"  > <FaUserEdit />  Profile </Link>
                                    <button className='logout-btn' onClick={handleLogout}> <BiLogOut />  Logout</button>
                                </div>
                            </div>


                        </div>

                        :
                        <div className="noAuth_options">
                            {/* <Link className='login-link' to="/login"> Login </Link> */}
                            <img src='./user-i.png' alt="Logo" className='logo_header'/>
                            <h5 style={{"fontSize":"1em"}}>{process.env.USERNAME ? process.env.USERNAME : ""}</h5>
                        </div>

                    }
                </div>

            </div>

        </header>

    )
}

export default Header;
