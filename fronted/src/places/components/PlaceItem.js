import React, { useContext, useState } from "react"; 
import Button from "../../shared/Components/FormElements/Button";
import Map from "../../shared/Components/UIElements/Map";
import Modal from "../../shared/Components/UIElements/Modal";
import LoadingSpinner from "../../shared/Components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/Components/UIElements/ErrorModal";
import { BiUpvote, BiDownvote, BiUpArrow } from "react-icons/bi";

import { useHttpClient } from "../../shared/hooks/http-hook";

import "./PlaceItem.css"
import { AuthContext } from "../../shared/context/auth-context";

const PlaceItem = props => {
    const auth = useContext(AuthContext)

    const {isLoading,error, sendRequest, clearError} = useHttpClient();

    const [showMap, setShowMap] =useState(false);
    const [deleteMessage, setDeleteMessage] = useState(false)
    const [isUpvote, setIsUpvote] = useState(false)

    const opendeleteMessageHandler = () => setDeleteMessage(true)
    const closedeleteMessageHandler = () => setDeleteMessage(false)

    const openMapHandler = () => setShowMap(true)
    const closeMapHandler = () => setShowMap(false)

    const upvoteHandler = () => setIsUpvote(prevVote => !prevVote)

    const deletePlaceHandler = async () => {
        try{
            await sendRequest(`http://localhost:5000/api/places/${props.id}`, "DELETE",{},{
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
            <div className="post-container">
                <div className="post__options-tab">
                    {isUpvote ? <BiUpvote  className="place__post-options" style={{background: "red"}} onClick={upvoteHandler}/> : <BiUpvote className="place__post-options" onClick={upvoteHandler}/>}
                    <p className="place__post-options">{props.upvotes}</p>
                    <BiDownvote className="place__post-options"/>
                </div>
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
            </div>
        </li>
    </>    
      
    )
}

export default PlaceItem;