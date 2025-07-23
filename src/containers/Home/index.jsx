import { Container, Banner, Content } from './styles';


export function Home() {
  return (
    <main>
      <Banner>
        <h1>Bem-vindo(a)!</h1>
      </Banner>
      <Container>
        <Content>
          <div>Corrosel Categorias</div>
          <div>Corrosel Categorias</div>
        </Content>
      </Container>
    </main>
  );
}
