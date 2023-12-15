import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {Container, Links, Content} from './styles.js';
import { Button } from "../../components/Button/index.jsx";
import { ButtonText } from "../../components/ButtonText/index.jsx";
import { Header } from "../../components/Header/index.jsx";
import { Section } from "../../components/Section/index.jsx";
import { Tag } from "../../components/Tag/index.jsx";
import { api } from "../../services/api.js";

export function Details(){
  const [note, setNote]= useState(null);
  const navigate = useNavigate();
  const params = useParams();
  function handleBack(){
    navigate(-1);
  }
  async function handleExclude(){
    const confirm = window.confirm("Deseja realmente remover essa nota?");
    if(confirm){
      await api.delete(`/notes/${params.id}`);
      handleBack();
    }
  }
  useEffect(()=>{
    async function fetchNote(){
      const response = await api.get(`/notes/${params.id}`);
      setNote(response.data);
    }
    fetchNote();
  }, [])

  return (
    <Container>
      <Header/>
      {
        note &&
        <main>
          <Content>
            <ButtonText title="Excluir nota" onClick={handleExclude} />
            <h1>{note.title}</h1>
            <p>{note.description}</p>
            {
              note.links &&
              <Section title="Links úteis">
              <Links>
              {
                note.links.map((link)=> (
                  <li key={`${link.id}`}>
                    <a href={link.url} target="_blank">{link.url}</a>
                  </li>
                ))
                
              }
              </Links>
            </Section>
            }
            {
              note.tags &&
              <Section title="Marcadores">
              {
                note.tags.map((tag)=>(
                  <Tag key={`${tag.name}-${tag.id}`} title={tag.name}/>
                ))
              }              
            </Section>
            }
            <Button title="Voltar" onClick={handleBack}/>
          </Content>
        </main>
      }
    </Container>
  )
}