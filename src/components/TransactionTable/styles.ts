import styled from "styled-components";

export const Container = styled.div`
  margin-top: 4rem;

  input {
    width: 100%;
    padding: 0 1.5rem;
    height: 4rem;
    border-radius: 0.25rem;
    border: 1px solid #D7D7D7;
    background: #E7E9EE;
    font-weight: 400;
    font-size: 1rem;  
    &::placeholder {
      color: var(--text);
    }
    & + input {
      margin-top: 1rem;
    }
  }
  
  table {
    width: 100%;
    border-spacing: 0 0.5rem;
    th {
      color: var(--text);
      font-weight: 400;
      padding: 1rem 2rem;
      text-align: left;
      line-height: 1.5rem;
    }
    td {
      padding: 1rem 2rem;
      border: 0;
      background: var(--white);
      color: var(--text);
      border-radius: 0.25rem;
      &:first-child {
        color: var(--title);
      }
      &.deposit {
        color: var(--green);
      }
      &.withdraw {
        color: var(--red);
      }
      button {
      font-size: 1rem;
      color: #FFFFFF;
      background: var(--blue-light);
      border: 0;
      padding: 0 1rem;
      margin: 0.5rem;
      border-radius: 0.25rem;
      height: 3rem;
      transition: filter 0.2s ease;
        &:hover{
          filter: brightness(0.9);
        }
      }
    }
  }
`