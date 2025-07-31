import styled from "styled-components";



export const Container = styled.div`
  width: 100%;
  max-width: 280px;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 100px 25px 25px 25px; 
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.03);

    img {
      transform: translateX(-50%) scale(1.1);
      filter: brightness(1.1);
    }
  }
`;

export const CardInfo = styled.div`
  width: 100%;
  margin-top: 50px; 
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  

  p {
    font-size: 16px;
    font-size: 18px;
    color: #ff8c05;
    font-weight: 700;
    line-height: 1.2;
  }

  strong {
    font-size: 18px;
    color: #363636;
    font-weight: 800;
    margin: 0;
  }
`;

export const CardImage = styled.img`
 height: 140px;
  position: absolute;
  top: -50px;
  left: 50%;
  transform: translateX(-50%);
  transition: transform 0.3s ease, filter 0.3s ease;
  pointer-events: none;
   z-index: 1;
`;