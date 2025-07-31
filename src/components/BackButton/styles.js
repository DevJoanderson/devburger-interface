import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled(Link)`
  background-color: #9758a6;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  font-weight: bold;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;

  position: absolute;
  top: 212px;
  left: 20px;
  z-index: 10;

  &:hover {
    background-color: #7c4699;
  }
`;
