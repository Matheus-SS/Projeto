import React, { FormEvent } from 'react';
import { Container } from '../../shared-styles';
import { ContainerForm } from './styles';
import { Input } from '../../components/input';
import { NavLink } from 'react-router-dom';
import { Button } from '../../components/button';
import { path } from '../../constants';
import { useMutation } from '@tanstack/react-query';
import { createUser } from '../../services/user';
import { z, ZodIssue } from 'zod';
import { FormError } from '../../components/formError';
import { Toaster } from 'react-hot-toast';
import { toastError, toastSuccess } from '../../lib/toast';
import { AxiosError } from 'axios';

type Request = {
  username: string;
  email: string;
  password: string;
};

type Response = {
  username: string;
  email: string;
  password: string;
};

type ErrorType = {
  message: string;
};

export const Signup: React.FC = () => {
  const [authGlobal, setAuthGlobal] = React.useState<boolean>(false);
  const [form, setForm] = React.useState<Request>({
    username: '',
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

  const { mutate } = useMutation({
    mutationFn: (data: Request) => {
      return createUser<Request, Response>(data);
    },
    onError: (error: AxiosError<ErrorType>) => {
      toastError(error.response?.data.message || 'Erro ao criar usuário');
    },
    onSuccess: (_: Response) => {
      setForm({
        username: '',
        email: '',
        password: '',
      });

      toastSuccess('Usuário cadastrado com sucesso');
    },
  });

  const FormSchema = z.object({
    username: z
      .string()
      .min(4, {
        message: 'Nome de usuário pelo menos 4 caracteres',
      })
      .max(10, 'Nome de usuário pelo menos 15 caracteres')
      .trim(),
    email: z.string().email({
      message: 'Email obrigatório',
    }),
    password: z.string().min(6, {
      message: 'Senha deve ter pelo menos 6 caracteres',
    }),
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
          <h2>Cadastre-se</h2>
          <label htmlFor="username">Username</label>
          <Input
            value={form.username}
            id="username"
            type="text"
            placeholder="nome de usuario"
            name="username"
            onChange={handleChange}
          />
          <FormError errors={errors} formField="username" />
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
            Cadastrar
          </Button>
          <div className="form-container-signup-link">
            <NavLink to={path.LOGIN}>voltar para login</NavLink>
          </div>
        </form>
      </ContainerForm>
    </Container>
  );
};
