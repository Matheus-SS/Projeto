import styled from 'styled-components';
import { color, size } from '../../constants';

type TextProps = {
  color?: string;
  size?: number;
  weight?: 'bold' | 'regular';
};

export const Container = styled.p<TextProps>`
  font-size: ${(props) => (props.size ? props.size : size.font.small)}px;
  color: ${(props) => (props.color ? props.color : color.fonts.primary)};
  font-weight: ${(props) => (props.weight === 'bold' ? 700 : 400)};
`;
