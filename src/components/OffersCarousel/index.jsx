import { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { api } from '../../services/api';
import { Container, Title } from './styles';
import { CardProduct } from '../CardProduct';
import { formatPrice } from '../../utils/formatPrice';

export function OffersCarousel() {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const token = localStorage.getItem('token');

      if (!token) {
        console.warn('Token não encontrado. Usuário não autenticado.');
        return;
      }

      try {
        const { data } = await api.get('/products');

        const onlyOffers = data
          .filter((product) => product.offer)
          .map((product) => ({
            currencyValue: formatPrice(product.price),
            ...product,
          }));

        setOffers(onlyOffers);
      } catch (error) {
        console.error('Erro ao buscar produtos com ofertas:', error);
      }
    }

    loadProducts();
  }, []);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1280 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1280, min: 690 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 690, min: 0 },
      items: 1,
    },
  };

  return (
    <Container>
      <Title>Ofertas do Dia</Title>
      {offers.length > 0 ? (
        <Carousel
          responsive={responsive}
          infinite={true}
          partialVisbile={false}
          itemClass="carousel-item"
        >
          {offers.map((product) => (
            <CardProduct key={product.id} product={product} />
          ))}
        </Carousel>
      ) : (
        <p style={{ textAlign: 'center' }}>Nenhuma oferta encontrada</p>
      )}
    </Container>
  );
}
