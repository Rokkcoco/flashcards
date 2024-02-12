import { PersonalInformation } from '@/components/profile/personal-information'
import { Page } from '@/components/ui'
import { useLogoutMutation, useMeQuery, useUpdateMeMutation } from '@/services'
import { baseApi } from '@/services/base-api'

export const ProfilePage = () => {
  const [logOut] = useLogoutMutation()
  const { data: meData } = useMeQuery()
  const logoutButtonHandler = () => {
    logOut()
    baseApi.util?.resetApiState()
  }
  const [updateMe] = useUpdateMeMutation()

  console.log(meData)

  return (
    <Page>
      <PersonalInformation
        alt={'user avatar'}
        email={meData?.email ?? ''}
        name={meData?.name ?? ''}
        onLogOut={logoutButtonHandler}
        onSubmit={updateMe}
        src={meData?.avatar ?? ''}
      />
    </Page>
  )
}
