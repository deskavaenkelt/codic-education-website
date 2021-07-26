import { Button } from 'components/html/Button'
import { Input } from 'components/html/Input'
import { Form, Formik } from 'formik'
import { useContext } from 'react'
import { toast } from 'react-toastify'
import CodicAPIService from 'shared/api/services/CodicAPIService'
import { UserPersonalDetails } from 'shared/interfaces/UserInterface'
import { UserContext } from 'shared/providers/UserProvider'

export const PersonalDetailsHandler = () => {
	const [authenticatedUser] = useContext(UserContext)

	const handleSubmit = async (values: UserPersonalDetails) => {
		try {
			await CodicAPIService.updateUser(authenticatedUser._id, values)
			toast.success('Information uppdaterad')
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<Formik
			initialValues={{ personalDetails: authenticatedUser.personalDetails }}
			/* validationSchema={{}} */
			onSubmit={(values) => { handleSubmit(values) }}>
			<Form>
				<p>Personuppgifter</p> <br />
				<Input name='personalDetails.firstName' label='Namn' type='text' />
				<Input name='personalDetails.lastName' label='Efternamn' type='text' />
				<Input name='personalDetails.country' label='Land' type='text' />
				<Input name='personalDetails.adress' label='Address' type='text' />
				<Input name='personalDetails.secondaryAdress' label='Sekundär Address' type='text' />
				<Input name='personalDetails.zipCode' type='text' label='Postnummer' />
				<Input name='personalDetails.county' type='text' label='Län/Kommun' />
				<Input name='personalDetails.postOffice' type='text' label='Postort' />
				<Input name='personalDetails.phone' type='text' label='Telefon' />
				<Input name='personalDetails.secondaryPhone' label='Sekundär Telefon' type='text' />
				<br />
				<Button text='Spara' />
			</Form>
		</Formik>
	)
}