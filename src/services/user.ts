export interface User{
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