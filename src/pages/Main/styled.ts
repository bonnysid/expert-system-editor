import styled from 'styled-components';
import { COLORS } from '../../constants/utils';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 20px;
`;

export const Block = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  background: #e5e5e5;
  border-radius: 10px;
  padding: 10px;
  width: 500px;
  justify-content: center;
  align-items: center;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  column-gap: 10px;
  width: 100%;
  
  button {
    width: 100%;
  }
`;

export const Question = styled.div`
  font-size: 20px;
`;

export const Result = styled.div`
  font-size: 20px;
`;
