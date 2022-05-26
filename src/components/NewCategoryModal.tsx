import { zodResolver } from '@hookform/resolvers/zod';
import { Prisma } from '@prisma/client';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { trpc } from '../utils/trpc';
import { newCategoryValidation } from '../utils/validations/categories';
import Button from './Button';
import Input from './Input';
import Modal from './Modal';

interface NewCategoryModalProps {
  isOpen: boolean;
  setIsOpen: any;
}

const NewCategoryModal: FC<NewCategoryModalProps> = ({ isOpen, setIsOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Prisma.CategoryCreateInput>({
    resolver: zodResolver(newCategoryValidation),
  });
  const { invalidateQueries } = trpc.useContext();
  const { mutate } = trpc.useMutation('categories.create', {
    onSuccess: () => {
      invalidateQueries(['categories.all']);
      setIsOpen(false);
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutate(data);
  });

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="Nueva categoría">
      <form onSubmit={onSubmit} className="space-y-4 mt-4">
        <Input
          register={register}
          errors={errors}
          name="name"
          label="Name"
          type="text"
        />

        <Button fullwidth type="submit" variant="primary">
          Crear
        </Button>
      </form>
    </Modal>
  );
};

export default NewCategoryModal;
