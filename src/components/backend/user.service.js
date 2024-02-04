import axios from "axios";
// connected to e-com-spring
export const BASE_API_URL="https://bored-quiver-production.up.railway.app"
class UserService{

    saveUser(user){
    return axios.post(BASE_API_URL+"/auth/signup",user)
    }
    loginUser(loginRequest){
        return axios.post(BASE_API_URL+"/auth/signin",loginRequest)
    }
    
}
export default new UserService();