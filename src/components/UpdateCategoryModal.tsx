import { zodResolver } from '@hookform/resolvers/zod';
import { Category, Prisma } from '@prisma/client';
import React, { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { trpc } from '../utils/trpc';
import { newCategoryValidation } from '../utils/validations/categories';
import Button from './Button';
import Input from './Input';
import Modal from './Modal';

interface UpdateCategoryModalProps {
  isOpen: boolean;
  setIsOpen: any;
  category?: Category;
}

const UpdateCategoryModal: FC<UpdateCategoryModalProps> = ({
  isOpen,
  setIsOpen,
  category,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Prisma.CategoryCreateInput>({
    resolver: zodResolver(newCategoryValidation),
  });
  const { invalidateQueries } = trpc.useContext();
  const { mutate } = trpc.useMutation('categories.update', {
    onSuccess: () => {
      invalidateQueries(['categories.all']);
      setIsOpen(false);
    },
  });

  const { data } = trpc.useQuery([
    'categories.one',
    { id: category ? category.id : '' },
  ]);

  useEffect(() => {
    if (data) {
      setValue('name', data.name);
    }
  }, [data, setValue]);

  if (!category) return <></>;

  if (!data) return <></>;

  const onSubmit = handleSubmit((data) => {
    mutate({ ...data, id: category.id });
  });

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="Editar categoría">
      <form onSubmit={onSubmit} className="space-y-4 mt-4">
        <Input
          register={register}
          errors={errors}
          name="name"
          label="Name"
          type="text"
        />

        <Button fullwidth type="submit" variant="primary">
          Editar
        </Button>
      </form>
    </Modal>
  );
};

export default UpdateCategoryModal;
