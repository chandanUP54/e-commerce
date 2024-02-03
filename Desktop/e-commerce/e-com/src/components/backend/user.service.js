import axios from "axios";
// connected to e-com-spring
const BASE_API_URL="http://localhost:8071/auth"
class UserService{

    saveUser(user){
    return axios.post(BASE_API_URL+"/signup",user)
    }
    loginUser(loginRequest){
        return axios.post(BASE_API_URL+"/signin",loginRequest)
    }
    
}
export default new UserService();