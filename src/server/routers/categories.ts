import { idValidation, newCategoryValidation, updateCategoryValidation } from '../../utils/validations/categories';
import { createRouter } from '../createRouter';
import { prisma} from '../db'

export const categoriesRouter = createRouter().query("all", {
  async resolve() {
    return prisma.category.findMany();
  }
}).query("one", {
  input: idValidation,
  async resolve({ input }) {
    return prisma.category.findFirst({ where: { id: input.id } });
  }
})
.mutation("create", {
  input: newCategoryValidation,
  async resolve({ input }) {
    return prisma.category.create({ data: input });
  }
})
.mutation("update", {
  input: updateCategoryValidation,
  async resolve({ input }) {
    return prisma.category.update({
      where: { id: input.id },
      data: input,
    });
  }
})
.mutation("delete", {
  input: idValidation,
  async resolve({ input }) {
    return prisma.category.delete({ where: { id: input.id } });
  }
});