import { Icon404 } from '@/assets'
import { Button, Page, Typography } from '@/components/ui'

export const Error404 = () => {
  return (
    <Page>
      <div>
        <Icon404 />
      </div>
      <Typography variant={'body_1'}>Sorry! Page not found!</Typography>
      <Button as={'a'}>Back to home page</Button>
    </Page>
  )
}
/*margin from icon 32px*/
