import React from "react"; 

import "./PlaceList.css"

import PlaceItem from "./PlaceItem";


const PlaceList = props => {
    return(
        <ul className="places-list">
            {props.user.map(place => {
                return (<PlaceItem
                    key={place._id}
                    id={place._id}
                    name={place.name}
                    image={`${process.env.REACT_APP_ASSET_URL}/${place.image}`}
                    caption={place.caption}
                    showEdit = {props.showEdit}
                    onDelete={props.onDelete}
                />
            )})}
        </ul>
        // <div>{UserData[props.user].name}</div>
    )
}

export default PlaceList;
