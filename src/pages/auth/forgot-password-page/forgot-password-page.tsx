import { ForgotPassword } from '@/components/auth'
import { Page } from '@/components/ui'

export const ForgotPasswordPage = () => {
  return (
    <Page>
      <ForgotPassword onSubmit={x => x} />
    </Page>
  )
}
