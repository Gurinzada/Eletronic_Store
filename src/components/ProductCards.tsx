import myProducts from "../../dataimage.json"

export default function ProductCard () {
    return(
        <div>
            {myProducts.length > 0 ? myProducts.map((product) => (
                <>
                    <div key={product.id}>
                        <img src={product.url}/>
                    </div>
                    <div>
                        <h3>{product.name}</h3>
                    </div>
                    <div>
                        <h4>R${product.price}</h4>
                    </div>
                </>
            )) : <h1>Houve um erro ao carregar os produtos!</h1>}
        </div>
    )
}