import styled from 'styled-components';
import { COLORS } from 'src/constants/utils';

export const Container = styled.div`
  display: flex;
  column-gap: 10px;
  align-items: center;
`;

export const StyledInput = styled.input`
  padding: 5px;
  border-radius: 8px;
  border: 1px solid ${COLORS.lightGray};
  background: ${COLORS.white};
  color: ${COLORS.black};
  min-width: 200px;
  font-family: Rubik, sans-serif;
  font-size: 16px;
  
  &:disabled {
    background: none;
    border: none;
    color: ${COLORS.lightBlack};
  }
`;

export const Label = styled.div`
  font-size: 16px;
  font-family: Rubik, sans-serif;
  color: ${COLORS.black};
`;
