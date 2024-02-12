import { SignUp } from '@/components/auth'
import { Page } from '@/components/ui'
import { useSignUpMutation } from '@/services'

export const SignUpPage = () => {
  const [signUp] = useSignUpMutation()

  return (
    <Page>
      <SignUp onSubmit={signUp} />
    </Page>
  )
}
