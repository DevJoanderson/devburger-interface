import { yupResolver } from '@hookform/resolvers/yup';
import { Image } from '@phosphor-icons/react/dist/ssr';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { api } from '../../../services/api';
import { useLocation } from 'react-router-dom';
import {
  Container,
  ContainerCheckbox,
  ErrorMessage,
  Form,
  Input,
  InputGroup,
  Label,
  LabelUpload,
  Select,
  SubmitButton,
} from './styles';

const schema = yup.object({
  name: yup.string().required('Digite o nome do produto'),
  price: yup
    .number()
    .positive()
    .required('digite o preço do produto')
    .typeError('Digite o preço do produto'),
  category: yup.object().required('Selecione uma categoria'),
  offer: yup.boolean(),
});

export function EditProduct() {
  const [fileName, setFileName] = useState(null);
  const [categories, setcategories] = useState('');

  const {
    state: { produto },
  } = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    async function loadCategories() {
      const { data } = await api.get('/categories');

      setcategories(data);
    }

    loadCategories();
  }, []);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    const productFormData = new FormData();

    productFormData.append('name', data.name);
    productFormData.append('price', data.price * 100);
    productFormData.append('category_id', data.category.id);
    productFormData.append('file', data.file[0]);
    productFormData.append('offer', data.offer);

    await toast.promise(api.put(`/products/${produto.id}`, productFormData), {
      pending: 'Editando o produto...',
      success: 'Produto editado com sucesso!',
      error: 'Erro ao editar o produto, tente novamente',
    });

    setTimeout(() => {
      navigate('/admin/produtos');
    }, 2000);
  };

  return (
    <>
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputGroup>
            <Label>Nome</Label>
            <Input
              type="text"
              {...register('name')}
              defaultValue={produto.name}
            />
            <ErrorMessage>{errors.name?.message}</ErrorMessage>
          </InputGroup>

          <InputGroup>
            <Label>Preço</Label>
            <Input
              type="number"
              {...register('price')}
              defaultValue={produto.price / 100}
            />
            <ErrorMessage>{errors.price?.message}</ErrorMessage>
          </InputGroup>

          <InputGroup>
            <LabelUpload>
              <Image />
              <input
                type="file"
                {...register('file')}
                accept="image/png, image/jpeg, image/jpg, image/png"
                onChange={(value) => {
                  setFileName(value.target.files[0]?.name);
                  register('file').onChange(value);
                }}
              />
              {fileName || 'Upload do Produto'}
            </LabelUpload>

            <ErrorMessage>{errors.file?.message}</ErrorMessage>
          </InputGroup>

          <InputGroup>
            <Label>Categoria</Label>

            <Controller
              name="category"
              control={control}
              defaultValue={produto.category}
              render={({ field }) => (
                <Select
                  {...field}
                  options={categories}
                  getOptionLabel={(categories) => categories.name}
                  getOptionValue={(categories) => categories.id}
                  placeholder="Selecione uma categoria"
                  menuPortalTarget={document.body}
                  defaultValue={produto.category}
                />
              )}
            />
            <ErrorMessage>{errors.category?.message}</ErrorMessage>
          </InputGroup>

          <InputGroup>
            <ContainerCheckbox>
              <input
                type="checkbox"
                {...register('offer')}
                defaultChecked={produto.offer}
              />
              <Label>Produto em Oferta ? </Label>
            </ContainerCheckbox>
          </InputGroup>

          <SubmitButton type="submit">Editar Produto</SubmitButton>
        </Form>
      </Container>
    </>
  );
}
