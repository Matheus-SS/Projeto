import React, { FormEvent } from 'react';
import { Container } from '../../shared-styles';
import { ContainerForm } from './styles';
import { Input } from '../../components/input';
import { NavLink } from 'react-router-dom';
import { Button } from '../../components/button';
import { routes } from '../../constants';
import { api } from '../../services/api';

type Response = {
  username: string;
  email: string;
  password: string;
};

export const Signup: React.FC = () => {
  const [authGlobal, setAuthGlobal] = React.useState(false);
  const [form, setForm] = React.useState({
    username: '',
    email: '',
    password: '',
  });
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      const response = await api.post<Response, Response>('/user/create', form);
      console.log();
    } catch (error) {
      console.log('catch', error);
    }
  }

  return (
    <Container>
      <ContainerForm>
        <form onSubmit={handleSubmit}>
          <h2>Cadastre-se</h2>
          <label htmlFor="username">Username</label>
          <Input
            id="username"
            type="text"
            placeholder="nome de usuario"
            name="username"
            onChange={handleChange}
          />
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
            Cadastrar
          </Button>
          <div className="form-container-signup-link">
            <NavLink to={routes.LOGIN}>voltar para login</NavLink>
          </div>
        </form>
      </ContainerForm>
    </Container>
  );
};
