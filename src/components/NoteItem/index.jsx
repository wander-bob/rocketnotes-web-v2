import { FiPlus, FiX } from "react-icons/fi";
import { Container } from "./styles";

export function NoteItem({isNew, value, onClick, ...rest}){
  return (
    <Container isnew={isNew}>
      <input 
        type="text" 
        value={value} 
        readOnly={!isNew}
        {...rest}
      />
      <button onClick={onClick} className={isNew ? 'button-add':'button-delete'} type="button">
        {isNew ? <FiPlus/> : <FiX/>}
      </button>
    </Container>
  );
}