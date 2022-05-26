import { Category } from '.prisma/client';
import Link from 'next/link';
import React, { FC } from 'react';
import { trpc } from '../utils/trpc';
import Button from './Button';
import Modal from './Modal';

interface DeleteCategoryModalProps {
  isOpen: boolean;
  setIsOpen: any;
  category?: Category;
}

const DeleteCategoryModal: FC<DeleteCategoryModalProps> = ({
  isOpen,
  setIsOpen,
  category,
}) => {
  const { invalidateQueries } = trpc.useContext();
  const { mutate } = trpc.useMutation('categories.delete', {
    onSuccess: () => {
      invalidateQueries(['categories.all']);
      setIsOpen(false);
    },
  });

  if (!category) return <></>;

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="Borrar categoría">
      <p className="text-sm text-gray-500">
        Estas seguro que quieres borrar esta categoría?
      </p>
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <div className="ml-3">
          <Button
            onClick={() => setIsOpen(false)}
            type="button"
            variant="white">
            Cancelar
          </Button>
        </div>
        <Button
          onClick={() => mutate({ id: category.id })}
          type="button"
          variant="danger">
          Si, borrar
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteCategoryModal;
