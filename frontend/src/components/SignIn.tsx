import { useState } from "react";
import design2 from "../assets/design2-removebg-preview.png";
import toast from 'react-hot-toast';
import { NavLink } from "react-router-dom"
import { useContext } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";


export default function SignIn() {
    const navigate = useNavigate();

    //@ts-ignore
    const { setLoginStatus } = useContext(UserContext);

    //@ts-ignore
    const { setUserName } = useContext(UserContext);

    //@ts-ignore  
    const { setUserNameBox } = useContext(UserContext);

    //@ts-ignore
    const { isProfilePicChange } = useContext(UserContext);

    //@ts-ignore
    const { setprofilePicChanged } = useContext(UserContext);


    const [userEmail, setUserEmail] = useState("");
    const [userPass, setUserPass] = useState("");
    const [signupStatus, setSignUpStatus] = useState(false);

    //@ts-ignore
    function emailHandler(e) {
        setUserEmail(e.target.value);
        //console.log(userEmail);
    }

    //@ts-ignore
    function passHandler(e) {
        setUserPass(e.target.value);
        //console.log(userPass);
    }

    //@ts-ignore
    async function btnHandler() {

        try {
            setSignUpStatus(true);
            const response = await fetch("http://127.0.0.1:8787/api/v1/user/signin", {

                method: "POST",
                body: JSON.stringify({
                    email: userEmail,
                    password: userPass,
                }),

                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })

            const data = await response.json();

            if (data.status == 200) {
                //console.log("data is ", data.error.code);
                //localStorage.setItem("accessToken", data.token);
                localStorage.setItem("accessTokenMediumRishabh", data.token);
                localStorage.setItem("emailMediumRishabh", userEmail);
                localStorage.setItem("passMediumRishabh", userPass);

                toast.success('Signed in Successfully');

                console.log("sign in token is " + localStorage.getItem("accessTokenMediumRishabh"));
                setSignUpStatus(false);
                setLoginStatus(true);
                setUserNameBox(false);
                setprofilePicChanged(!isProfilePicChange);
                localStorage.setItem('content',"");

                return navigate("/");
            }

            else if (data.status == 411) {

                toast.error(`  Invalid Username or Password 
                 Password should be of min 8 letters`);
                setSignUpStatus(false);
                localStorage.setItem('content',"");
                return;
            }

            else if (data.status == 401) {
                toast.error(`Incorrect password`);
                setSignUpStatus(false);
                localStorage.setItem('content',"");
                return;
            }

            else if (data.status == 404) {
                toast.error(`User Not present  , please signup first`);
                setSignUpStatus(false);
                localStorage.setItem('content',"");
                return;
            }

            else if (data.error.code == "P2002") {
                toast('User already present');
                setSignUpStatus(false);
                localStorage.setItem('content',"");
                return;
            }
            else { }
            console.log(userPass);
            console.log(data);
            localStorage.setItem('content',"");
            setSignUpStatus(false);
        } catch (error) {
            console.log("error from the frontend signin" + error)
        }

    }


    return (
        <div className=" bg-gradient-to-r from-[#070B17] to-[#0f1431] border border-[#070B17] h-[100vh] w-[100vw] z-0">

            <div className="h-[80vh] w-[70vw] rounded-lg bg-white/[0.06] mx-auto my-20 flex">

                <div className=" w-[50%] h-[100%] rounded-lg bg-cover">
                    <img src={design2} alt="" className=" my-[15%]" />
                </div>

                <div className="  w-[50%] h-[100%] rounded-lg z-10">

                    <h1 className=" text-white text-4xl mt-[20%] ml-10">
                        Sign in to your account
                    </h1>

                    <div className=" mt-20 ml-auto flex-col">

                        <div className="flex-col ml-10 mt-5">
                            <p className="text-gray-500 text-md">email </p>

                            <input type="email" className=" rounded-md bg-white/10 border border-gray-500 my-1 w-[70%] h-[40px] pl-3 text-white" placeholder="Enter your email here" value={userEmail} onChange={emailHandler} />
                        </div>

                        <div className="flex-col ml-10 mt-5">
                            <p className="text-gray-500 text-md">password </p>

                            <input type="password" className=" rounded-md bg-white/10 border border-gray-500 my-1 w-[70%] h-[40px] pl-3 text-white" placeholder="Enter your password here" value={userPass} onChange={passHandler} />
                        </div>

                        <p className="ml-10 text-white text-xs mt-2">what to create an account ?
                            <NavLink to="/signup" className=" text-blue-700 text-sm"> signup </NavLink>
                        </p>


                        {
                            signupStatus ? <div>
                                <button className="ml-[21%] mt-10  bg-[#7f8aa9]/30 px-20 py-2 rounded-lg text-white hover:scale-[105%] duration-100 flex items-baseline" >
                                    Signing you In

                                    <span className="relative flex h-3 w-3 ml-4">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                                    </span>
                                </button>
                            </div> : <div>
                                <button className="ml-[21%] mt-10  bg-[#7f8aa9]/30 px-20 py-2 rounded-lg text-white hover:scale-[105%] duration-100 flex " onClick={btnHandler}>Sign In

                                </button>
                            </div>
                        }

                    </div>


                </div>

            </div>
        </div>
    )
}