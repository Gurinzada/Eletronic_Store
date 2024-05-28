import { useParams } from "react-router-dom"
import { User, getDataById } from "../services/user"
import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthProvider"

export default function Commercial(){
    const {UserID} = useParams()
    const [infosUser, setInfosUser] = useState<User[]>([])
    const {logout} = useAuth()

    const datas = async() => {
        const get = await getDataById(UserID)
        return get
    }

    useEffect(() => {
        datas().then((res:User) => setInfosUser([res]))
        console.log(infosUser)
    },[])

    const handleLogout = () => {
        logout()
    }
    return(
        <div>
            <header>
                <div><h1>Seja bem vindo {infosUser.length > 0 ? infosUser.map((user) => (user.FirstName)):null}</h1></div>
                <nav>
                    <span>Carrinho</span>
                    <span onClick={handleLogout}>Logout</span>
                </nav>
            </header>
        </div>
    )
}