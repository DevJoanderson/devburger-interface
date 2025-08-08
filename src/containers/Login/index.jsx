import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Logo from '../../assets/logo.svg';
import { Button } from '../../components/Button';
import { useUser } from '../../hooks/UserContext';
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
  const { putUserData } = useUser();

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
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async ({ email, password }) => {
    try {
      const response = await toast.promise(
        api.post('/session', { email, password }), // confirme se a rota é essa
        {
          pending: 'Verificando seus dados...',
          success: 'Seja bem-vindo(a)!',
          error: 'Email ou senha incorretos!',
        }
      );

      // confirme o formato da resposta do backend
      const { token, user } = response.data;

      if (!token || !user) {
        toast.error('Token ou dados de usuário ausentes na resposta.');
        console.error('Resposta inesperada do login:', response.data);
        return;
      }

      // monta o objeto do usuário já com o token (compatível com seu api.js)
      const userData = { ...user, token };

      // salva tudo no mesmo local
      localStorage.setItem('devburger:userData', JSON.stringify(userData));

      // atualiza o contexto
      putUserData(userData);

      console.log('Token e usuário salvos com sucesso.');
      navigate('/');
    } catch (err) {
      console.error('Erro na requisição de login:', err);
      // o toast de erro já é exibido pelo toast.promise
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

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </Button>
        </Form>

        <p>
          Não possui conta? <Link to="/cadastro">Clique aqui.</Link>
        </p>
      </RightContainer>
    </Container>
  );
}
