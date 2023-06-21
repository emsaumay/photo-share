import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";

import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/Components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/Components/UIElements/LoadingSpinner";
import PlaceList from "../components/PlaceList";

const UserPlaces = props => {
    const {isLoading, error, clearError, sendRequest} = useHttpClient()
    const [loadedPlaces, setLoadedPlaces] = useState(null)

    const {userId} = useParams();

    useEffect(() => {
        const getPlaces = async () => {
            try{
                const response = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`)
                setLoadedPlaces(response.user)
            }
            catch(err){
                console.log(err)
            }
        }
        getPlaces();
    }, [])

    return(
        <div>
            <ErrorModal error={error} onClear={clearError}/>
        {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
            {!isLoading && loadedPlaces && <PlaceList user={loadedPlaces} showEdit={false}/>}
        </div>
    )
}

export default UserPlaces