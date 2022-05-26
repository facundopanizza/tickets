import { z } from 'zod';

export const newCategoryValidation = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
});

export const updateCategoryValidation = z.object({
  id: z.string().min(1, 'El id es requerido'),
  name: z.string().min(1, 'El nombre es requerido'),
});

export const idValidation = z.object({
  id: z.string().min(1, 'El id es requerido'),
});
