import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { api } from "../../services/api";
import { Container, Form } from "./styles";
import {Header} from "../../components/Header";
import {Input} from "../../components/Input";
import {TextArea} from "../../components/TextArea";
import {Section} from "../../components/Section";
import { NoteItem } from "../../components/NoteItem";
import {Button} from "../../components/Button";
import { ButtonText } from "../../components/ButtonText";

export function NewNote(){
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState("");
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const navigate = useNavigate();
  function handleAddLink(){
    setLinks(prevState => [...prevState, newLink]);
    setNewLink("");
  }
  function handleRemoveLink(deleted){
    setLinks(prevState => prevState.filter(link => link !== deleted));
  }
  function handleAddTag(){
    setTags(prevState => [...prevState, newTag]);
    setNewTag("");
    console.log(newTag)
  }
  function handleRemoveTag(tagToRemove){
    setTags(prevState => prevState.filter(tag => tag !==tagToRemove));
  }
  async function handleNewNote(){
    if(!title){
      return alert("O título da nota precisa ser inserido.")
    }
    if(!description){
      return alert("A descrição da nota está vazia.")
    }
    if(newLink){
      return alert("Há um link pendente de adição. Se não deseja salvá-la, remova o conteúdo da tag.")
    }
    if(newTag){
      return alert("Há uma tag pendente de adição. Se não deseja salvá-la, remova o conteúdo da tag.")
    }
    try{
      await api.post("/notes", {title, description, tags, links});
      alert("Nota criada com sucesso");
      navigate(-1);
    }catch(error){
      console.log(error);
      alert("Falha ao criar a nota");
    }
  }
  function handleBack(){
    navigate(-1);
  }
  return (
    <Container>
      <Header/>
      <main>
        <Form>
          <header>
            <h1>Criar nota</h1>
            <ButtonText title="Voltar" onClick={handleBack}/>
          </header>
          <Input placeholder="Título" onChange={(event)=> setTitle(event.target.value)} />
          <TextArea placeholder="Observações" onChange={(event)=> setDescription(event.target.value)} />
          <Section title="Links úteis">
            {
              links.map((link, index)=>(
                <NoteItem key={String(index)} value={link} onClick={()=> handleRemoveLink(link)} />
                ))
              }
              <NoteItem isNew="true" placeholder="Novo link" value={newLink} onChange={(event) => setNewLink(event.target.value)} onClick={handleAddLink} />
          </Section>
          <Section title="Marcadores">
            <div className="tags">
              {
                tags.map((tag,index)=>(
                  <NoteItem key={String(index)} value={tag} onClick={()=>handleRemoveTag(tag)}/>
                ))
              }
              <NoteItem isNew="true" placeholder="Novo marcador" value={newTag} onChange={(event)=>setNewTag(event.target.value)} onClick={handleAddTag} />
            </div>
          </Section>
          <Button title="Salvar" onClick={handleNewNote} />
        </Form>
      </main>
    </Container>
  );
}