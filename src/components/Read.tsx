import { useEffect, useState, useContext } from "react"
import Loading from "./Loading";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import ModalPost from "./ModalPost";

//@ts-ignore

export const Read = () => {
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

    async function fetchData() {
        try {
            setLoadingStatus(true);
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

            setLoadingStatus(false);
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
    }, [loginStatus])

    return (
        loadingstatus ? <Loading></Loading> :
            <div>

                <div className=" w-[99vw] h-[100vh] bg-[#080c21] border border-[#080c21] relative overflow-y-auto">
                    {
                        <div className=" w-[1500px] mx-auto">
                            {
                                //@ts-ignore
                                dataArray.map((item) => (
                                    item.published ? <>
                                        {showModal && modalArray == item.id ? <ModalPost closeModal={closeModal} item={item} userArray={userArray}></ModalPost> : null}
                                        <div className=" text-black bg-white/90 border border-white rounded-lg my-7 py-2 px-3 mx-3 shadow-sm shadow-gray-200 h-[120px] overflow-y-hidden hover:scale-[101%] duration-100" onClick={() => { showModalBtn(item.id) }}>

                                            <p className=" text-pretty text-3xl font-semibold">
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
                                            <p className=" text-slate-600 mt-3">
                                                {/* {
                                        item.content
                                    } */}
                                                <div dangerouslySetInnerHTML={
                                                    //@ts-ignore
                                                    { __html: item.content }
                                                } />
                                            </p>
                                            {/* <button onClick={()=>{showModalBtn(item.id)}}>Show</button> */}

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