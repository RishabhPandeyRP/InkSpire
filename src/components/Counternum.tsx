import { useState , useRef, useEffect } from 'react';

//@ts-ignore
const Counternum = (event) => {
    const myRef = useRef();
    //@ts-ignore
    useEffect((event)=>{
        const observer = new IntersectionObserver((entries)=>{
            const entry = entries[0];
            manageCount(event);
            console.log("entry ",entry);
        })
        //@ts-ignore
        observer.observe(myRef.current);
    },[])



    const [userCount , setUserCount] = useState(0);
    const [postCount , setPostCount] = useState(0);
    //@ts-ignore
    function manageCount(event){
        try {
            //console.log(event.target.innerText);
            
            const targetUserNum = 2000;
            const targetPostNum = 6000;
            const speed = 200;
            let initialUserNum = 0;
            let initialPostNum = 0;

            const Usertime = Math.trunc(targetUserNum / speed);
            const Posttime = Math.trunc(targetPostNum / speed);

            const updateNum = ()=>{
                if(initialUserNum < targetUserNum  && initialPostNum < targetPostNum){
                    initialUserNum+= Usertime;
                    initialPostNum+= Posttime;
                    setUserCount(initialUserNum);
                    setPostCount(initialPostNum);
                    setTimeout(updateNum , 15)
                }
            }
            updateNum();
            
            

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className=" w-[100vw] h-fit bg-[#080c21] py-2">
            <div className="my-3 border-2 border-white w-[95vw] h-[15vh] bg-white mx-auto rounded-lg flex justify-center items-center gap-96" >

                <div>
                    
                    <h2 ref={myRef} className="counter text-5xl font-bold">
                        {
                            userCount
                        }+
                    </h2>
                    <p className=" text-3xl font-semibold text-gray-800">
                        Users
                    </p>
                </div>

                <div>
                <h2 ref={myRef} className="counter text-5xl font-bold" data-number="50">
                {
                            postCount
                        }+
                    </h2>
                    <p className=" text-3xl font-semibold">
                        Posts
                    </p>
                </div>

            </div>
        </div>
    )
}

export default Counternum;