import { CategoriesCarousel } from '../../components/CategoriesCarousel';
import { OffersCarousel } from '../../components/OffersCarousel';
import { Container, Banner } from './styles';
import { useUser } from '../../hooks/UserContext';

export function Home() {
  console.log('Home carregou'); 
  const { userInfo } = useUser(); 
  const { id, name } = userInfo;  

  console.log('UserContext:', id, name);

  return (
    <main>
      <Banner>
        <h1>Bem-vindo(a)!</h1>
      </Banner>
      <Container>
        <div>
          <CategoriesCarousel />
          <OffersCarousel />
        </div>
      </Container>
    </main>
  );
}
