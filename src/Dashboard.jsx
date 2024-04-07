import React, {useEffect, useState} from "react";
import LogIn from "./LogIn";

import "./LoadingPage.css";

const logo = require('./logo.png');
function Dashboard(){

    const [token, setToken] = useState("");
    const [data, setData] = useState({})
    const [user, setUser] = useState("")
    const [userName, setUserName] = useState("")
    const [option, setOption] = useState("")

    const getReturnedParams = (hash) => {
        const stringAfterHash = hash.substring(1);
        const paramsInUrl = stringAfterHash.split("&");
        const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
            console.log(currentValue);
            const [key, value] = currentValue.split("=");
            accumulater[key] = value;
            return accumulater;
        }, {})


        return paramsSplitUp;
    }

    useEffect(() => {
        if (window.location.hash) {
            const { access_token, expires_in, token_type } =
                getReturnedParams(window.location.hash);

            localStorage.clear();
            localStorage.setItem("accessToken", access_token);
            localStorage.setItem("tokenType", token_type);
            localStorage.setItem("expiresIn", expires_in);



        }
    }, []);

    // for chagning the variables
    useEffect(() => {

        const fn = async () => {
            if (localStorage.getItem("accessToken")) {
                setToken(localStorage.getItem("accessToken"));

                const res = await fetch('https://api.spotify.com/v1/me/', {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("accessToken"),
                    }
                })
                const userInfo = await res.json();
                console.log(userInfo)
                
                setUser(userInfo)
            }
        }

        fn()

    }, [])


    useEffect(()=>{
            if(user.display_name!==undefined){
                // console.log(user.display_name.charAt(0).toUpperCase()+user.display_name.substring(1))
                setUserName(user.display_name.charAt(0).toUpperCase()+user.display_name.substring(1))
            }

    }, [user])

    const selectOption = (option) => {
       
        if (option == "dash-menu-item1"){
            
            let optionItem = document.getElementsByClassName("dash-menu-item1")[0];
            optionItem.style.border = "2px solid rgb(186, 90, 66)";
            let option2 = document.getElementsByClassName("dash-menu-item2")[0];
            option2.style.border = "none";
            setOption("one")
        }
        else if (option == "dash-menu-item2"){
            let optionItem = document.getElementsByClassName("dash-menu-item2")[0];
            optionItem.style.border = "2px solid rgb(186, 90, 66)";
            let option2 = document.getElementsByClassName("dash-menu-item1")[0];
            option2.style.border = "none";
            setOption("two")
        }
        else {
            let optionItem = document.getElementsByClassName("dash-menu-item2")[0];
            optionItem.style.border = "none";
            let option2 = document.getElementsByClassName("dash-menu-item1")[0];
            option2.style.border = "none";
            setOption("")
        }

    }

    const submitOption = () => {
        console.log("sdfs");
        if (option=="one")
            window.location.href = "/genres";
        else if(option =="two")
            window.location.href = "/search";
    }


    return(
        <div>
           <div className="NavbarHolder">
                <nav class="bg-white dark:bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
                    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                        <a href="https://google.com/" target="_blank" class="flex items-center space-x-3 rtl:space-x-reverse">
                            <img src={logo} class="h-12" />
                            <span class="self-center text-4xl font-thin font-semibold whitespace-nowrap text-orange-400">Melo<span class="self-center text-4xl font-semibold whitespace-nowrap text-orange-500">Match</span></span>
                        </a>
                        <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                            <div type="div" class=" text-[17px]  text-white bg-orange-800 focus:ring-4 focus:outline-none focus:ring-transparent font-medium rounded-lg text-base px-4 py-2 text-center dark:hover:bg-orange-700">Welcome,{ " " + userName}</div>
                        </div>
                    </div>
                </nav>
            </div>
            <div className="dash-title">
                Create Your Own Melodic Master Piece.
            </div>
            <div className="dash-menu">
                <button className="dash-menu-item1" onClick={()=>{selectOption("dash-menu-item1")}}>
                    <div className="item1-title" >
                        <p>Song Shuffle</p>
                    </div>
                    <div className="item1-descrip">
                        <p>You have the option to select upto 15 genres to curate your own custom playlist. Then you are repeatedly given the option between two songs that are personally selected based on your previous selection of songs. At the end of this process, you will have as custom playlist ready for you in your spotify account.</p>
                    </div>
                </button>
                <button className="dash-menu-item2" onClick={()=>{selectOption("dash-menu-item2")}}>
                    <div className="item2-title">
                        <p>Compose Your Own</p>
                    </div>
                    <div className="item2-descrip">
                        <p>Choose upto 5 songs to prompt the model with and get a list of upto a 100 similar songs. You can listen to each title suggested and finalize a playlist that you can export to your spotify playlist.</p>
                    </div>
                </button>
            </div>
            <div className="button-holder">
                <button onClick={()=>{submitOption()}}>Next</button>
            </div>
        </div>
    )
}

export default Dashboard;