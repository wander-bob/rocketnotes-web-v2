import { useState } from "react";
import { FiUser,FiMail, FiLock} from "react-icons/fi";
import {Link, useNavigate} from "react-router-dom";
import { Background, Container, Form } from "./styles";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import {api} from "../../services/api";

export function Signup(){
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  function handleSignup(){
    if(!name || !email || !password){
      return alert("Preencha todos os campos.")
    }

    api.post("/user", {name, email, password})
    .then(()=>{
      alert("Usuário cadastrado com sucesso.");
      navigate("/");
    }).catch((error)=> {
      if(error.response){
        console.log(error)
        alert(error.response.data.message);
      }else{
        alert("Não foi possível realizar o cadastro.")
      }
    });
  }
  return (
    <Container>
      <Background/>
      <Form>
        <h1>Rocket Notes</h1>
        <p>Aplicação para salvar e gerenciar seus links úteis.</p>
    
        <h2>Crie sua conta</h2>
        <Input placeholder="Nome" type="text" icon={FiUser} onChange={(event) => setName(event.target.value)}/>
        <Input placeholder="E-mail" type="text" icon={FiMail} onChange={(event) => setEmail(event.target.value)}/>
        <Input placeholder="Senha" type="password" icon={FiLock} onChange={(event) => setPassword(event.target.value)}/>
        <Button title="Cadastrar" onClick={handleSignup}/>
        <Link to="/">Voltar para o login</Link>
      </Form>
    </Container>
  )
}