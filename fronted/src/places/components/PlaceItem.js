import React from "react"; 
import Button from "../../shared/Components/FormElements/Button";
import "./PlaceItem.css"

const PlaceItem = props => {
    return(
        <li>
            <div class="card">
                <img src={props.image} alt={props.name}/>
                <div className="card-content">
                    <h2 className="card-title">{props.name}</h2>
                    <p className="card-caption">{props.caption}</p>
                    <hr className="card-line"/>
                    <div className="card-buttons">
                    <Button inverse>View on Map</Button>
                    <Button to={`places/${props.id}`}>Edit</Button>
                    <Button inverse>Delete</Button>
                    </div>
                </div>
            </div>
        </li>
        
      
    )
}

export default PlaceItem;