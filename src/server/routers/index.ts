import * as trpc from '@trpc/server';
import superjson from 'superjson';
import { z } from 'zod';
import { createRouter } from '../createRouter';
import { categoriesRouter } from './categories';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('categories.', categoriesRouter);

export type AppRouter = typeof appRouter;
