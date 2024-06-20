import { useEffect, useState, useContext } from "react"
import Loading from "./Loading";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import ModalPost from "./ModalPost";
import deleteIcon from "../assets/delete.png"
import LoadingPosts from "./LoadingPosts";
import toast from "react-hot-toast";

//@ts-ignore

export const PostsDashBoard = () => {
    const navigate = useNavigate();

    //@ts-ignore
    const { loginStatus } = useContext(UserContext);

    //@ts-ignore
    const { loadingstatus } = useContext(UserContext);
    //@ts-ignore
    const { setLoadingStatus } = useContext(UserContext);


    const [dataArray, setDataArray] = useState([]);
    const [userArray, setUserArray] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalArray, setModalArray] = useState(null);
    const [deleted , setdeleted] = useState(false);
    const [loadingPosts , setLoadingPosts] = useState(false);
    const [deleteStatus , setDeleteStatus] = useState(false);

    const closeModal = () => setShowModal(false);

    //@ts-ignore
    const showModalBtn = (id) => {
        //setModalArray([]);
        //@ts-ignore
        setModalArray(id)
        setShowModal(true)
        console.log("this is modal array");
        console.log(modalArray);
    }

    const deleteHandler = async (id)=>{
        try {
            setDeleteStatus(true);
            console.log("id is " , id);

            const response = await fetch("http://127.0.0.1:8787/api/v1/blog/id", {

                method: "DELETE",
                body: JSON.stringify({
                    email: localStorage.getItem("emailMediumRishabh"),
                    token: localStorage.getItem("accessTokenMediumRishabh"),
                    id: id
                }),

                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            const data = await response.json();

            console.log("after deleting " , data);

            toast.success("Post deleted successfully")
            setDeleteStatus(true);
            setdeleted(!deleted);
            

            //event.stopPropagation();
        } catch (error) {
            console.log("error from delete handler" ,error);
            toast.error("some error occured while deleting the post")
        }
    }

    async function fetchData() {
        try {
            setLoadingPosts(true);
            const obj = {
                email: localStorage.getItem("emailMediumRishabh"),
                token: localStorage.getItem("accessTokenMediumRishabh")
            }

            //console.log(obj);

            const response = await axios.post("http://127.0.0.1:8787/api/v1/blog/bulk", obj)
            const data = await response.data;

            if (data.status == 403) {
                return navigate('/signin')
            }

            if (data.posts)
                setDataArray(data.posts);
            setUserArray(data.userList);
            //@ts-ignore
            console.log("this is data from read page", data);

            setLoadingPosts(false);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        //    const time =  setTimeout(fetchData,100)

        //    return ()=>{
        //     clearTimeout(time)
        //    } 
        fetchData()
    }, [loginStatus , deleted])
    useEffect(()=>{
        fetchData()
    },[])

    return (
        loadingPosts ? <LoadingPosts></LoadingPosts> :
            <div>

                <div className=" w-[99vw] h-[100vh] bg-white border-[#080c21] relative overflow-y-auto">
                    {
                        <div className=" w-[1500px] mx-auto">
                            {
                                //@ts-ignore
                                dataArray.map((item) => (
                                    item.published && item.authorId == localStorage.getItem("userId") ? <>
                                        {showModal && modalArray == item.id ? <ModalPost closeModal={closeModal} item={item} userArray={userArray}></ModalPost> : null}
                                        <div className=" text-black bg-blue-100/90 border border-white rounded-lg my-7 py-2 px-3 mx-3 shadow-sm shadow-gray-200 h-[120px] overflow-y-hidden hover:shadow-gray-500 duration-100 flex justify-between hover:shadow-md" onClick={() => { showModalBtn(item.id) }}>

                                            <div>
                                                <p className=" text-pretty text-3xl font-semibold w-[600px]  border-green-500 overflow-x-hidden overflow-y-hidden">
                                                    {
                                                        item.title
                                                    }
                                                </p>
                                                <p >

                                                    {
                                                        userArray.map((user) => (
                                                            item.authorId == user.id && user.name != null ? <p className="flex gap-2 text-sm text-gray-500 font-semibold">
                                                                <p>by - </p>
                                                                {user.name}</p> : null
                                                        ))
                                                    }
                                                </p>
                                                <p className=" text-slate-600 mt-3 w-[700px] overflow-x-hidden">

                                                    <div dangerouslySetInnerHTML={
                                                        //@ts-ignore
                                                        { __html: item.content }
                                                    } />
                                                </p>
                                            </div>


                                            <div className=" w-fit mr-[2%] mt-[2%] cursor-pointer" onClick={(event) => { event.stopPropagation() }}>
                                                {
                                                    deleteStatus ? <img src={deleteIcon} alt=""  className=" w-[50px] h-[50px] hover:scale-[105%] duration-75 select-none" /> 
                                                    :
                                                     <img onClick={()=>{deleteHandler(item.id)}} src={deleteIcon} alt=""  className=" w-[50px] h-[50px] hover:scale-[105%] duration-75 select-none" />
                                                }
                                            </div>


                                        </div>

                                    </> : null
                                ))
                            }
                        </div>
                    }




                </div>
            </div>
    )
}