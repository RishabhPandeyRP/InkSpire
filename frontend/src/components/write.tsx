import JoditEditor from 'jodit-react';
import { useEffect, useRef , useState } from 'react';
import ModalTitle from './ModalTitle';
import { useNavigate } from 'react-router-dom';
import UserContext from "../context/UserContext";
import { useContext } from 'react';
import toast from 'react-hot-toast';

export const Write = ()=>{

    const navigate = useNavigate();
    const [content, setContent] = useState('');

    

    //@ts-ignore
    const { loginStatus } = useContext(UserContext);

    //@ts-ignore
    const { setLoginStatus } = useContext(UserContext);

    useEffect(()=>{
        const token = localStorage.getItem("accessTokenMediumRishabh");
        //@ts-ignore
        const getContent = localStorage.getItem("content");
        if (getContent) setContent(getContent)
        if(token == null || token ==""){
            setLoginStatus(false);
            return navigate("/signin");
        }
    },[loginStatus])

    useEffect(()=>{
        localStorage.setItem("content" , content)
    },[content])

    const editor = useRef(null);
    //const myInput = useRef(null);
	
    const [showTitleModal , setTitleModal] = useState(false);

    
    const closeTitleModal = ()=>setTitleModal(false)

    //@ts-ignore
    const handleClick = (newContent) => {
        try {
            //@ts-ignore
        editor.current.focus();
        setContent(newContent);
        localStorage.setItem("content" , content);
        //editor.current.focus();
        } catch (error) {
            console.log("quota exceeded");
            toast.error("word limit exceeded");
        }
        
      };

    const handlePublish = ()=>{
        setTitleModal(true);
        console.log("from publish" , content)
    }

    //const placeholder = "pata nhi"
    const config = 
		{
            //@ts-ignore
			readonly: false, // all options from https://xdsoft.net/jodit/docs/,
            //@ts-ignore
			placeholder: ''
            
		};

    
    return (
        <div className=' overflow-y-auto border border-green-500 px-2 py-1 bg-slate-200 h-[90vh] relative'>
            
            <JoditEditor
			ref={editor }
			value={content}
            //@ts-ignore
			onChange={(newcontent)=>{handleClick(newcontent)}}
            //@ts-ignore
             
             //ref={myInput}
            />

            <button className='mx-[45%] my-4 border border-blue-500 px-6 py-2 rounded-lg bg-blue-500 text-white text-xl font-semibold hover:scale-[102%] duration-100' onClick={handlePublish}>Add Title</button>

            {/* {content}
            <div dangerouslySetInnerHTML={
                { __html: content }
             } /> */}

            {showTitleModal && <ModalTitle closeTitleModal={closeTitleModal} content={content}></ModalTitle>}
            
        </div>
    )
}