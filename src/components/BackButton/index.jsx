import { FaArrowLeft } from "react-icons/fa";
import { Container } from "./styles";

export function BackButton() {
    return(
        <Container to="/">
            <FaArrowLeft>
                Volta para Home
            </FaArrowLeft>
        </Container>
    )
}