import React from "react";
import UserItem from "./UserItem";
import "./UsersList.css"

function UsersList(props){
    if(props.items.length === 0){
        return( 
            <div>
                <h2>No Users found</h2>
            </div>
        )
    }
    
    return <ul className="user-list">
        {props.items.map(x => {
            const {id, name, age, image, occupation, city, place, places } = x    
            return (
                <UserItem
                    key={id}
                    id={id}
                    name={name}
                    age={age} 
                    image={image}
                    occupation={occupation}
                    city={city}
                    place={place}
                    places={places}
                />)
            })}

        
    </ul>
}

export default UsersList;