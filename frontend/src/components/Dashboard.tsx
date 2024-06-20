import { useEffect, useState } from "react";
import {PostsDashBoard} from "./PostsDashBoard";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import Loading from "./Loading";

const Dashboard = () => {
    const [showPic, setShowPic] = useState(null);
    const [showName, setShowname] = useState(null);
    const [showEmail, setShowEmail] = useState(null);
    const [authorId , setAuthorId] = useState("");
    const [postCount , setPostCount] = useState(0);
    const [myPosts , setMyPosts] = useState(null);
    const [loadingStatusDB , setLoadingStatusDB] = useState(false)

    //@ts-ignore
    const { loadingstatus } = useContext(UserContext);
    //@ts-ignore
    const { setLoadingStatus } = useContext(UserContext);

    const getImageUrl = async () => {
        try {
            setLoadingStatusDB(true);
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
            console.log("from dashboard ", data);
            //console.log("from modaltitle ", data.userid);
            setShowname(data.response);
            setShowEmail(data.email);
            // if(data.userid)
            //     setAuthorId(data.userid);
            localStorage.setItem("userId" , data.userid);

            console.log("author id from fun1" , authorId);

            const response2 = await fetch("http://127.0.0.1:8787/api/v1/blog/image/get", {

                method: "POST",
                body: JSON.stringify({
                    email: localStorage.getItem("emailMediumRishabh"),
                    token: localStorage.getItem("accessTokenMediumRishabh"),
                    password: localStorage.getItem("passMediumRishabh"),
                    id: data.userid
                }),

                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            const data2 = await response2.json();
            console.log("from nav imageurl div ", data2.imageFile);
            setShowPic(data2.imageFile.imageUrl);
            //getPostsCount();
            //console.log("from dashboard " , dataArray);
            setLoadingStatusDB(false);
        } catch (error) {
            console.log("error from nav useeffect");
        }
    }


    useEffect(() => {
        
        getImageUrl()
        //setLoadingStatus(false);
        // getPostsCount()
    }, [])


    return (
        loadingStatusDB ? <Loading></Loading> :
        <div className="py-3">
            <div className=" flex justify-centre  mx-auto w-fit">
                {/* image , name , and email */}
                <div className=" flex items-center w-[1000px]  border-green-700">
                    {/* image */}
                    <div className=" rounded-full w-[210px] h-[210px] border border-slate-200 flex justify-center items-center bg-slate-200 mx-[4%] my-[3%]">
                        
                        <img src={showPic} alt="" className="w-[200px] h-[200px] rounded-full object-contain pointer-events-none" />
                    </div>

                    <div className="">
                        
                        <p className=" text-5xl">
                            {
                                showName
                            }
                        </p>

                        
                        <p className=" text-lg mt-2 text-neutral-400">
                            {
                                showEmail
                            }
                        </p>
                    </div>
                </div>

                {/* total posts count */}
                {/* <div className=" border-green-600 flex-col justify-around">
                            <p className=" text-4xl mt-[50%]">
                                Total Posts
                            </p>

                            <p className=" text-4xl mx-auto  w-fit  font-semibold">
                                {postCount}
                            </p>
                </div> */}

            </div>

            <p className=" text-5xl font-serif w-fit mx-auto mt-9">Your Posts</p>

            <div>
                <PostsDashBoard></PostsDashBoard>
                {/* {
                    
                    myPosts != null && myPosts.map((item)=>(
                        <div>
                            <p>
                                {
                                    item.title
                                }
                            </p>
                            <p>
                                {
                                    item.content
                                }
                            </p>
                        </div>
                    ))
                } */}
            </div>
        </div>
    )
}

export default Dashboard;