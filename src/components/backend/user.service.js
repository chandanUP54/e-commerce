import axios from "axios";
// connected to e-com-spring

export const BASE_API_URL="https://e-com-ukfi.onrender.com"
// export const BASE_API_URL="http://localhost:8071"
class UserService{

    saveUser(user){
    return axios.post(BASE_API_URL+"/auth/signup",user)
    }
    loginUser(loginRequest){
        return axios.post(BASE_API_URL+"/auth/signin",loginRequest)
    }
    
}
export default new UserService();