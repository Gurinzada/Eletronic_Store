import { createBrowserRouter } from "react-router-dom";
import Start from "./Pages/Start";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Commercial from "./Pages/Commercial";
import PrivateRoute from "./components/PrivateRoute";
import Cart from "./Pages/Cart";
import Profile from "./Pages/Profile";


const Router = createBrowserRouter([
    {
        path:"/",
        element: <Start/>
    },{
        path:"/register",
        element:<Register/>
    },{
        path: "/login",
        element:<Login/>
    },{
        path:"/commercial/:UserID",
        element:<PrivateRoute><Commercial/></PrivateRoute>
    },{
        path:"/commercial/cart/:UserID",
        element:<Cart/>
    },{
        path:"/commercial/profile/:UserID",
        element:<Profile/>
    }
])

export default Router