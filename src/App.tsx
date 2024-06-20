import { BrowserRouter , Route, Routes } from "react-router-dom"
import SignUp from "./components/SignUp";
import { Home } from "./components/Home";
import { NavBar } from "./components/NavBar";
import { Read } from "./components/Read";
import { Write } from "./components/write";
import SignIn from "./components/SignIn";
import { useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';
import Dashboard from "./components/Dashboard";
import { useContext , useState } from "react";
//@ts-ignore
import UserContext from "./context/UserContext";
import { useNavigate } from "react-router-dom";

function App() {

  const navigate = useNavigate();


  //@ts-ignore
  const { loadingstatus } = useContext(UserContext);
  //@ts-ignore
  const { setLoadingStatus } = useContext(UserContext);
  //@ts-ignore
  const {setLoginStatus} = useContext(UserContext);
  //@ts-ignore
  const { loginStatus } = useContext(UserContext);

  const [dataArray, setDataArray] = useState([]);

  async function validation(){
    try {
      if(localStorage.getItem("accessTokenMediumRishabh") == null){
        toast.error("Currently you are not loggedin");
        setLoginStatus(false);
        return;
      }
      
      const response = await fetch("http://127.0.0.1:8787/api/v1/user/signin", {

                method: "POST",
                body: JSON.stringify({
                    email: localStorage.getItem("emailMediumRishabh"),
                    password: localStorage.getItem("passMediumRishabh"),
                    token : localStorage.getItem("accessTokenMediumRishabh")
                }),

                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })

            const data = await response.json();

            if (data.status == 200) {
                toast.success('Automatically Signed in');
                // console.log("sign in token is " + localStorage.getItem("accessTokenMediumRishabh"));
                //setSignUpStatus(false);
                setLoginStatus(true);
                return navigate("/");
            }

    } catch (error) {
      console.log("error from app" + error);
    }
  }

  async function fetchData() {
    try {
        //setLoadingStatus(true);
        const response = await fetch("http://127.0.0.1:8787/api/v1/blog/bulk", {

            method: "POST",
            body: JSON.stringify({
                email: localStorage.getItem("emailMediumRishabh"),
                token: localStorage.getItem("accessTokenMediumRishabh")
            }),

            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        const data = await response.json();
        setDataArray(data);
        //@ts-ignore
        console.log("this is data from data array page user", dataArray.userList);
        console.log("this is data from data array page user", dataArray.posts);
        console.log("this is data from data array page user", dataArray.userList);
        //setLoadingStatus(false);
    } catch (error) {
        console.log(error)
    }
}
  useEffect(()=>{
    setLoadingStatus(true);
    validation()
    // fetchData()
    setLoadingStatus(false);
  }, []);

  return (
    <div className=" overflow-hidden m-0">
      
      {/* <BrowserRouter> */}
        <NavBar></NavBar>

        <Routes>
          <Route path="/signup" element={<SignUp></SignUp>} />
          <Route path="/signin" element={<SignIn></SignIn>}/>
          <Route path="/" element={<Home></Home>}/>
          
          <Route path="/read" element={<Read dataArray={dataArray}></Read>}/>
          <Route path="/write" element={<Write></Write>}/>
          <Route path="/dashboard" element={<Dashboard dataArray={dataArray}></Dashboard>}></Route>
        </Routes>
      {/* </BrowserRouter> */}
      <Toaster position="top-right" reverseOrder={true} />
    </div>
  )
}

export default App
