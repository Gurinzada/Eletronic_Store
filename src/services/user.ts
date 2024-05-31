export interface User{
    id?:string|undefined
    FirstName:string,
    SecondName:string,
    Age:number,
    email:string,
    password:any,
    Address:[Address] | []
    Cart:Products[]
}

export type Products = {
    id:number,
    name:string,
    price:number,
    url:string
}

export type Address = {
    Street: string
    Neighborhood:string
    HouseNumber:number
    cep:string,
}

export async function getDataById(id:string|undefined){
    const response = await fetch(`${import.meta.env.VITE_PUBLIC_APIURL}/${id}`)
    const data:User = await response.json()
    return data
}

export async function getAllDatas() {
    const response = await fetch(import.meta.env.VITE_PUBLIC_APIURL)
    const data:User[] = await response.json()
    return data
}

export async function CheckDuplicates(email:string) {
    const response = await getAllDatas()
    const find = response.find((user) => user.email === email)
    if(find){
        return false
    } else{
        return true
    }
}

export function CheckPassword(password:any){
    const regexPassword = /^([a-zA-Z0-9]{6,})$/gm
    const myReturn = regexPassword.test(password)
    if(!myReturn){
        throw new Error(`At least six characters`)
    } else{
        return true
    }
}

export function CheckCep(cep:string){
    const regexCep = /^([0-9]{5}-[0-9]{3})$/gm
    const myCepIsValid = regexCep.test(cep)
    if(!myCepIsValid){
        return false
    } else{
        return true
    }
}

