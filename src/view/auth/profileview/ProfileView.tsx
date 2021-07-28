
import { ProfileCard } from 'components/ProfileCard'
import { USER_PROFILE_WIDTH } from 'shared/styles/constants'
import styled from 'styled-components'
import { ProfileSubMenu } from './components/ProfileSubMenu'

export const ProfileView = () => {
	return (
		<>
			<ProfileSubMenu />
			<Wrapper>
				<ProfileCard
					name='arasto'
					title='xdbrodah'
					email='arasto.sahbaei@gmail.com'
					size={50} />
			</Wrapper>
		</>
	)
}

const Wrapper = styled.div`
	width: ${USER_PROFILE_WIDTH}%;
	display: inline-block;
`
