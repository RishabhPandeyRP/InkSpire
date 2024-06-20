import  { useState } from "react";
import UserContext from "./UserContext";
import defaultImage from "../assets/user (1).png"

//@ts-ignore
const ContextProvider = ({children})=>{
    const [loginStatus , setLoginStatus] = useState(false);
    const [userNameBox , setUserNameBox] = useState(false);
    const [loadingstatus , setLoadingStatus] = useState(false);
    const [isProfilePicChange , setprofilePicChanged] = useState(false);
    const [profileImage , setProfileImage] = useState({
        placeholder : defaultImage,
        file : null
    });
    return(
        //@ts-ignore
        <UserContext.Provider value={{loginStatus , setLoginStatus , userNameBox , setUserNameBox , loadingstatus , setLoadingStatus , profileImage , setProfileImage , isProfilePicChange , setprofilePicChanged}}>
            {children}
        </UserContext.Provider>
    )
}

export default ContextProvider