import { myAxiosInstance } from "../../../axios"

export const loginUser = async () => {
            
    try{
        await myAxiosInstance.post("/accounts/login_user/", {
            email: "abc@gmail.com",
            password: "abc"
        })
    }catch (err){
        console.log(err)
    }

}