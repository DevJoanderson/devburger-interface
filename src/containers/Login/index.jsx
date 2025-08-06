import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Logo from '../../assets/logo.svg';
import { Button } from '../../components/Button';
import { api } from '../../services/api';
import {
  Container,
  Form,
  InputContainer,
  LeftContainer,
  RightContainer,
  Title,
  Link,
} from './styles';

export function Login() {
  const navigate = useNavigate();

  const schema = yup.object({
    email: yup
      .string()
      .email('Digite um email válido')
      .required('O email é obrigatório'),
    password: yup
      .string()
      .min(6, 'A senha deve ter pelo menos 6 caracteres')
      .required('Digite uma senha'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formData) => {
    try {
      const response = await toast.promise(
        api.post('/session', {
          email: formData.email,
          password: formData.password,
        }),
        {
          pending: 'Verificando seus dados...',
          success: 'Seja bem-vindo(a)!',
          error: 'Email ou senha incorretos!',
        }
      );

      const { token, user } = response.data;

      console.log('Token recebido:', token);
      console.log('Usuário recebido:', user);

      if (token && user) {
        localStorage.setItem('token', token);
        localStorage.setItem('devburgerUserData', JSON.stringify(user));
        console.log('Token e usuário salvos com sucesso.');
        navigate('/');
      } else {
        toast.error('Token ou dados de usuário ausentes na resposta.');
        console.error('Token ou usuário não retornado corretamente');
      }
    } catch (err) {
      console.error('Erro na requisição de login:', err);
    }
  };

  return (
    <Container>
      <LeftContainer>
        <img src={Logo} alt="logo-devburger" />
      </LeftContainer>

      <RightContainer>
        <Title>
          Olá, seja bem-vindo ao <span>Dev Burguer!</span>
          <br />
          Acesse com seu <span>login e senha.</span>
        </Title>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputContainer>
            <label>Email</label>
            <input type="email" {...register('email')} />
            <p>{errors?.email?.message}</p>
          </InputContainer>

          <InputContainer>
            <label>Senha</label>
            <input type="password" {...register('password')} />
            <p>{errors?.password?.message}</p>
          </InputContainer>

          <Button type="submit">Entrar</Button>
        </Form>

        <p>
          Não possui conta? <Link to="/cadastro">Clique aqui.</Link>
        </p>
      </RightContainer>
    </Container>
  );
}
