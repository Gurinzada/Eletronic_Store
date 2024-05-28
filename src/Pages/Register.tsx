import { useState } from "react"
import { User } from "../services/user"

export default function Register(){
    const [firstName, setFirstName] = useState(``)
    const [secondName, setSecondName] = useState(``)
    const [age, setAge] = useState(0)
    const [email, setEmail] = useState(``)
    const [password, setPassword] = useState(``)

    const handleSubmit = async() => {
        const newUser:User = {
            FirstName:firstName,
            SecondName:secondName,
            Age:age,
            email:email,
            password:password,
        }

        const response = await fetch(`http://localhost:3000/store`,{
            method:"POST",
            body: JSON.stringify()
        })
    }
    return(
        <main>
            <form action="POST" onSubmit={handleSubmit}>
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
                </div>
            </form>
        </main>
    )
}