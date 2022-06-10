import styled from 'styled-components';
import { COLORS } from '../../constants/utils';

export enum BtnTypes {
    success = 'success',
    error = 'error'
}

const background = {
    [BtnTypes.success]: COLORS.green,
    [BtnTypes.error]: COLORS.red,
};

const backgroundHover = {
    [BtnTypes.success]: COLORS.lightGreen,
    [BtnTypes.error]: COLORS.lightRed,
};

export const Container = styled.button<{ btnType: BtnTypes }>`
  padding: 5px;
  border-radius: 8px;
  background: ${({ btnType }) => background[btnType]};
  color: ${COLORS.black};
  transition: .3s ease;
  color: ${COLORS.white};
  font-size: 16px;
  font-family: Rubik, sans-serif;
  min-width: 100px;
  
  &:hover {
    background: ${({ btnType }) => backgroundHover[btnType]};
  }
`;
