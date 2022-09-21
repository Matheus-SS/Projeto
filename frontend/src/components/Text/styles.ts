import styled from 'styled-components';
import { color, size } from '../../constants';

type TextProps = {
  color?: string;
  size?: string;
};

export const Container = styled.p<TextProps>`
  font-size: ${(props) => (props.size ? props.size : size.font.small)}px;
  color: ${(props) => (props.color ? props.color : color.fonts.primary)};
`;
