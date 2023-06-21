import React, { useContext, useState } from "react"; 
import Button from "../../shared/Components/FormElements/Button";
import Map from "../../shared/Components/UIElements/Map";
import Modal from "../../shared/Components/UIElements/Modal";
import LoadingSpinner from "../../shared/Components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/Components/UIElements/ErrorModal";


import { useHttpClient } from "../../shared/hooks/http-hook";

import "./PlaceItem.css"
import { AuthContext } from "../../shared/context/auth-context";

const PlaceItem = props => {
    const auth = useContext(AuthContext)

    const {isLoading,error, sendRequest, clearError} = useHttpClient();

    const [showMap, setShowMap] =useState(false);
    const [deleteMessage, setDeleteMessage] = useState(false)

    const opendeleteMessageHandler = () => setDeleteMessage(true)
    const closedeleteMessageHandler = () => setDeleteMessage(false)

    const openMapHandler = () => setShowMap(true)
    const closeMapHandler = () => setShowMap(false)

    const deletePlaceHandler = async () => {
        try{
            await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/${props.id}`, "DELETE",{},{
                Authorization: "Bearer " + auth.token
            })
            // closedeleteMessageHandler()
            props.onDelete(props.id)
        }
        catch(err){
            console.log(err)
        }
    }

    return(
    <>
        <ErrorModal error={error} onClear={clearError} />
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
        <Modal 
            show={deleteMessage}
            onCancel={closedeleteMessageHandler}
            header="Confirm?" 
            footer={isLoading ? <LoadingSpinner/> : <div>
                    <Button danger onClick={deletePlaceHandler}>Yes</Button>
                    <Button onClick={closedeleteMessageHandler} inverse>Cancel</Button>
                </div>
            }
        >
            <p>
                Do you really want to delete this post? Please note that this action is irreversible.
            </p>
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
                        {props.showEdit &&
                        <>
                        <Button to={`edit/${props.id}`}>Edit</Button>
                        <Button inverse onClick={opendeleteMessageHandler}>Delete</Button>
                        </>
                        }
                    </div>
                </div>
            </div>
        </li>
    </>    
      
    )
}

export default PlaceItem;