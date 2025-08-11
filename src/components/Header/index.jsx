import { Container, HeaderLink, LinkContainer, Logaut, Navigation, Option, Profile, Content} from "./styles";
import { UserCircleIcon, ShoppingCartIcon } from "@phosphor-icons/react";
import { useNavigate, useResolvedPath } from "react-router-dom"; 
import { useUser } from "../../hooks/UserContext";

export function Header() {
    const navigate = useNavigate();
  const { logout, userInfo} = useUser();
    const { pathname} = useResolvedPath();
    function logoutUser() {
      logout();
        navigate('/login');
    }
    return (
        <Container>
            <Content>
                <Navigation>
                    <div>
                        <HeaderLink to="/" $isActive={pathname === '/'}>
                            Home
                        </HeaderLink>
                        <hr></hr>
                        <HeaderLink to="/cardapio" $isAcitive={pathname === '/cardapio'}>Cardápio</HeaderLink>
                    </div>
                </Navigation>
                <Option>
                    <Profile>
                        <UserCircleIcon color="#fff" size={24} />
                        <div>
                            <p>
                                Olá <span>{userInfo.name}</span>
                            </p>
                            <Logaut onClick={logoutUser}>Sair</Logaut>
                        </div>
                    </Profile>
                     <LinkContainer>
                    <ShoppingCartIcon color="#fff" size={24} />
                    <HeaderLink to="/carrinho">Carrinho</HeaderLink>
                </LinkContainer>
                </Option>
               
            </Content>
        </Container>
    )
} 