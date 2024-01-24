import { PersonalInformation } from '@/components/profile/personal-information'
import { Page } from '@/components/ui'

export const ProfilePage = () => {
  return (
    <Page>
      <PersonalInformation
        alt={'ya'}
        email={'ya@ru'}
        name={'L'}
        onLogOut={() => {}}
        onSubmit={x => x}
        src={'https://xsgames.co/randomusers/avatar.php?g=female'}
      />
    </Page>
  )
}
