import { Link, useParams } from "react-router-dom";
import { User, getDataById } from "../services/user";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import myProducts from "../../dataimage.json";
import { Bounce, ToastContainer, toast } from "react-toastify";
import 'react-toastify/ReactToastify.css';

export default function Commercial() {
  const { UserID } = useParams();
  const [infosUser, setInfosUser] = useState<User | null>(null);
  const [changeState, setChangeState] = useState(false);
  const { logout } = useAuth();

  const datas = async () => {
    const get = await getDataById(UserID);
    return get;
  }

  useEffect(() => {
    datas().then((res: User) => setInfosUser(res));
    console.log(infosUser);
  }, [changeState]);

  const handleLogout = () => {
    logout();
  };

  const message = (productName:string) => {
    toast.success(`${productName} adicionado com sucesso! Aproveite 😊`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "light",
      transition: Bounce,
    })
  }
  const handleNotify = async (index: number) => {
    const product = myProducts[index];
    message(product.name)
    if (infosUser) {
      const updatedInfos = {
        ...infosUser,
        Cart: [...(infosUser.Cart || []), product]
      };
      
      await fetch(`${import.meta.env.VITE_PUBLIC_APIURL}/${UserID}`, {
        method: "PUT",
        body: JSON.stringify(updatedInfos),
        headers: {
          "Content-Type": "application/json"
        }
      });
      setChangeState(prev => !prev);
    }
  };

  return (
    <div>
      <header>
        <div>
          <h1>
            Seja bem vindo {infosUser?.FirstName}
          </h1>
        </div>
        <nav>
          <Link to={`/commercial/cart/${UserID}`}><button>Carrinho</button></Link>
          <button onClick={handleLogout}>Logout</button>
        </nav>
      </header>

      <main>
        <section>
          <div>
            {myProducts.length > 0 ? (
              myProducts.map((product, index) => (
                <div key={product.id}>
                  <div>
                    <img src={product.url} alt={product.name} />
                  </div>
                  <div>
                    <h3>{product.name}</h3>
                  </div>
                  <div>
                    <h4>R${product.price}</h4>
                  </div>
                  <div>
                    <button onClick={() => handleNotify(index)}>Comprar agora!</button>
                  </div>
                </div>
              ))
            ) : (
              <h1>Houve um erro ao carregar os produtos!</h1>
            )}
          </div>
        </section>
        <ToastContainer />
      </main>
    </div>
  );
}
