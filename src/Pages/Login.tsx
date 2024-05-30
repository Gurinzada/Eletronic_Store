import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { User, getAllDatas } from "../services/user"
import { useAuth } from "../context/AuthProvider"
import iconMaster from "../imgs/IconMaster.webp"
import styles from "../Styles/Login.module.scss"
import typeStyles from "../Styles/Start.module.scss"
import { TypeAnimation } from "react-type-animation"

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
        <main className={styles.WrapperLogin}>
            <form onSubmit={handleLogin} className={styles.Form}>
                <div>
                    <h1>Bem vindo a PixelPioneer</h1>
                </div>
                <div className={styles.Content}>
                    <label htmlFor="email" className={styles.label}>Email</label>
                    <input type="email" id="email" required value={userName} onChange={(e) => setUserName(e.target.value)} className={styles.Input}/>
                </div>
                <div className={styles.Content}>
                    <label htmlFor="password" className={styles.label}>Senha</label>
                    <input type="password" id="password" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} className={styles.Input}/>
                </div>
                <div>
                    <button className={styles.Bnt}>Entrar</button>
                </div>
                <div className={styles.ContentAdvice}>
                    <h4>Ainda não possui uma conta?</h4>
                    <Link to={"/register"}><button className={styles.Bnt}>Cadastre-se</button></Link>
                </div>
            </form>
            <section className={styles.ContentLogo}>
                <div>
                <TypeAnimation sequence={[
                        "Bem vindo a Pixel!",
                        1000,
                        "Faça seu login agora e aproveite 😊!",
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