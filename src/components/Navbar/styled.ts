import styled from 'styled-components';
import { COLORS } from '../../constants/utils';
import { NAVBAR_HEIGHT } from './data';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: ${NAVBAR_HEIGHT}px;
  background: ${COLORS.lightRed};
`;

export const ButtonLink = styled(Link)<{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  font-family: Rubik, sans-serif;
  column-gap: 5px;
  padding: 10px;
  font-size: 16px;
  border-radius: 8px;
  background: ${({ isActive }) => isActive ? COLORS.darkRed : 'none'};
  transition: opacity 0.3s ease-in;
  color: ${COLORS.white};
  
  img {
    height: 24px;
  }
  
  &:hover {
    opacity: 0.8;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  column-gap: 10px;
  align-items: center;
`;

export const Button = styled.button<{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  font-family: Rubik, sans-serif;
  column-gap: 5px;
  padding: 10px;
  font-size: 16px;
  border-radius: 8px;
  background: ${({ isActive }) => isActive ? COLORS.darkRed : 'none'};
  transition: opacity 0.3s ease-in;
  color: ${COLORS.white};
  
  img {
    height: 24px;
  }
  
  &:hover {
    opacity: 0.8;
  }
`;
