import like from "../assets/heart.png"
import unlike from "../assets/love.png"
import { useState } from "react";

const LikeComponent = ()=>{
    const [likedStatus , setLikedStatus] = useState(false);
    return(
        <div className="">
            {
                            likedStatus ? <img src={like} alt="" className=" w-[25px] h-[25px]  hover:cursor-pointer mx-auto mt-5" onClick={()=>{setLikedStatus(!likedStatus)}}/> : <img src={unlike} alt="" className=" w-[25px] h-[25px]  hover:cursor-pointer mx-auto mt-5" onClick={()=>{setLikedStatus(!likedStatus)}}/>
            }
        </div>
    )
}

export default LikeComponent;