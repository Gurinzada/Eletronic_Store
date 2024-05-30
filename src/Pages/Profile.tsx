import { Link, useParams } from "react-router-dom";
import style from "../Styles/Commercial.module.scss";
import { useAuth } from "../context/AuthProvider";
import { useEffect, useState } from "react";
import { User, getDataById } from "../services/user";
import DefaultFooter from "../components/DefaultFooter";

export default function Profile() {
  const [infosUser, setInfosUser] = useState<User | null>(null);
  const { logout } = useAuth();
  const { UserID } = useParams();

  const handleLogout = () => {
    logout();
  };

  const datas = async () => {
    const get = await getDataById(UserID);
    return get;
  };

  useEffect(() => {
    datas().then((res: User) => setInfosUser(res));
  });

  return (
    <div>
      <header className={style.HeaderCommercial}>
        <div>
          <h1>Perfil de: {infosUser?.FirstName}</h1>
        </div>
        <nav className={style.NavBar}>
          <Link to={`/commercial/cart/${UserID}`}>
            <button className={style.bntCard}>Carrinho</button>
          </Link>
          <Link to={`/commercial/profile/${UserID}`}>
            <button className={style.bntCard}>Perfil</button>
          </Link>
          <button onClick={handleLogout} className={style.bntCard}>
            Logout
          </button>
        </nav>
      </header>
      <main>
        <form>
            <h2>Adicione suas informações aqui:</h2>
            <div>
                <h3>Endereço</h3>
                <div>
                    <label htmlFor="Street">Rua</label>
                    <input type="text" id="Street" required />
                </div>
                <div>
                    <label htmlFor="Neighborhood">Bairro</label>
                    <input type="text" id="Neighborhood" />
                </div>
                <div>
                    <label htmlFor="HouseNumber">Número</label>
                    <input type="number" id="HouseNumber"/>
                </div>
                <div>
                    <label htmlFor="CEP">CEP</label>
                    <input id="CEP" required maxLength={9} minLength={9}/>
                </div>
            </div>
        </form>
      </main>
      <DefaultFooter/>
    </div>
  );
}
