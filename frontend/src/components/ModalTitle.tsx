import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { useContext } from "react";

//@ts-ignore
const ModalTitle = ({ closeTitleModal, content }) => {

    const navigate = useNavigate()
    //@ts-ignore
    const { setLoginStatus } = useContext(UserContext);

    useEffect(()=>{
        let token = localStorage.getItem("accessTokenMediumRishabh");

        if(token == null || token == ""){
            setLoginStatus(false);
            return navigate("/signin");
        }
        document.body.style.overflowY = "hidden"
        return ()=>{
            document.body.style.overflowY = "scroll"
        }
    },[])

    const [titleValue, setTitleValue] = useState("")
    const [publishStatus, setpublishStatus] = useState(false);

    const clickhandler = async () => {
        try {
            setpublishStatus(true);
            if(titleValue == null || titleValue == ""){
                toast.error("Please enter the title")
                setpublishStatus(false);
                closeTitleModal()
                return;
            }
            console.log("title is ", titleValue);
            console.log("content is ", content);

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

            const response2 = await fetch("http://127.0.0.1:8787/api/v1/blog", {

                method: "POST",
                body: JSON.stringify({
                    email: localStorage.getItem("emailMediumRishabh"),
                    token: localStorage.getItem("accessTokenMediumRishabh"),
                    password: localStorage.getItem("passMediumRishabh"),
                    title: titleValue,
                    content: content,
                    published: true,
                    authorId: data.userid
                }),

                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
            const data2 = await response2.json();
            console.log("response after publishing");
            console.log(data2);
            setpublishStatus(false);
            closeTitleModal();
            toast.success("Post uploaded successfully");
            return navigate("/read");
        } catch (error) {
            console.log("error from modal title", error)
        }
    }

    return (
        <div className="w-[100vw] h-[100vh] bg-[#A5A5A5]/50 backdrop-blur-md  top-0 left-0 flex justify-center overflow-y-hidden fixed" onClick={closeTitleModal}>
            <div className="w-fit h-fit border border-white bg-white rounded-lg px-9 py-5 mt-[12%] overflow-y-hidden" onClick={(event)=>{event.stopPropagation()}}>
                <div className="mx-auto w-fit my-2 mt-4">

                    <input type="text" className="border border-black rounded-md px-2 py-2 w-[500px]" placeholder="Enter title..." value={titleValue} onChange={(event) => { setTitleValue(event.target.value) }} />
                </div>
                <div className="mx-auto w-fit">
                    {
                        publishStatus ? <button className=" my-4 border border-green-500 px-6 py-2 rounded-lg bg-green-500 text-white text-xl font-semibold hover:scale-[102%] duration-100 relative flex items-baseline justify-center ">
                            <p>Publishing</p>

                            <div role="status" className="ml-3 -mt-[10%]">
                                
                                <svg aria-hidden="true" className="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                
                            </div>

                        </button> : <button className=" my-4 border border-green-500 px-6 py-2 rounded-lg bg-green-500 text-white text-xl font-semibold hover:scale-[102%] duration-100" onClick={clickhandler}>Publish</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default ModalTitle;