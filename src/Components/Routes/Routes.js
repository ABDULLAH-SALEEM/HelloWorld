import { Routes as AppRoutes, Route } from "react-router-dom";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import AppBody from "../AppBody/AppBody";
import Settings from "../Settings/Settings";
import CurrentUserProfile from "../CurrentUserProfile/CurrentUserProfile";
import SearchedUserProfile from "../SearchedUserProfile/SearchedUserProfile";

const Routes = () => {

    return (
        <AppRoutes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<AppBody />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<CurrentUserProfile />} />
            <Route path="/user/:id" element={<SearchedUserProfile />} />
            
        </AppRoutes>
    )
}

export default Routes
