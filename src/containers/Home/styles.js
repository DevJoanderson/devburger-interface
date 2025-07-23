import styled from 'styled-components';

import Background from '../../assets/background.svg';
import BannerHome from '../../assets/banner-hamburger.svg';

export const Banner = styled.div`
  background: url('${BannerHome}');
  background-size: cover;
  background-position: center;
  height: 480px;

  h1 {
    font-family: 'Road Rage', sans-serif;
    font-size: 80px;
    color: #f4f4f4;
    position: absolute;
    left: 35%;
  }
`;

export const Container = styled.section`
  background: url(${Background});
  background-size: cover;
  background-position: center;
  height: 400px; /* ou qualquer valor para teste */
`;

export const Content = styled.div``;
