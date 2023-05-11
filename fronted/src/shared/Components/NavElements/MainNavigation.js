import React from "react";

import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";

import "./MainNavigation.css"
import Logo from "../../Media/Logo/Logo.png"

function NavMain(props) {
    return(
        <MainHeader>
            <nav>
                <div className="logo">
                    <a href="/"><img src={Logo} alt="Logo" className="logo-img"/></a>
                    <h1>NoName</h1>
                </div>
                <NavLinks/>
            </nav>
        </MainHeader>
    )
}

export default NavMain;