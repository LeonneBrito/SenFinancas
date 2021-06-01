import logoImg from "../../assets/Logo.svg";
import { Container, Wrapper } from "./styles";

interface HeaderProps {
  openModal: () => void;
}

export function Header({ openModal }: HeaderProps) {
  return (
    <Container>
      <Wrapper>
        <img src={logoImg} alt="SenFinança" />
        <button type="button" onClick={openModal}>
          New transaction
        </button>
      </Wrapper>
    </Container>
  );
}
