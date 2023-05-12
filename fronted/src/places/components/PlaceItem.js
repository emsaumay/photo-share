import React, { useState } from "react"; 
import Button from "../../shared/Components/FormElements/Button";
import Map from "../../shared/Components/UIElements/Map";
import Modal from "../../shared/Components/UIElements/Modal";
import "./PlaceItem.css"

const PlaceItem = props => {
    const [showMap, setShowMap] =useState(false);

    const openMapHandler = () => setShowMap(true)

    const closeMapHandler = () => setShowMap(false)

    return(
    <>
        <Modal 
            show={showMap} 
            onCancel={closeMapHandler} 
            header={props.name} 
            contentClass=""
            footerClass=""
            footer={<Button onClick={closeMapHandler}>Close</Button>}
        >
            <div className="map-container">
                <Map location={props.name} zoom={8}/>
            </div>
        </Modal>
        <li>
            <div className="card">
                <img src={props.image} alt={props.name}/>
                <div className="card-content">
                    <h2 className="card-title">{props.name}</h2>
                    <p className="card-caption">{props.caption}</p>
                    <hr className="card-line"/>
                    <div className="card-buttons">
                        <Button inverse onClick={openMapHandler}>View on Map</Button>
                        <Button to={`places/${props.id}`}>Edit</Button>
                        <Button inverse>Delete</Button>
                    </div>
                </div>
            </div>
        </li>
    </>    
      
    )
}

export default PlaceItem;