import { useEffect, useState } from "react"
import UserContext from "../context/UserContext";
import { useContext } from "react";
import world_map from "../assets/Blue Minimalist World Map Instagram Post.png"
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import Counternum from "./Counternum";

export const Home = () => {
    const navigate = useNavigate();
    //@ts-ignore
    const { loginStatus } = useContext(UserContext);
    //@ts-ignore
    const { loadingstatus } = useContext(UserContext);
    //@ts-ignore
    const { setLoadingStatus } = useContext(UserContext);

    const [userName, setUserName] = useState("");

    async function takeName() {
        try {
            setLoadingStatus(true);
            const data = await fetch("http://127.0.0.1:8787/api/v1/user/name", {

                method: "POST",
                body: JSON.stringify({
                    email: localStorage.getItem("emailMediumRishabh"),
                }),

                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });

            const response = await data.json();
            setUserName(response.response);
            setLoadingStatus(false);
        } catch (error) {
            console.log("error from home page", error);
        }
    }
    useEffect(() => {
        takeName();
    }, [])


    return (
        loadingstatus ? <Loading></Loading> : <div>
        <div className="border border-[#080c21] w-fit h-fit bg-[#080c21] flex  justify-center">

            <div className=" mt-[5%] ml-[4%] h-fit py-[6.47%] space-y-2 ">
                <div className=" mx-auto ">
                    {
                        loginStatus ? <div className=" text-white text-6xl">
                            <p className="flex gap-4">
                                Hello
                                <p className=" bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block py-[0.55%] text-transparent bg-clip-text mt-[-0.5%] font-semibold font-serif">
                                    {userName}
                                </p> ,
                            </p>
                        </div> : <div className=" text-white text-7xl">
                            hello user
                        </div>
                    }
                </div>
                <div>
                    <p className=" text-neutral-400 text-4xl mt-[0.5%]">
                        Give your ideas a global platform
                    </p>
                </div>
                <div>
                    {
                        loginStatus ? <button className=" text-white bg-white/30 px-[3%] py-[0.7%] rounded-lg text-2xl mt-[2%] hover:scale-[103%] duration-100" onClick={()=>{navigate('/read')}}>
                        Read Blogs
                    </button>:<button className=" text-white bg-white/30 px-[3%] py-[0.7%] rounded-lg text-2xl mt-[2%] hover:scale-[103%] duration-100" onClick={()=>{navigate('/signup')}}>
                        login / signup
                    </button>
                    }
                </div>
            </div>


            <img src={world_map} alt="" className=" w-[40%] h-[70%] mt-[5%] ml-[5%] " />

            

        </div>
        <Counternum></Counternum>
    </div>
    )
}