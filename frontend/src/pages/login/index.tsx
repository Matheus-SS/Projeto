import React, { FormEvent } from 'react';
import axios from 'axios';
import { Container } from '../../shared-styles';
import { ContainerForm } from './styles';
import { Input } from '../../components/input';
import { NavLink } from 'react-router-dom';
import { Button } from '../../components/button';
import { path } from '../../constants';

export const Login: React.FC = () => {
  const [authGlobal, setAuthGlobal] = React.useState(false);
  const [login, setLogin] = React.useState({
    email: '',
    password: '',
  });
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setLogin((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const response = await axios.post(
      'http://localhost:3000/api/v1/user/login',
      login,
      { withCredentials: true }
    );
    setAuthGlobal(true);
  }

  return (
    <Container>
      <ContainerForm>
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <label htmlFor="email">Email</label>
          <Input
            id="email"
            type="email"
            placeholder="email"
            name="email"
            onChange={handleChange}
          />
          <label htmlFor="password">Senha</label>
          <Input
            id="password"
            type="password"
            placeholder="senha"
            name="password"
            onChange={handleChange}
          />
          <Button
            onClick={handleSubmit}
            containerStyles={{ marginTop: '10px' }}
          >
            Entrar
          </Button>
          <div className="form-container-signup-link">
            <NavLink to={path.SIGNUP}>cadastre-se</NavLink>
          </div>
        </form>
      </ContainerForm>
    </Container>
  );
};
