import { Link } from "react-router-dom"
import DefaultFooter from "../components/DefaultFooter"
import foneGamer from '../imgs/FoneGamerStartPage.webp'
import xboxControl from "../imgs/XboxControlStartPage.webp"
import ps5Control from "../imgs/ControllPS5StartPage.webp"
import notebook from "../imgs/NotebookStartPage.webp"
import iphoneApple from "../imgs/IphoneStartPage.webp"
import iconMaster from "../imgs/IconMaster.webp"
import { TypeAnimation } from "react-type-animation"
import styles from "../Styles/Start.module.scss"

const Start = () => {
    return (
        <div className={styles.Wrapper}>
            <header className={styles.HeaderWrapper}>
                <div>
                    <img src={iconMaster} alt="" className={styles.Icon}/>
                </div>
                <div>
                    <h1>PixelPioneer, a sua loja de Eletrônicos</h1>
                </div>
                <nav className={styles.NavBar}>
                    <Link to={"/login"}><button className={styles.button}>Entrar</button></Link>
                    <Link to={"/register"}><button className={styles.button}>Cadastrar</button></Link>
                </nav>
            </header>
            <main className={styles.MainWrapper}>
                <section>
                    <div><h2 className={styles.StaticText}>PixelPioneer, a melhor escolha para você consumidor!</h2></div>
                    <TypeAnimation sequence={[
                        "Temos todos os tipos de eletronicos!",
                        1000,
                        "Desde celulares a computadores!",
                        1000,
                        "Corra corra, e aproveite as melhores promoções!",
                        1000
                    ]}
                    wrapper="h2"
                    speed={50}
                    repeat={Infinity}
                    className={styles.TypeAnimation}
                    />
                </section>
                <section className={styles.WrapperImgs}>
                   <img src={foneGamer} alt="" className={styles.Img}/>
                   <img src={iphoneApple} alt="" className={styles.Img}/>
                   <img src={notebook} alt="" className={styles.Img}/>
                   <img src={ps5Control} alt="" className={styles.Img}/>
                   <img src={xboxControl} alt="" className={styles.Img}/>
                </section>
            </main>
            <DefaultFooter/>
        </div>
    )
}

export default Start