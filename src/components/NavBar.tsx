import { NavLink } from "react-router-dom"
import adduser from "../assets/add-user.png";
import write from "../assets/edit.png"
import read from "../assets/book.png"
import home from "../assets/home (1).png"
import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import userIcon from "../assets/user.png"
import toast from 'react-hot-toast';
import ModalProfilepic from "./ModalProfilePic";
import { useNavigate } from "react-router-dom";


export const NavBar = () => {
    const navigate = useNavigate();
    const [showProfileModal , setProfileModal] = useState(false);
    //let showPic = null;
    const [showPic , setShowPic] = useState(null);

    //@ts-ignore
    const { isProfilePicChange } = useContext(UserContext);

    const getImageUrl = async ()=>{
        try {
            const response = await fetch("http://127.0.0.1:8787/api/v1/user/name", {

                method: "POST",
                body: JSON.stringify({
                    email: localStorage.getItem("emailMediumRishabh"),
                    token: localStorage.getItem("accessTokenMediumRishabh"),
                    password: localStorage.getItem("passMediumRishabh")
                }),

                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            const data = await response.json();
            console.log("from modaltitle ", data.response);
            console.log("from modaltitle ", data.userid);

            const response2 = await fetch("http://127.0.0.1:8787/api/v1/blog/image/get", {

                method: "POST",
                body: JSON.stringify({
                    email: localStorage.getItem("emailMediumRishabh"),
                    token: localStorage.getItem("accessTokenMediumRishabh"),
                    password: localStorage.getItem("passMediumRishabh"),
                    id:data.userid
                }),

                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            const data2 = await response2.json();
            console.log("from nav imageurl div ", data2.imageFile);
            setShowPic(data2.imageFile.imageUrl);
            
        } catch (error) {
            console.log("error from nav useeffect");
        }
    }

    useEffect(()=>{
        try {
            //showPic = localStorage.getItem("profilepic");
            //@ts-ignore
            //setShowPic(localStorage.getItem("profilepic"))
            //console.log("from nasv" , showPic);
            getImageUrl();
        } catch (error) {
            console.log("error from nav useeffect" , error);
        }
    },[isProfilePicChange])

    const closeProfileModal = ()=>setProfileModal(false);

    //@ts-ignore
    const { profileImage } = useContext(UserContext);

    //@ts-ignore
    const { loginStatus } = useContext(UserContext);
    //@ts-ignore  
    const { setUserNameBox } = useContext(UserContext);
    //@ts-ignore  
    const { userNameBox } = useContext(UserContext);
    //@ts-ignore
    const { setLoginStatus } = useContext(UserContext);

    

    function logoutHandler() {
        setLoginStatus(false);
        localStorage.removeItem("accessTokenMediumRishabh");
        localStorage.removeItem("content");
        toast.success("Logged out successfully");
    }

    function dashboardBtnHandler(){
        setUserNameBox(!userNameBox);
        return navigate("/dashboard");
    }

    return (
        <div className=" border border-[#080c21] w-[100vw] h-[10vh] bg-[#080c21] z-50">
            <div className="  w-[1200px] h-[8vh] mx-auto mt-2">
                <div className=" w-[700px] h-[6.5vh] mx-auto mt-[1%] rounded-[150px] bg-white/35 flex justify-between relative">
                    <div className=" text-black text-xl bg-white/40 ml-[5px] rounded-[34px] px-[5%] h-[85%] mt-[0.4%] flex hover:bg-black/20 hover:scale-[101%] duration-100">
                        <NavLink to="/" className="mt-[11%]">
                            {/* <p>SignUp </p> */}
                            <img src={home} alt="" className="w-[110%] h-[70%] mt-[20%] ml-[3%]" />
                        </NavLink>

                        
                    </div>

                    {/* <div className=" h-[33px] w-[1px] rounded-md bg-black mt-[1.2%] ml-[1%]"/> */}

                    <div className=" text-black text-xl bg-white/40 ml-[5px] rounded-[34px] px-[6%] h-[85%] mt-[0.4%] flex hover:bg-black/20 hover:scale-[101%] duration-100">
                        <NavLink to="/read" className="mt-[11%]">
                            {/* <p>SignUp </p> */}
                            <img src={read} alt="" className="w-[110%] h-[70%] mt-[20%] ml-[15%]" />
                        </NavLink>
                    </div>

                    {/* <div className=" h-[33px] w-[1px] rounded-md bg-black mt-[1.2%] ml-[1%]"/> */}

                    <div className=" text-black text-xl bg-white/40 ml-[5px] rounded-[34px] px-[6%] h-[85%] mt-[0.4%] flex hover:bg-black/20 hover:scale-[101%] duration-100">
                        <NavLink to="/write" className="mt-[11%]">
                            {/* <p>SignUp </p> */}
                            <img src={write} alt="" className="w-[110%] h-[70%] mt-[20%] ml-[15%]" />
                        </NavLink>
                    </div>

                    {/* <div className=" h-[33px] w-[1px] rounded-md bg-black mt-[1.2%] ml-[1%]"/> */}

                    <div className=" text-black text-xl bg-white/40 ml-[5px] rounded-[34px] px-[3%] h-[85%] mt-[0.4%] flex hover:bg-black/20 hover:scale-[101%] duration-100 mr-[5px]">
                        {
                            loginStatus ?
                                <button onClick={() => setUserNameBox(!userNameBox)}>
                                    <p className="ml-[3%] w-[108px]  border-green-500">My Account </p>
                                </button>

                                : <NavLink to="/signup" className="mt-[11%] flex items-baseline gap-3">
                                    {/* <p>SignUp </p> */}
                                    <img src={adduser} alt="" className="w-[110%] h-[70%] mt-[20%] ml-[15%]" />
                                </NavLink>
                        }
                    </div>


                    {
                        loginStatus && userNameBox ? <div className=" w-fit h-[230px]  rounded-2xl bg-black/70 backdrop-blur-md flex-col px-5 fixed z-10 right-3 border border-gray-500  shadow-sm shadow-gray-600">
                            
                            {showPic ? <img src={showPic} alt="" className="w-[35%] h-[35%] mx-auto mt-[5%] cursor-pointer rounded-full object-contain" onClick={()=>{setProfileModal(true)}} />:<img src={userIcon} alt="" className="w-[35%] h-[35%] mx-auto mt-[5%] cursor-pointer " onClick={()=>{setProfileModal(true)}} />}

                            {showProfileModal && <ModalProfilepic closeProfileModal={closeProfileModal}></ModalProfilepic>}

                            <p className=" text-white mx-auto mt-[5%]">{localStorage.getItem("emailMediumRishabh")}</p>

                            <button className="ml-[20%] w-[60%] mt-[5%] bg-[#7f8aa9]/30 py-2 rounded-lg text-white hover:scale-[105%] duration-100 md-[5%]" onClick={dashboardBtnHandler} >Dashboard</button>

                            <button className="ml-[20%] w-[60%] mt-[5%] bg-[#7f8aa9]/30 py-2 rounded-lg text-white hover:scale-[105%] duration-100 md-[5%]" onClick={logoutHandler} >logout</button>

                        </div> : null
                    }

                    

                </div>


            </div>



            {/* <Toaster></Toaster> */}
        </div>
    )
}