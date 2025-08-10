import { Container, HeaderLink, LinkContainer, Logaut, Navigation, Option, Profile, Content} from "./styles";
import { UserCircleIcon, ShoppingCartIcon } from "@phosphor-icons/react";
export function Header() {
    return (
        <Container>
            <Content>
                <Navigation>
                    <div>
                        <HeaderLink>
                            Home
                        </HeaderLink>
                        <HeaderLink>Cardápio</HeaderLink>
                    </div>
                </Navigation>
                <Option>
                    <Profile>
                        <UserCircleIcon color="#fff" size={24} />
                        <div>
                            <p>
                                Olá <span>Joanderson</span>
                            </p>
                            <Logaut>Sair</Logaut>
                        </div>
                    </Profile>
                     <LinkContainer>
                    <ShoppingCartIcon color="#fff" size={24} />
                    <HeaderLink>Carrinho</HeaderLink>
                </LinkContainer>
                </Option>
               
            </Content>
        </Container>
    )
} 