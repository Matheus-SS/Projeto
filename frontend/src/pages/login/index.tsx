import React, { FormEvent } from 'react';
import { Container } from '../../shared-styles';
import { ContainerForm } from './styles';
import { Input } from '../../components/input';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from '../../components/button';
import { path } from '../../constants';
import { z, ZodIssue } from 'zod';
import { FormError } from '../../components/formError';
import { Toaster } from 'react-hot-toast';

import { useAuth } from '../../hook/useAuth';
import { useMutation } from '@tanstack/react-query';
import { login } from '../../services/user';
import { toastError } from '../../lib/toast';
import { AxiosError } from 'axios';

type Request = {
  email: string;
  password: string;
};
type ErrorType = {
  message: string;
};

interface Response {
  user: {
    email: string;
    username: string;
  };
}

export const Login: React.FC = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = React.useState<Request>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = React.useState<ZodIssue[]>([]);
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  const FormSchema = z.object({
    email: z.string().email({
      message: 'Email obrigatório',
    }),
    password: z.string().min(6, {
      message: 'Senha deve ter pelo menos 6 caracteres',
    }),
  });

  const { mutate } = useMutation({
    mutationFn: (data: Request) => {
      return login<Request, any>(data);
    },
    onError: (error: AxiosError<ErrorType>) => {
      toastError(error.response?.data.message || 'Erro ao fazer login');
    },
    onSuccess: (response: Response) => {
      setUser({
        email: response.user.email,
        username: response.user.username,
      });
      navigate('/');
      return response;
    },
  });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const results = FormSchema.safeParse(form);

    if (!results.success) {
      const { issues } = results.error;
      setErrors(issues);
      setTimeout(() => {
        setErrors([]);
      }, 2000);
    } else {
      mutate(form);
    }
  }

  return (
    <Container>
      <Toaster position="top-right" reverseOrder={false} />
      <ContainerForm>
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <label htmlFor="email">Email</label>
          <Input
            value={form.email}
            id="email"
            type="email"
            placeholder="email"
            name="email"
            onChange={handleChange}
          />
          <FormError errors={errors} formField="email" />
          <label htmlFor="password">Senha</label>
          <Input
            value={form.password}
            id="password"
            type="password"
            placeholder="senha"
            name="password"
            onChange={handleChange}
          />
          <FormError errors={errors} formField="password" />
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
