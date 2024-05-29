import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { User, getDataById } from "../services/user"

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
    
    const removeProduct = async(indexProduct:number) => {
            if(infosUser){
                const updatedCart = infosUser.Cart.filter((_product,index) => index !== indexProduct)
                const updatedInfos = {...infosUser, Cart:updatedCart}

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
        <div>
            <header>
                <div>
                    <h1>Bem vindo ao seu carrinho {infosUser?.FirstName}</h1>
                    <p>Pronto para finalizar sua compra?</p>
                </div>
                <nav>
                    <Link to={`/commercial/${UserID}`}><button>Voltar</button></Link>
                </nav>
            </header>
            <main>
                <section>
                    <h3>Aqui estão suas compras!</h3>
                    <table>
                        <thead>
                            <tr>
                                <th scope="col"><h1>Produto</h1></th>
                                <th scope="col"><h1>Preço</h1></th>
                            </tr>
                            </thead>
                            <tbody>
                    {infosUser?.Cart.length || undefined ?  infosUser?.Cart.map((user, index) =>(
                       <tr key={index}>
                        <th scope="row">{user.name}</th>
                        <th>R$ {user.price}</th>
                        <th><button onClick={() => removeProduct(index)}>Remover</button></th>
                       </tr>
                    )): <></> }
                        </tbody>
                        <tfoot>
                            <tr>
                                <th scope="row">Valor Total</th>
                                <td>R$ {TheTotal}</td>
                            </tr>
                        </tfoot>
                    </table>
                </section>
            </main>
        </div>
        
    )
}