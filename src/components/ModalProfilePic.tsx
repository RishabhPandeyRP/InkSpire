import { useEffect } from "react";
import UserContext from "../context/UserContext";
import { useContext, useState } from "react";
import defaultImage from "../assets/user (1).png"
import toast from "react-hot-toast";

//@ts-ignore
const ModalProfilepic = ({ closeProfileModal }) => {
    const [uploadStatus, setUploadStatus] = useState(false);
    useEffect(() => {
        document.body.style.overflowY = "hidden"
        return () => {
            document.body.style.overflowY = "scroll"
        }
    }, [])

    //@ts-ignore
    const { profileImage } = useContext(UserContext);

    //@ts-ignore
    const { setProfileImage } = useContext(UserContext);

    //@ts-ignore
    const { setprofilePicChanged } = useContext(UserContext);

    //@ts-ignore
    const { isProfilePicChange } = useContext(UserContext);

    //@ts-ignore
    const handleProfilePic = (event) => {
        try {
            const localFile = event.target.files[0];

            if (localFile.type == "image/png" || localFile.type == "image/jpeg") {
                setProfileImage({
                    placeholder: URL.createObjectURL(event.target.files[0]),
                    file: localFile
                })
                console.log("url is", profileImage.placeholder);
            }
            else {
                setProfileImage({
                    placeholder: defaultImage,
                    file: null
                })
                toast.error("Invalid file type !")
            }
        } catch (error) {

        }
    }

    const uploadProfilePic = async () => {
        try {
            setUploadStatus(true);
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
            // console.log("from modaltitle ", data.response);
            // console.log("from modaltitle ", data.userid);
            // console.log("image url ", (profileImage.placeholder));

            if (profileImage.file == null) {
                toast.error("Select a file !")
                setUploadStatus(false);
                return
            }

            let imagedata = null;
            const reader = new FileReader();

            reader.addEventListener("load", async () => {
                // console.log("inside reader");
                // console.log(reader.result);
                imagedata = reader.result

                const response2 = await fetch("http://127.0.0.1:8787/api/v1/blog/images/upload", {

                    method: "PUT",
                    body: JSON.stringify({
                        email: localStorage.getItem("emailMediumRishabh"),
                        token: localStorage.getItem("accessTokenMediumRishabh"),
                        password: localStorage.getItem("passMediumRishabh"),
                        imageUrl: imagedata,
                        id: data.userid
                    }),

                    headers: {
                        "Content-type": "application/json;"
                    }
                });
                const data2 = await response2.json();
                // console.log(data2);
                // console.log("after fetch image is ", imagedata);
                setprofilePicChanged(!isProfilePicChange);
            })

            reader.readAsDataURL(profileImage.file);

            // console.log("response after uploading");
            // console.log("type of file", profileImage.placeholder);
            setUploadStatus(false);
            closeProfileModal();
            toast.success("Profile pic changed successfully , it will show in few moments");

        } catch (error) {

            console.log("error from the upload profile pic", error);
        }
    }

    const handleClear = () => {
        try {
            setProfileImage({
                placeholder: defaultImage,
                file: null
            })
        } catch (error) {
            console.log("error occured while clearing the preview of image");
        }
    }

    return (
        <div className="w-[100vw] h-[100vh] bg-black/80 backdrop-blur-md fixed -top-[5%] -left-[621%] flex justify-center" onClick={closeProfileModal}>

            <div className="w-fit h-fit border border-white bg-white rounded-lg px-9 py-5 mt-[12%] " onClick={(event) => { event.stopPropagation() }}>

                <div className=" border-green-500  flex-col">
                    <div className=" w-fit mx-auto  border-green-400 my-4">
                        <img src={profileImage.placeholder} alt="" height={200} width={200} className="bg-white object-cover" />
                    </div>
                    <div className=" w-fit mx-auto">
                        <input type="file" name="" id="" className="bg-white rounded-md w-[400px] border-black border" onChange={handleProfilePic} />
                    </div>
                    <div className="flex justify-center gap-4 mt-6 mb-2">
                        <div>
                            <button className=" px-11 py-1 border border-neutral-600 rounded-lg bg-neutral-600 text-xl text-white" onClick={handleClear}>clear</button>
                        </div>

                        <div>
                            {
                                uploadStatus ? <button className=" px-3 py-1 border border-blue-600 rounded-lg bg-blue-600 text-xl text-white">saving</button> : <button className=" px-3 py-1 border border-blue-600 rounded-lg bg-blue-600 text-xl text-white" onClick={uploadProfilePic}>save changes</button>
                            }
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default ModalProfilepic;