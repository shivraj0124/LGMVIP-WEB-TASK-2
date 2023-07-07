import React, { useState } from 'react'
import { CSSProperties } from 'react';
import axios from 'axios';
import {ThreeCircles }from "react-loader-spinner";

const override: CSSProperties = {
    margin: "100px 0",
    justifyContent:"center",
};

export default function Home() {
    const [users, setUsers] = useState([]);
    const [loader, setLoader] = useState(false)
    const [content,setContent]=useState(true)
 
    const handleOnclick = (e) => {
        setContent(false)
        setLoader(true)
        setTimeout(() => {
            axios.get("https://reqres.in/api/users?page=1").then((response) => {
                const result = response.data.data;
                setLoader(false)
                setUsers(result)
            }).catch(err => {
                setLoader(false) 
                alert(err)
                setContent(true)
            })                        
            
        },3000)
    }
    return (

        <>
            {/* Navbar */}
            <div className="navbar">
                <h1 className="logo" >LGM</h1>

                <button onClick={handleOnclick} className="getusers" >Get Users</button>
            </div>

            <div className="outer">
                { !loader ?
                    content ?                    
                        <h1 className='initial' >Click on Get Users to get the users informaton</h1>
                        :""
                       :"" 
                }
            

                {loader ?
                <div className='Ldr-div'>
                   <ThreeCircles
                        height="100"
                        width="100"
                        wrapperClass=""
                        visible={true}
                        ariaLabel="three-circles-rotating"
                        outerCircleColor="#0B2447"
                        innerCircleColor="#19376D"
                        middleCircleColor="#576CBC"
                    />
                    </div> :

                    users.map((item, e) => {
                        return (
                            <div className="card" id={e}>
                                <img src={item.avatar} alt="" className="image" />
                                <p><b>Id:</b> {item.id}</p>
                                <p><b>Name:</b> {item.first_name}  {item.last_name}</p>
                                <p><b>Email:</b> {item.email}</p>
                            </div>
                        )
                    })

                }
            </div>
        </>
    )
}