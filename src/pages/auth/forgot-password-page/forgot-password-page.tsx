import { ForgotPassword } from '@/components/auth'
import { Page } from '@/components/ui'

type Props = {
  p?: any
}

export const ForgotPasswordPage = (props: Props) => {
  return (
    <Page>
      <ForgotPassword onSubmit={x => x} />
    </Page>
  )
}
