import styled from 'styled-components';
import BannerHamburer from '../../assets/banner-hamburger.svg'
import Background from '../../assets/background.svg';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  width: 100%;
  min-height: 240px; /* força altura mínima */
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background: linear-gradient(rgba(255,255,255, 0.5),rgba(255,255,255, 0.5)),
  url('${Background}');

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  h1 {
    font-family: 'Road Rage', sans-serif;
    font-size: 70px;
    line-height: 65px;
    color: #fff;
    position: absolute;

    right: 20%;
    top: 30%;

    span {
     display: block;
     color: #fff;
     font-size: 20px;
    }
  }
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

  
`;

export const CategoryMenu = styled.div`
display: flex;
justify-content: center;
gap: 50px;
margin-top: 30px;
`;

export const CategoryButton = styled(Link)`
text-decoration: none;
cursor: pointer;
background: none;
color: ${props => props.$isActiveCategory ? '#9758a6' : '#9a9a9d'};
font-size: 24px;
font-weight: 500;
padding-bottom: 5px;
line-height: 20px;
border: none;
border-bottom: ${ props => props.$isActiveCategory && '3px solid #696969'};
`;


export const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 90px;
  justify-items: center;
  max-width: 1200px;
  margin: 50px auto;
  padding: 40px 20px;
`;