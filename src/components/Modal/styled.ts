import styled from 'styled-components';
import { COLORS } from '../../constants/utils';
import close from '../../assets/img/close.svg';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100%;
`;

export const Content = styled.div`
  max-width: 800px;
  width: 100%;
  background: ${COLORS.white};
  border-radius: 24px;
  min-height: 200px;
  height: fit-content;
  padding: 20px;
  font-family: Rubik, sans-serif;
  font-size: 16px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 16px;
`;

export const Title = styled.div`
  font-size: 24px;
  font-family: Rubik, sans-serif;
  font-weight: 500;
  color: ${COLORS.black};
`;

export const CloseIcon = styled.div`
  width: 24px;
  height: 24px;
  background: url(${close}) no-repeat center center;
  background-size: contain;
  cursor: pointer;
  transition: opacity .3s ease;
  
  &:hover {
    opacity: .8;
  }
`;

