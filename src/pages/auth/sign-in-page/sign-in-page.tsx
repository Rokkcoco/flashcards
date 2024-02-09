import { SignIn } from '@/components/auth'
import { Page } from '@/components/ui'
import { LoginArgs, useLoginMutation } from '@/services'

export const SignInPage = () => {
  const [login] = useLoginMutation()
  const handleLogin = async (data: LoginArgs) => {
    await login(data)
  }

  return (
    <Page>
      <SignIn onSubmit={handleLogin} />
    </Page>
  )
}
