import styled from 'styled-components';

export const ContainerButton = styled.button`
  background-color: #9758a6;
  width: 100%;
  height: 52px;
  border: 0;
  border-radius: 5px;
  font-size: 30px;
  color: #ffffff;

  display: flex;              
  align-items: center;       
  justify-content: center;    
  gap: 8px;                  

  transition: background-color 0.3s ease;

  &:hover {
    background-color: #6f357c;
  }
`;