import { useState } from "react";
import design2 from "../assets/design2-removebg-preview.png";
import toast from 'react-hot-toast';
import { NavLink } from "react-router-dom"
import emailjs from '@emailjs/browser'



export default function SignUp() {

    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPass, setUserPass] = useState("");
    const [signupStatus, setSignUpStatus] = useState(false);

    

    //@ts-ignore
    function nameHandler(e) {
        setUserName(e.target.value);
        //console.log(userName);
    }

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
        // console.log("");
        // console.log(userName + userEmail + userPass);

        // https://backend.rishabh17704.workers.dev/

        try {
            setSignUpStatus(true);

            const serviceId = "service_n6uc4kk";
            const templateId = "template_rq066uf";
            const publicKey = "w6et-QXfaoOGXm6fy";

            const templateParams = {
                from_name : userName,
                to_name : "Rishabh pandey from InkSpire"
            }

            const response = await fetch("http://127.0.0.1:8787/api/v1/user/signup", {

                method: "POST",
                body: JSON.stringify({
                    email: userEmail,
                    password: userPass,
                    name: userName
                }),

                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })

            const data = await response.json();

            if (data.status == 200) {
                //console.log("data is ", data.error.code);

                // localStorage.setItem("accessTokenMediumRishabh", data.token);
                // localStorage.setItem("emailMediumRishabh", userEmail);
                // localStorage.setItem("passMediumRishabh", userPass);
                toast.success('Account created Successfully');

                //console.log("token is " + localStorage.getItem("accessTokenMediumRishabh"));
                setSignUpStatus(false);

                emailjs.send(serviceId , templateId , templateParams , publicKey)
                    .then((response)=>{
                        toast("email sent")
                    })
                    .catch((error)=>{
                        toast.error("error while sendind mail")
                    })
                return;
            }

            else if (data.status == 411) {
                //console.log("data is ", data.error.code);

                toast.error(`  Invalid Username or Password 
                 Password should be of min 8 letters`);
                 setSignUpStatus(false);
                return;
            }

            else if (data.error.code == "P2002") {
                toast('User already present');
                setSignUpStatus(false);
                return;
            }
            else { }
            setSignUpStatus(false);
        } catch (error) {
            console.log("error from the frontend" + error)
        }

    }

    


    return (
        <div className=" bg-gradient-to-r from-[#070B17] to-[#0f1431] border border-[#070B17] h-[100vh] w-[100vw]">

            <div className="h-[80vh] w-[70vw] rounded-lg bg-white/[0.06] mx-auto my-20 flex">

                <div className=" w-[50%] h-[100%] rounded-lg bg-cover">
                    <img src={design2} alt="" className=" my-[15%]" />
                </div>

                <div className="  w-[50%] h-[100%] rounded-lg z-10">

                    <h1 className=" text-white text-4xl mt-10 ml-10">
                        Create an account
                    </h1>

                    <div className=" mt-20 ml-auto flex-col">

                        

                        <div className="flex-col ml-10 mt-5  border-green-300">
                            <p className="text-gray-500 text-md">Full name </p>

                            <input type="text" className=" rounded-md bg-white/10 border border-gray-500 my-1 w-[70%] h-[40px] pl-3 text-white" placeholder="Enter your full name here" value={userName} onChange={nameHandler} />
                        </div>

                        <div className="flex-col ml-10 mt-5">
                            <p className="text-gray-500 text-md">email </p>

                            <input type="email" className=" rounded-md bg-white/10 border border-gray-500 my-1 w-[70%] h-[40px] pl-3 text-white" placeholder="Enter your email here" value={userEmail} onChange={emailHandler} />
                        </div>

                        <div className="flex-col ml-10 mt-5">
                            <p className="text-gray-500 text-md">password </p>

                            <input type="password" className=" rounded-md bg-white/10 border border-gray-500 my-1 w-[70%] h-[40px] pl-3 text-white" placeholder="Enter your password here" value={userPass} onChange={passHandler} />
                        </div>

                        <p className="ml-10 text-white text-xs mt-2">already a member? <NavLink to="/signin" className=" text-blue-700 text-sm"> signin </NavLink> </p>

                        {
                            signupStatus ? <div>
                                <button className="ml-[21%] mt-10  bg-[#7f8aa9]/30 px-20 py-2 rounded-lg text-white hover:scale-[105%] duration-100 flex items-baseline" >
                                    Signing you Up

                                    <span className="relative flex h-3 w-3 ml-4">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                                    </span>
                                </button>
                            </div> : <div>
                                <button className="ml-[21%] mt-10  bg-[#7f8aa9]/30 px-20 py-2 rounded-lg text-white hover:scale-[105%] duration-100 flex " onClick={btnHandler}>Sign Up
                                
                                </button>
                            </div>
                        }

                    </div>


                </div>

            </div>
            {/* <Toaster /> */}
        </div>
    )
}