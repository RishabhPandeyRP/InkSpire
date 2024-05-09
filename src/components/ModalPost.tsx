import { useEffect } from "react";
import close from "../assets/close (1).png"
import LikeComponent from "./LikeComponent";


//@ts-ignore
const ModalPost = ({ closeModal, userArray, item }) => {


    useEffect(() => {
        document.body.style.overflowY = "hidden";
        return () => {
            document.body.style.overflowY = "scroll";
        }
    }, [])
    return (
        <div className="w-[100vw]  h-[100vh] backdrop-blur backdrop-brightness-75  fixed border border-black/70 flex justify-center  top-0 left-[-1%] duration-100  " onClick={closeModal}>

            <div className=" max-w-[60%] max-h-[75%] w-fit h-fit bg-slate-200  border border-white px-[3%] py-[3%] rounded-lg relative mt-[4%] overflow-y-auto no-scrollbar " onClick={(event) => { event.stopPropagation() }}>
                <p className=" text-4xl font-semibold underline text-center mb-[5%]">
                    {
                        item.title
                    }
                </p>

                <p className=" text-xl text-center mt-3 ">
                    <div dangerouslySetInnerHTML={
                        { __html: item.content }
                    } />

                </p>

                <img src={close} alt="" className=" w-[10px] h-[10px] absolute top-3 right-[1.5%] hover:cursor-pointer mx-2" onClick={closeModal} />



                <LikeComponent></LikeComponent>


            </div>

        </div>
    )
}

export default ModalPost;