import { createBrowserRouter } from "react-router-dom";
import Start from "./Pages/Start";
import Register from "./Pages/Register";
import Login from "./Pages/Login";


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
        path:"/commercial/:UserID"
    }
])

export default Router