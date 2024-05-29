import { Link } from "react-router-dom"
import DefaultFooter from "../components/DefaultFooter"

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
                   <img src="../imgs/FoneGamerStartPage.webp" alt="" />
                   <img src="../imgs/IphoneStartPage.webp" alt="" />
                   <img src="../imgs/NotebookStartPage.webp" alt="" />
                   <img src="../imgs/ControllPS5StartPage.webp" alt="" />
                   <img src="../imgs/XboxControlStartPage.webp" alt="" />
                </section>
            </main>
            <DefaultFooter/>
        </div>
    )
}

export default Start