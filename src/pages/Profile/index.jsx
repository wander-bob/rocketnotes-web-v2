import { useState } from "react";
import {FiArrowLeft, FiMail, FiUser, FiLock, FiCamera} from "react-icons/fi";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { Container, Form, Avatar } from "./styles";
import {Input} from "../../components/Input";
import {Button} from "../../components/Button";
import { ButtonText } from "../../components/ButtonText";
import {useAuth} from "../../hooks/auth";
import avatarPlaceholder from "../../assets/avatar_placeholder.svg"

export function Profile(){
  const {user, updateProfile} = useAuth();
  
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder;

  const [avatar, setAvatar] = useState(avatarUrl);
  const [avatarFile, setAvatarFile] = useState(null);
  
  const navigate = useNavigate();
  
  async function handleUpdate(){
    const userDataUpdated = {name, email, password: newPassword, old_password: oldPassword};
    const userUpdated = Object.assign(user, userDataUpdated);
    await updateProfile({user: userUpdated, avatarFile});
    setAvatar(avatarUrl);
  }
  async function handleChangeAvatar(event){
    const file = event.target.files[0];
    setAvatarFile(file);
    const imagePreview = URL.createObjectURL(file);
    setAvatar(imagePreview);
  }
  function handleBack(){
    navigate(-1);
  }
  return (
    <Container>
      <header>
        <ButtonText title={<FiArrowLeft/>} onClick={handleBack} />
      </header>
      <Form>
        <Avatar>
          <img src={ avatar } alt={user.name} />
          <label htmlFor="avatar">
            <FiCamera/>
            <input id="avatar" type="file" onChange={handleChangeAvatar} />
          </label>
        </Avatar>
        <Input placeholder="Nome" type="text" icon={FiUser} value={name} onChange={(event)=>setName(event.target.value)}/>
        <Input placeholder="email" type="email" icon={FiMail} value={email} onChange={(event)=>setEmail(event.target.value)}/>
        <Input placeholder="Senha atual" type="password" icon={FiLock} onChange={(event)=>setOldPassword(event.target.value)}/>
        <Input placeholder="Nova senha" type="password" icon={FiLock} onChange={(event)=>setNewPassword(event.target.value)}/>
        <Button title="Salvar" onClick={handleUpdate} />
      </Form>
    </Container>
  )
}