import { useNavigate } from 'react-router-dom'

import { SignUp } from '@/components/auth'
import { Page } from '@/components/ui'
import { SignUpArgs, useSignUpMutation } from '@/services'
type SignUpType = Pick<SignUpArgs, 'email' | 'password'>
export const SignUpPage = () => {
  const [signUp] = useSignUpMutation()
  const navigate = useNavigate()
  const onSubmitHandler = (dataForm: SignUpType) => {
    signUp(dataForm)
      .unwrap()
      .then(() => navigate('/sign-in'))
  }

  return (
    <Page>
      <SignUp onSubmit={onSubmitHandler} />
    </Page>
  )
}
