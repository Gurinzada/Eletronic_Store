import { useState } from "react"
import { Address, CheckDuplicates, CheckPassword, Products, User} from "../services/user"
import { useAuth } from "../context/AuthProvider"
import { Link, useNavigate } from "react-router-dom"
import iconMaster from "../imgs/IconMaster.webp"
import styles from "../Styles/Login.module.scss"
import typeStyles from "../Styles/Start.module.scss"
import { TypeAnimation } from "react-type-animation"

export default function Register(){
    const [firstName, setFirstName] = useState(``)
    const [secondName, setSecondName] = useState(``)
    const [age, setAge] = useState(1)
    const [email, setEmail] = useState(``)
    const [password, setPassword] = useState(``)
    const [cartArrayEmpty] = useState<Products[]>([])
    
    const navigate = useNavigate()
    const {login} = useAuth()

    const handleSubmit = async(e:React.FormEvent) => {
        e.preventDefault()
        const check:boolean = await CheckDuplicates(email)
        const passwordCheck = CheckPassword(password)

        if(check && passwordCheck){        
        const newUser:User = {
            FirstName: firstName,
            SecondName: secondName,
            Age: age,
            email: email,
            password: password,
            Cart: cartArrayEmpty,
            Address: []
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
        <main className={styles.WrapperLogin}>
            <form method="POST" onSubmit={handleSubmit} className={styles.Form}>
                <h1>Faça seu cadastro!</h1>
                <div className={styles.Content}>
                    <label htmlFor="FirstName">Primeiro Nome:</label>
                    <input type="text" id="FirstName" required value={firstName} onChange={(e) => setFirstName(e.target.value)} className={styles.Input}/>
                </div>
                <div className={styles.Content}>
                    <label htmlFor="SecondName">Sobrenome:</label>
                    <input type="text" id="SecondName" required value={secondName} onChange={(e) => setSecondName(e.target.value)} className={styles.Input}/>
                </div>
                <div className={styles.Content}>
                    <label htmlFor="Age">Idade:</label>
                    <input type="number" id="Age" required step={1} value={age} onChange={(e) => setAge(Number(e.target.value))} className={styles.Input}/>
                </div>
                <div className={styles.ContentDif}>
                    <div className={styles.ContentDiv}>
                    <label htmlFor="Email">Email:</label>
                    <input type="email" id="Email" required value={email} onChange={(e) => setEmail(e.target.value)} className={styles.Input}/>
                    </div>
                    
                    <div className={styles.ContentDiv}>
                        <label htmlFor="Password">Senha:</label>
                        <input type="password" id="Password" required value={password} onChange={(e) => setPassword(e.target.value)} className={styles.Input}/>
                    </div>
                    <div>
                        <button className={styles.Bnt}>Cadastrar</button>
                    </div>
                    <div className={styles.ContentAdvice}>
                        <h4>Já possui uma conta?</h4>
                        <Link to={"/login"}><button className={styles.Bnt}>Fazer login!</button></Link>
                    </div>
                </div>
            </form>
            <section className={styles.ContentLogo}>
                <div>
                <TypeAnimation sequence={[
                        "Bem vindo a Pixel!",
                        1000,
                        "Faça seu cadastro agora e aproveite 😊!",
                        1000
                    ]}
                    wrapper="h2"
                    speed={50}
                    repeat={Infinity}
                    className={typeStyles.TypeAnimation}
                    />
                </div>
                <img src={iconMaster} alt="" className={styles.ImgLogo}/>
            </section>
        </main>
    )
}