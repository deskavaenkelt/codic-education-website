import { Spinner } from 'components/Spinner'
import { FC } from 'react'
import styled from 'styled-components'
import { translate } from '../../functions/translate'
import { isDisabled } from './ButtonStyles'
import { IButton } from './types'

export const Button: FC<IButton> = (props: IButton) => {
	const {text, isLoading, disabled} = props
	return (
		<ButtonWrapper onClick={ props.onClick } disabled={ disabled }>
			{ translate(text) }
			{ isLoading && (
				<SpinnerWrapper>
					<Spinner height='16' width='16'/>
				</SpinnerWrapper>
			) }
		</ButtonWrapper>
	)
}

const SpinnerWrapper = styled.div`
  max-height: 50%;
  margin-left: 0.5rem;
`

const ButtonWrapper = styled.button`
  min-width: 4rem;
  height: 2rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  ${ isDisabled };
  color: white;
  border: none;
  outline: none;
  transition: background-color 0.2s;
`
