
export interface Book{
    id: string 
    title: string 
    author: string 
    isCheckedout: boolean
    returnDate: number // makes dates numbers and store them as unix epoch time
}
// normalized vs embedded data
// embedded should only be access through the parent object

export interface Member{
    id: string
    username: string 
    password: string 
    isEmployee: boolean
    checkedOutBooks: string[]
}
