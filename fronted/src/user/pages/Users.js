import React from "react";
// import { BrowserRouter as Router } from "react-router-dom";
import {UserData} from "../../shared/UserData"
import UsersList from "../components/UsersList";

const Users = () => {
    return <div>
       <UsersList items={UserData}/>
    </div>
}

export default Users;