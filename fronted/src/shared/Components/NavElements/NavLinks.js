import React, {useContext} from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";
import "./NavLinks.css"

const NavLinks = (props) => {
    const Auth = useContext(AuthContext);
    return(
        <ul className="nav-links">
            
            <li>
                <NavLink to="/" exact>All Users</NavLink>
            </li>
            {Auth.isLoggedin ?
            <> 
                <li>
                    <NavLink to="/u1/place">My Places</NavLink>
                </li>
                <li>
                    <NavLink to="/places/new">Add Place</NavLink>
                </li>
                <li>
                    <NavLink to="/auth" onClick={Auth.logout}>Logout</NavLink>
                </li>
            </> :
            <>
                <li>
                    <NavLink to="/auth">Auth</NavLink>
                </li>
                
            </>
            }
        </ul>
    )
}

export default NavLinks;