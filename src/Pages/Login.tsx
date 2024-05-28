import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { User, getAllDatas } from "../services/user"
import { useAuth } from "../context/AuthProvider"

export default function Login(){
    const [infosUsers, setInfosUsers] = useState<User[]>([])
    const [userName, setUserName] = useState(``)
    const [userPassword, setUserPassword] = useState(``)
    const navigate = useNavigate()
    const { login } = useAuth()

    const datas = async () => {
        const data = await getAllDatas()
        return data
    }


    useEffect(() => {
        datas().then((res:any) => setInfosUsers(res))
        console.log(infosUsers)
    },[])

    const handleLogin = (e:React.FormEvent) => {
        e.preventDefault()

        const findThisUser = infosUsers.find((user) => user.email === userName && user.password === userPassword)
        if(findThisUser){
            login(findThisUser)
            navigate(`/commercial/${findThisUser.id}`)
        }
            
    }

    return(
        <main>
            <form onSubmit={handleLogin}>
                <div>
                    <h1>Bem vindo a PixelPioneer</h1>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" required value={userName} onChange={(e) => setUserName(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="password">Senha</label>
                    <input type="password" id="password" value={userPassword} onChange={(e) => setUserPassword(e.target.value)}/>
                </div>
                <div>
                    <button>Entrar</button>
                </div>
                <div>
                    <h4>Ainda não possui uma conta?</h4>
                    <Link to={"/register"}><button>Cadastra-se</button></Link>
                </div>
            </form>
        </main>
    )
}