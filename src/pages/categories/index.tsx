import { Category } from '@prisma/client';
import Link from 'next/link';
import React, { FC, useState } from 'react';
import Button from '../../components/Button';
import Card from '../../components/Card';
import DeleteCategoryModal from '../../components/DeleteCategoryModal';
import NewCategoryModal from '../../components/NewCategoryModal';
import Table from '../../components/Table';
import UpdateCategoryModal from '../../components/UpdateCategoryModal';
import { formatDate } from '../../utils/formatDate';
import { trpc } from '../../utils/trpc';

const Categories: FC = () => {
  const { data: categories, isLoading } = trpc.useQuery(['categories.all']);
  const [showNewModal, setShowNewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >();

  if (isLoading) return <p>Loading...</p>;

  return (
    <Card>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Categorías</h1>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              onClick={() => setShowNewModal(true)}
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">
              Nueva categoría
            </button>
          </div>
        </div>
        <Table
          columns={[
            { accessor: 'id', header: 'ID' },
            { accessor: 'name', header: 'Nombre' },
            { accessor: 'createdAt', header: 'Creada' },
            { accessor: 'updatedAt', header: 'Actualizada' },
            { accessor: 'actions', header: '' },
          ]}
          data={(categories || []).map((category) => ({
            ...category,
            createdAt: formatDate(category.createdAt),
            updatedAt: formatDate(category.updatedAt),
            actions: (
              <div className="space-x-3">
                <Button
                  onClick={() => {
                    setSelectedCategory(category);
                    setShowUpdateModal(true);
                  }}
                  variant="secondary">
                  Editar
                </Button>
                <Button
                  onClick={() => {
                    setShowDeleteModal(true);
                    setSelectedCategory(category);
                  }}
                  variant="danger">
                  Borrar
                </Button>
              </div>
            ),
          }))}
        />
      </div>

      <NewCategoryModal isOpen={showNewModal} setIsOpen={setShowNewModal} />
      <DeleteCategoryModal
        category={selectedCategory}
        isOpen={showDeleteModal}
        setIsOpen={setShowDeleteModal}
      />
    <UpdateCategoryModal category={selectedCategory} isOpen={showUpdateModal} setIsOpen={setShowUpdateModal} />
    </Card>
  );
};

export default Categories;
