import React, { FormEvent } from 'react';
import axios from 'axios';

export const Login: React.FC = () => {
  const [authGlobal, setAuthGlobal] = React.useState(false);
  const [login, setLogin] = React.useState({
    email: '',
    password: '',
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="email"
          name="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>entrar</button>
      </form>
    </div>
  );
};
