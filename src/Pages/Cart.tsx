import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { User, getDataById } from "../services/user"
import { Bounce, ToastContainer, toast } from "react-toastify"
import 'react-toastify/ReactToastify.css';
import style from "../Styles/Cart.module.scss"

export default function Cart(){
    const {UserID} = useParams()
    const [infosUser, setInfosUser] = useState<User | null>(null)
    const [TheTotal, setTheTotal] = useState<String>(``)
    const [changeState, setChangeState] = useState(false)

    useEffect(() => {
        getDataById(UserID).then((res:User) => setInfosUser(res))
        theTotal()
        console.log(infosUser)
        setChangeState(false)
    },[changeState])

    const theTotal = () => {
        const total = infosUser?.Cart.reduce((actual, current) => actual + current.price, 0 )
         setTheTotal(String(total?.toFixed(2)))
    }

    useEffect(() => {
        theTotal()
    },[infosUser])
    
    const removeProduct = async(indexProduct:number) => {
            if(infosUser){
                const updatedCart = infosUser.Cart.filter((_product,index) => index !== indexProduct)
                const updatedInfos = {...infosUser, Cart:updatedCart}
                toast.success(`Produto removido com sucesso!`, {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                    });
            await fetch(`${import.meta.env.VITE_PUBLIC_APIURL}/${UserID}`,{
                method:"PUT",
                body: JSON.stringify(updatedInfos),
                headers:{
                    "Content-Type": "Application/json"
                }
            })
            setInfosUser(updatedInfos)
            console.log(updatedInfos)
            setChangeState(true)
        }
    }

    return(
        <div className={style.WrapperCart}>
            <header className={style.HeaderCart}>
                <div>
                    <h1>Bem vindo ao seu carrinho {infosUser?.FirstName}</h1>
                    <p>Pronto para finalizar sua compra?</p>
                </div>
                <nav>
                    <Link to={`/commercial/${UserID}`}><button className={style.Bnt}>Voltar</button></Link>
                </nav>
            </header>
            <main>
                <section className={style.SectionTable}>
                    <h3 className={style.TitleH3Cart}>Aqui estão suas compras!</h3>
                    <table >
                        <thead>
                            <tr>
                                <th scope="col"><h1>Produto</h1></th>
                                <th scope="col"><h1>Preço</h1></th>
                            </tr>
                            </thead>
                            <tbody>
                    {infosUser?.Cart.length || undefined ?  infosUser?.Cart.map((user, index) =>(
                       <tr key={index} >
                        <th scope="row">{user.name}</th>
                        <th>R$ {user.price}</th>
                        <th  style={{textAlign:"center"}}><button onClick={() => removeProduct(index)} className={style.BntRemove} style={{color:"white"}}>-</button></th>
                       </tr>
                    )): <></> }
                        </tbody>
                        <tfoot>
                            <tr>
                                <th scope="row">Valor Total</th>
                                <td>R$ {TheTotal === undefined ? 0 : TheTotal}</td>
                            </tr>
                        </tfoot>
                    </table>
                    <ToastContainer/>
                </section>
            </main>
        </div>
        
    )
}