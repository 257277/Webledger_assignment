import React from "react";
import {Routes,Route} from "react-router-dom"
import LoginSignup from "../Pages/login-signup";

export default function AllRoutes()
{
    return (
        <div>
         <Routes>
            <Route path="/" element={<LoginSignup/>}/>
         </Routes>
        </div>
    )
}