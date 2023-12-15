import { createContext, useContext, useEffect , useState } from "react";
import { api } from "../services/api";

export const AuthContext = createContext({ });
function AuthProvider({children}){
  const [userData, setUserData] = useState({});
  async function signIn({email, password}){
    try {
      const response = await api.post("/sessions", {email, password});
      console.log(response);
      const {user, token} = response.data;
      localStorage.setItem("@rocketnotes:user", JSON.stringify(user));
      localStorage.setItem("@rocketnotes:token", JSON.stringify(token));
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUserData({token, user});
    } catch (error) {
      if(error.response){
        return alert(error.response.data.message);
      }
      alert("Não foi possível efetuar o signin.")
    }
  }
  async function signOut(){
    localStorage.removeItem("@rocketnotes:user");
    localStorage.removeItem("@rocketnotes:token");
    setUserData({});
  }
  async function updateProfile({user, avatarFile}){
    try {
      if(avatarFile){
        const fileUploadForm = new FormData();
        fileUploadForm.append("avatar", avatarFile);
        const response = await api.patch("/user/avatar", fileUploadForm);
        user.avatar = response.data.avatar;
      }
      await api.put("/user", user);
      localStorage.setItem("@rocketnotes:user", JSON.stringify(user));
      setUserData({user, token: userData.token});
      alert("Perfil atualizado.")
    }catch (error) {
      console.log(error)
      if(error.response){
        return alert(error.response.data.message);
      }
      alert("Não foi possível atualizar os dados.")
    }
  }
  useEffect(()=>{
    const token = localStorage.getItem("@rocketnotes:token");
    const user = localStorage.getItem("@rocketnotes:user");
    if(token && user){
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      // api.defaults.headers.authorization = `Bearer ${token}`;
      setUserData({token, user: JSON.parse(user)});
    }
  }, [])
  return (
    <AuthContext.Provider value={{signIn, signOut, updateProfile, user: userData.user}}>
      {children}
    </AuthContext.Provider>
  )
}
function useAuth(){
  const context = useContext(AuthContext);
  return context;
}
export {AuthProvider, useAuth};