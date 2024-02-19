import { SignIn } from '@/components/auth'
import { Page } from '@/components/ui'
import { LoginArgs, useLoginMutation } from '@/services'

export const SignInPage = () => {
  const [login] = useLoginMutation()
  const onSubmitHandler = async (data: LoginArgs) => {
    await login(data).then(data => console.log(data))
  }

  return (
    <Page>
      <SignIn onSubmit={onSubmitHandler} />
    </Page>
  )
}
