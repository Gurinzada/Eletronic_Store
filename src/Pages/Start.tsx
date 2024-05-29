import { Link } from "react-router-dom"
import DefaultFooter from "../components/DefaultFooter"
import foneGamer from '../imgs/FoneGamerStartPage.webp'
import xboxControl from "../imgs/XboxControlStartPage.webp"
import ps5Control from "../imgs/ControllPS5StartPage.webp"
import notebook from "../imgs/NotebookStartPage.webp"
import iphoneApple from "../imgs/IphoneStartPage.webp"

const Start = () => {
    return (
        <div>
            <header>
                <div>
                    <h1>PixelPioneer, a sua loja de Eletrônicos</h1>
                </div>
                <nav>
                    <Link to={"/login"}>Entrar</Link>
                    <Link to={"/register"}>Cadastrar</Link>
                </nav>
            </header>
            <main>
                <section>
                    <div><h2>PixelPioneer, a melhor escolha para você consumidor!</h2></div>
                    <div><h3>Encontre os melhores produtos aqui!</h3></div>
                </section>
                <section>
                   <img src={foneGamer} alt="" />
                   <img src={iphoneApple} alt="" />
                   <img src={notebook} alt="" />
                   <img src={ps5Control} alt="" />
                   <img src={xboxControl} alt="" />
                </section>
            </main>
            <DefaultFooter/>
        </div>
    )
}

export default Start