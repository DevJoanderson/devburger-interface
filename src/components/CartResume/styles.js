// src/components/CartResume/styles.js
import styled from 'styled-components';

export const Container = styled.div`
  background-color: #fff;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 20px;

  * {
    color: #484848;
    font-weight: 500;
  }

  .container-top {
    display: grid;
    grid-template-columns: 1fr max-content; /* texto | preço */
    grid-row-gap: 10px;
    grid-template-areas:
      'title title'
      'items items-price'
      'delivery-tax delivery-tax-price';

    /* zera margens padrão dos filhos imediatos (h2, p) */
    > * { margin: 0; }

    /* --- tudo que usa grid-area PRECISA ficar aqui dentro --- */

    > .title {
      grid-area: title;
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 20px;
      background-color: #3b3b3b !important; /* força a cor */
      color: #fff !important;
      width: 100%;
      padding: 15px;
      text-align: center;
      border-radius: 20px 20px 0 0;
    }

    > .items {
      grid-area: items;
      padding-left: 20px;
    }

    > .items-price {
      grid-area: items-price;
      padding-right: 20px;
      text-align: right;
      font-weight: 700;
    }

    > .delivery-tax {
      grid-area: delivery-tax;
      padding-left: 20px;
    }

    > .delivery-tax-price {
      grid-area: delivery-tax-price;
      padding-right: 20px;
      text-align: right;
      font-weight: 700;
    }
  }

  .container-bottom {
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    font-weight: 700;
    margin-top: 24px;
    padding: 20px;

    * { font-weight: 700; }
  }
`;
