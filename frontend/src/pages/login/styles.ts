import styled from 'styled-components';
import { color } from '../../constants';

export const ContainerForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: ${color.background.secondary};
  height: 100vh;

  form {
    display: flex;
    flex-direction: column;
    width: 50%;

    border-radius: 8px;
    padding: 20px;
    background-color: ${color.background.primary};
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    label {
      margin: 10px 0 5px;
      font-weight: bold;
      color: ${color.fonts.primary};
    }

    .form-container-signup-link {
      display: flex;
      flex-direction: row;
      justify-content: end;

      margin-top: 10px;

      a {
        text-decoration: none;
        color: ${color.fonts.primary};
        transition: 0.2s;

        &:hover {
          color: ${color.fonts.active};
        }
      }
    }
  }
`;
