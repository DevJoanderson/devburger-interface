import { navLinks } from "./navLinks";
import Logo from '../../assets/logo.svg';
import { Container, NavLinkContainer, NavLink, Footer } from './styles';
import { useUser } from '../../hooks/UserContext';
import { SignOut } from "@phosphor-icons/react";
export function SideNavAdmin() {
    const { logaut } = useUser();
    return (
        <Container>
            <img src={Logo} alt="Hamburger Logo DevBurger" />
            <NavLinkContainer>
                {navLinks.map(link => (
                    <NavLink key={link.id} to={link.path}>
                        {link.icon}
                        <span>{link.label}</span>
                    </NavLink>
                ))}

            </NavLinkContainer>
            <Footer>
                <NavLink to='/login' onClick={logaut}>
                    <SignOut />
                    <span>Sair</span>
                </NavLink>
            </Footer>
        </Container>
    )
}