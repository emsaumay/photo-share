import React from "react";
import { Link } from "react-router-dom";
import "./UserItem.css"

function UserItem(props){
    return(
        <Link to={`u${props.id}/places`} className="user-link">
            <li className="user-info">
                <div className="user-image-container">
                    <img className="user-image" src={props.image} alt={props.name}/>

                </div>
                <div className="user-text">
                    <div className="user-text-first">
                        <h2 className="user-name">{props.name}</h2>
                        <p className="user-location">{props.city}</p>

                    </div>
                    <p className="user-occupation">{props.occupation}</p>
                    <h5 className="user-places">{props.place} {props.place === 1 ? "Place" : "Places"}</h5>
                 
                </div>
            </li>
        </Link>

    )
}

export default UserItem;