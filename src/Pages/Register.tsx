import { useState } from "react"
import { CheckDuplicates, CheckPassword, Products, User} from "../services/user"
import { useAuth } from "../context/AuthProvider"
import { Link, useNavigate } from "react-router-dom"

export default function Register(){
    const [firstName, setFirstName] = useState(``)
    const [secondName, setSecondName] = useState(``)
    const [age, setAge] = useState(1)
    const [email, setEmail] = useState(``)
    const [password, setPassword] = useState(``)
    const [cartArrayEmpty, setArrayCart] = useState<Products[]>([])
    const navigate = useNavigate()
    const {login} = useAuth()

    const handleSubmit = async(e:React.FormEvent) => {
        e.preventDefault()
        const check:boolean = await CheckDuplicates(email)
        const passwordCheck = CheckPassword(password)

        if(check && passwordCheck){        
        const newUser:User = {
            FirstName:firstName,
            SecondName:secondName,
            Age:age,
            email:email,
            password:password,
            Cart:cartArrayEmpty
        }

        const response = await fetch(import.meta.env.VITE_PUBLIC_APIURL,{
            method:"POST",
            body: JSON.stringify(newUser),
            headers:{
                "Content-Type": "application/json"
            }
        })

            const getMyId = await response.json()
            login(newUser)
            navigate(`/commercial/${getMyId.id}`)

        } else{
            console.error(`Password or Email cannot be right`)
        }      
    }
    return(
        <main>
            <form method="POST" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="FirstName">Primeiro Nome:</label>
                    <input type="text" id="FirstName" required value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="SecondName">Sobrenome:</label>
                    <input type="text" id="SecondName" required value={secondName} onChange={(e) => setSecondName(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="Age">Idade:</label>
                    <input type="number" id="Age" required step={1} value={age} onChange={(e) => setAge(Number(e.target.value))}/>
                </div>
                <div>
                    <div>
                    <label htmlFor="Email">Email:</label>
                    <input type="email" id="Email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    
                    <div>
                        <label htmlFor="Password">Senha:</label>
                        <input type="password" id="Password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div>
                        <button>Cadastrar</button>
                    </div>
                    <div>
                        <h4>Já possui uma conta?</h4>
                        <Link to={"/login"}><button>Fazer login!</button></Link>
                    </div>
                </div>
            </form>
        </main>
    )
}