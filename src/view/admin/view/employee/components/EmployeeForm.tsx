import { useState, useEffect } from 'react'
import { Button } from 'components/html/Button'
import styled from 'styled-components'

export const EmployeeForm = (props: { chosenMethod: string; setFormData: (arg0: { name: string; value: string }) => void; formData: { firstName: string; lastName: string; dateOfBirth: string; email: string; mobile: string; startEmployeeDate: string; lastEmployeeDate: string; isEmploymentActive: any ; avatarExists?: boolean}; selectedFile?: any, setSelectedFile?: any, submitting: boolean | undefined; onSubmit: any }) => {

	const assignButtonText = () => {
		switch (props.chosenMethod) {
		case 'create': 
			return 'Spara'
		case 'update': 
			return 'Redigera'
		case 'delete': 
			return 'Radera'
		default:
			return ''
		}
	}

	const handleChange = (event: { target: { type: string; name: string; checked: any; value: string } }) => {
		const isCheckbox = event.target.type === 'checkbox'
		props.setFormData({
			name: event.target.name,
			value: isCheckbox ? event.target.checked : event.target.value,
		})
	}

	return (
		<Wrapper>
			<form onSubmit={props.onSubmit}>
				<EmployeeInfoWrapper >
					<h3>Information om den anställde: </h3>

					<p>Förnamn: </p>
					<input
						name='firstName'
						onChange={handleChange}
						value={props.formData.firstName || ''}
						pattern='[A-Za-zÅÄÖåäö-]{1,}'
						title='Bokstäver, minst en'
						disabled={props.submitting}
						readOnly={props.chosenMethod==='delete' ? true : false}
						required
					/> <br />

					<p>Eftername: </p>
					<input
						name='lastName'
						onChange={handleChange}
						value={props.formData.lastName || ''}
						pattern='[A-Za-zÅÄÖåäö-]{1,}'
						title='Bokstäver, minst en'
						disabled={props.submitting}
						readOnly={props.chosenMethod==='delete' ? true : false}
						required
					/> <br />

					<p>Födelsedatum: </p>
					<input
						name='dateOfBirth'
						type='date'
						onChange={handleChange}
						value={props.formData.dateOfBirth || ''}
						disabled={props.submitting}
						readOnly={props.chosenMethod==='delete' ? true : false}
					/> <br />

					<p>E-post: </p>
					<input
						name='email'
						type='email'
						onChange={handleChange}
						value={props.formData.email || ''}
						disabled={props.submitting}
						readOnly={props.chosenMethod==='delete' ? true : false}
					/> <br />

					<p>Mobilnummer: </p>
					<input
						name='mobile'
						onChange={handleChange}
						value={props.formData.mobile || ''}
						pattern='[0-9-+]{6,}'
						title='Mobilnummer - siffror utan mellanslag'
						disabled={props.submitting}
						readOnly={props.chosenMethod==='delete' ? true : false}
					/> <br />

					{props.chosenMethod!=='create' && props.formData.avatarExists &&
					<p>Det finns en avatar inlagd</p>
					}

					{props.chosenMethod!=='delete' && 
					<div>
						{props.formData.avatarExists ?  <p>Ändra avatar: </p> : <p>Lägg till avatar: </p>}
						<input
							name='selectedFile'
							type='file'
							accept='image/*'
							onChange={(e) => e.target.files !== null ? props.setSelectedFile(e.target.files[0]) : props.setSelectedFile(null)}
							disabled={props.submitting}
						/> <br />
					</div>}

					
				</EmployeeInfoWrapper>
				<EmploymentInfoWrapper>
					<h3>Information om anställningen: </h3>

					<p>Startdatum för anställning: </p>
					<input
						name='startEmployeeDate'
						type='date'
						onChange={handleChange}
						value={props.formData.startEmployeeDate || ''}
						disabled={props.submitting}
						readOnly={props.chosenMethod==='delete' ? true : false}
					/> <br />

					<p>Slutdatum för anställning: </p>
					<input
						name='lastEmployeeDate'
						type='date'
						onChange={handleChange}
						value={props.formData.lastEmployeeDate || ''}
						disabled={props.submitting}
						readOnly={props.chosenMethod==='delete' ? true : false}
					/> <br />

					<p>Pågående anställning: </p>
					<input
						name='isEmploymentActive'
						type='checkbox'
						onChange={handleChange}
						checked={props.formData.isEmploymentActive}
						disabled={props.submitting}
					/> <br />

				</EmploymentInfoWrapper>
				<br />
				<Button text={assignButtonText()} disabled={props.submitting} />
				<br />
			</form>

		</Wrapper>
	)
}

const Wrapper = styled.div`
	padding: 5px 20px;
	button{
		float:right;
		margin: 10px 5%;
	}
`

const EmployeeInfoWrapper = styled.div`
	display: inline-block;
	width: 45%;
	margin-left: 3%;
	margin-bottom: 5px;
	padding: 10px;
	border: 2px solid black;
	border-radius: 5px;
	p {
		display: inline-block;
		padding: 10px 20px;
	}
`

const EmploymentInfoWrapper = styled.div`
	display: inline-block;
	float: right;
	width: 45%;
	margin-right: 3%;
	padding: 10px;
	padding-bottom: 87px;
	border: 2px solid black;
	border-radius: 5px;
	p {
		display: inline-block;
		padding: 10px 20px;
	}
`