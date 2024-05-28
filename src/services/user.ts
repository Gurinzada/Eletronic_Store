export interface User{
    id?:string|undefined
    FirstName:string,
    SecondName:string,
    Age:number,
    email:string,
    password:any,
    Cart?:Products[]
}

export type Products = {
    name:string,
    price:number
}

export async function getDataById(id:string|undefined){
    const response = await fetch(`http://localhost:3000/store/${id}`)
    const data:User = await response.json()
    return data
}

export async function getAllDatas() {
    const response = await fetch(`http://localhost:3000/store`)
    const data:User = await response.json()
    return data
}