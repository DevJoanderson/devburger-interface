import styled from 'styled-components';

export const Container = styled.div`
position: relative;
  .carousel-item{
    padding-right: 40px;
    padding-left: 40px;
  }
  .react-multiple-carousel__arrow--left {
    left: +50px;
    top: 10px;
}
.react-multiple-carousel__arrow--right {
    right: +50px;
    top: 10px;
}
`;

export const Title = styled.h2`
font-size: 32px;
font-weight: 800;
color: #9758a6;
padding-bottom: 12px;
position: relative;
text-align: center;
margin-bottom: 40px;
margin-top: 20px;


&::after {
  content: '';
  position: absolute;
  bottom: 0;
  width: 56px;
  height: 4px;
  background-color: #9758a6;
  left: calc(50% - 28px);
}
`;

export const ContainerItems = styled.div`
 background: url('${(props) => props.$imageUrl}');
 background-position: center;
 background-size: cover;
 border-radius: 20px;
 display: flex;
 align-items: center;
 padding: 20px 10px;
 width: 100%;
 height: 300px;
 

 P {
   color: #ffffff;
   background-color: rgba(0, 0, 0, 0.5);
   padding: 10px 30px;
   border-radius: 30px;
   font-size: 22.5px;
   font-weight: bold;
   margin-top: 50px;
 }
`;
export const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  `;
