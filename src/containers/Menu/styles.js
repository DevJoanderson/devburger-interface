import styled from 'styled-components';
import BannerHamburer from '../../assets/banner-hamburger.svg'

export const Container = styled.div`
  width: 100%;
  height:  100vh;
  background-color: #f0f0f0;
`;

export const Banner = styled.div`
  background: url('${BannerHamburer}');
  display: block;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #1f1f1f;;
  background-size: cover;
  background-position: center;
  height: 480px;
  position: relative;

  h1 {
    font-family: 'Road Rage', sans-serif;
    font-size: 80px;
    line-height: 65px;
    color: #fff;
    position: absolute;

    right: 20%;
    top: 30%;

    span {
        display: block;
        color: #fff;
        position: absolute;
        font-size: -70px;
    }
  }
`;

export const CategoryMenu = styled.div``;

export const ProductsContainer = styled.div``;