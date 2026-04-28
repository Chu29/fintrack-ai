import { Router } from 'express'
import { authRouter } from '../modules/auth/auth.routes.js'
import { categoriesRouter } from '../modules/categories/categories.routes.js'
import { expensesRouter } from '../modules/expenses/expenses.routes.js'
import { budgetsRouter } from '../modules/budgets/budgets.routes.js'

export const apiRouter = Router()
export const v1Router = Router()

v1Router.use('/auth', authRouter)
v1Router.use('/categories', categoriesRouter)
v1Router.use('/expenses', expensesRouter)
v1Router.use('/budgets', budgetsRouter)

apiRouter.use('/v1', v1Router)
