import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: grid;
  grid-template-rows: 105px auto;
  grid-template-areas: "header" "content";
  main {
    grid-area: content;
    overflow-y: auto;
  }
  .tags {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
`;
export const Form = styled.form`
  max-width: 550px;
  margin: 38px auto;
  > header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 36px;
    a {
      font-size: 20px;
      color: ${({theme}) => theme.COLORS.GRAY_100};
    }
  }
`;