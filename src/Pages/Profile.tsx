import { Link, useParams } from "react-router-dom";
import style from "../Styles/Commercial.module.scss";
import { useAuth } from "../context/AuthProvider";
import { useEffect, useState } from "react";
import { Address, CheckCep, CheckPassword, User, getDataById } from "../services/user";
import DefaultFooter from "../components/DefaultFooter";
import { Bounce, ToastContainer, toast } from "react-toastify";
import 'react-toastify/ReactToastify.css';
import styleProfile from "../Styles/Profiles.module.scss"

export default function Profile() {
  const [infosUser, setInfosUser] = useState<User | null>(null);
  const [street, setStreet] = useState<string>(``)
  const [neighborhood, setNeighborhood] = useState<string>(``)
  const [houseNumber, setHouseNumber] = useState<number>(0)
  const [cep, setCep] = useState<string>(``)
  const [change, setChange] = useState<boolean>(false)
  const [WrongCep, setWrongCep] = useState<boolean>(false)
  const [password, setPassword] = useState(``)
  const [passwordConfirm, setPasswordConfirm] = useState(``)
  const { logout } = useAuth();
  const { UserID } = useParams();


  const cepIsWrong = () => {
    setWrongCep(true)
    setTimeout(() => {
      setWrongCep(false)
    },3000)
  }

  const handleLogout = () => {
    logout();
  };

  const datas = async () => {
    const get = await getDataById(UserID);
    return get;
  };

  useEffect(() => {
    datas().then((res: User) => setInfosUser(res));
    setChange(false)
  },[change]);

  const handleChangesPassword = async(e:React.FormEvent) => {
    e.preventDefault()
    const passwordIsRigth = CheckPassword(password)
    if(passwordIsRigth && password === passwordConfirm && infosUser){
      const updateInfos = {...infosUser}
      updateInfos.password = password
      toast.success(`Senha atualizada com sucesso! Aproveite 😊`, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "light",
        transition: Bounce,
      })

      await fetch(`${import.meta.env.VITE_PUBLIC_APIURL}/${UserID}`,{
            method:"PUT",
            body: JSON.stringify(updateInfos),
            headers:{
                "Content-Type": "Application/json"
            }
        })

        setInfosUser(updateInfos)
        setChange(true)
        setPassword(``)
        setPasswordConfirm(``)
    } else{
      setPassword(``)
        setPasswordConfirm(``)
      throw new Error(`An error has ocurred!`)
        
    }
  }

  const handleAddress = async(e:React.FormEvent) => {
    e.preventDefault()
    const checkCep = CheckCep(cep)
    if(infosUser && checkCep){
      toast.success(`Endereço ataulizado com sucesso! Aproveite 😊`, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "light",
        transition: Bounce,
      })
        const updatedInfos = {...infosUser}
        const myNewAddress:Address ={
            Street: street,
            cep: cep,
            HouseNumber:houseNumber,
            Neighborhood:neighborhood
        }
        updatedInfos.Address[0] = myNewAddress

        await fetch(`${import.meta.env.VITE_PUBLIC_APIURL}/${UserID}`,{
            method:"PUT",
            body: JSON.stringify(updatedInfos),
            headers:{
                "Content-Type": "Application/json"
            }
        })

        setInfosUser(updatedInfos)
        setCep(``)
        setHouseNumber(0)
        setNeighborhood(``)
        setStreet(``)
        setChange(true)
    } else{
      cepIsWrong()
      throw new Error(`Model of Cep is invalid`)
    }
  }

  return (
    <div className={styleProfile.WrapperProfile}>
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
          <Link to={`/commercial/${UserID}`}>
            <button className={style.bntCard}>Voltar</button>
          </Link>
          <button onClick={handleLogout} className={style.bntCard}>
            Logout
          </button>
        </nav>
      </header>
      <main className={styleProfile.ContentForms}>
        <form onSubmit={handleAddress} className={styleProfile.Forms}>
                <h3>Endereço</h3>
                <div className={styleProfile.ContentForm}>
                    <label htmlFor="Street">Rua</label>
                    <input type="text" id="Street" required value={street} onChange={(e) => setStreet(e.target.value)} placeholder={`Rua | Av XXXXX`}/>
                </div>
                <div className={styleProfile.ContentForm}>
                    <label htmlFor="Neighborhood">Bairro</label>
                    <input type="text" id="Neighborhood" value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} required/>
                </div>
                <div className={styleProfile.ContentForm}>
                    <label htmlFor="HouseNumber">Número</label>
                    <input type="number" id="HouseNumber" value={houseNumber} onChange={(e) => setHouseNumber(Number(e.target.value))} required/>
                </div>
                <div className={styleProfile.ContentForm}>
                    <label htmlFor="CEP">CEP</label>
                    <input id="CEP" required maxLength={9} minLength={9} value={cep} onChange={(e) => setCep(e.target.value)} placeholder={`Ex: 12345-678`} />
                    {WrongCep === true ? <span style={{color: "red"}}>Digite o modelo correto: XXXXX-XXX</span>: null}
                </div>
            
            <button>Atualizar Informações</button>
        </form>
        <form onSubmit={handleChangesPassword} className={styleProfile.Forms}>
          <h3>Dados pessoais</h3>
          <div className={styleProfile.ContentForm}>
            <label htmlFor="UserName">Nome:</label>
            <input disabled value={`${infosUser?.FirstName} ${infosUser?.SecondName}`} id="UserName"/>
          </div>
          <div className={styleProfile.ContentForm}>
            <label htmlFor="EmailUser">Email:</label>
            <input disabled value={infosUser?.email} id="EmailUser"/>
          </div>
          <div className={styleProfile.ContentForm}>
            <label htmlFor="Password">Senha:</label>
            <input type="password" id="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <div className={styleProfile.ContentForm}>
            <label htmlFor="PasswordConfirm">Confirme sua senha:</label>
            <input type="password" id="PasswordConfirm" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)}/>
          </div>
          <div>
            <button>Atualizar Informações</button>
          </div>
        </form>
      </main>
      <ToastContainer />
      <DefaultFooter/>
    </div>
  );
}
