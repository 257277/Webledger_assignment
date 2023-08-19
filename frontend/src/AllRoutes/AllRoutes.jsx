import React from "react";
import {Routes,Route} from "react-router-dom"
import LoginSignup from "../Pages/login-signup";
import Home from "../Pages/home";
import Favourite from "../Pages/favourite";
import Detail from "../Pages/Detail";
export default function AllRoutes()
{
    return (
        <div>
         <Routes>
            <Route path="/" element={<LoginSignup/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/favourite" element={<Favourite/>}></Route>
            <Route path="/detail/:id" element={<Detail/>}></Route>
         </Routes>
        </div>
    )
}