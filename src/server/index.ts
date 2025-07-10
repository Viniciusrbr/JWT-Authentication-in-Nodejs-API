import express from 'express'

import { makeSignUpController } from '../factories/makeSignUpController'
import { makeSignInController } from '../factories/SignInController'
import { routeAdapter } from './adapters/routeAdapter'

const app = express()

app.use(express.json())

app.post('/sign-up', routeAdapter(makeSignUpController()))
app.post('/sign-in', routeAdapter(makeSignInController()))

app.listen(3001, () => {
  console.log('Server is running on port 3001')
})
