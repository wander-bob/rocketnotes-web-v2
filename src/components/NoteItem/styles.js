import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;

  background-color: ${({theme, isnew}) => isnew ? "transparent" : theme.COLORS.BACKGROUND_900};
  color: ${({theme, isnew}) => isnew ? "#FFF" : theme.COLORS.BACKGROUND_300};
  border: ${({theme, isnew}) => isnew ? `2px dashed ${theme.COLORS.GRAY_300}` : "none"};
  margin-bottom: 20px;
  border-radius: 10px;
  padding-right: 16px;
  > button {
    border: none;
    background: none;
  }
  .button-add {
    color: ${({theme})=> theme.COLORS.ORANGE};
  }
  .button-delete {
    color: ${({theme})=> theme.COLORS.RED};
  }
  > input {
    height: 56px;
    width: 100%;
    padding: 16px 16px 16px 20px;
    color: ${({theme})=> theme.COLORS.WHITE};
    background: transparent;
    border: none;
    &::placeholder {
      color: ${({theme}) => theme.COLORS.GRAY_300};
    }
  }
`;