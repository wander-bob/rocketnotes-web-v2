import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {FiPlus, FiSearch} from "react-icons/fi";
import {Container, Brand, Menu, Search, Content, NewNote} from "./styles";
import {Header} from "../../components/Header";
import {ButtonText} from "../../components/ButtonText";
import {Input} from "../../components/Input";
import {Note} from "../../components/Note";
import {Section} from "../../components/Section";
import { api } from "../../services/api";

export function Home(){
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const [tagsSelected, setTagsSelected] = useState([]);
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  function handleTagSelected(tagName){
    if(tagName==="all"){
      return setTagsSelected([]);
    }
    const alreadySelected = tagsSelected.includes(tagName);
    if(alreadySelected){
      const filteredTags = tagsSelected.filter(tag => tag !== tagName);
      return setTagsSelected(filteredTags);
    }else{
      return setTagsSelected(prevState => [...prevState, tagName]);
    }
  }
  function handleDetails(id){
    navigate(`/details/${id}`);
  }
  
  useEffect(()=>{
    async function fetchTags(){
      const response = await api.get("/tags");
      setTags(response.data);
    }
    fetchTags();
  }, []);
  useEffect(()=>{
    async function fetchNotes(){
      const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`);
      setNotes(response.data);
    }
    fetchNotes();
  }, [tagsSelected, search])
  return (
    <Container>
      <Brand>
        <h1>Rocketnotes</h1>
      </Brand>
      <Header/>
      <Menu>
        <li>
          <ButtonText 
            title="Todos"
            onClick={()=> handleTagSelected("all")}
            isActive={tagsSelected.length === 0}
            disabled={tagsSelected.length === 0}
          />
        </li>
        {
          tags && tags.map((tag)=>(
            <li key={`${tag.id}tag`}>
              <ButtonText 
                title={tag.name} 
                onClick={()=> handleTagSelected(tag.name)} 
                isActive={tagsSelected.includes(tag.name)}
              />
            </li>
          ))
        }
      </Menu>
      <Search>
        <Input placeholder="Pesquisar por título" icon={FiSearch} onChange={(event)=> setSearch(event.target.value)}/>
      </Search>
      <Content>
        <Section title="Minhas notas">
          {
            notes.map((note)=>(
              <Note 
                key={`${String(note.id)}-note`}
                data={note} 
                onClick={() => handleDetails(note.id)}
              />
            ))
          }
        </Section>
      </Content>
      <NewNote to="/newnote">
        <FiPlus/>
        <span>Criar nota</span>
      </NewNote>
    </Container>
  );
};