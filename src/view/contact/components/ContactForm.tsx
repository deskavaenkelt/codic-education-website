import { Form, Formik } from 'formik'
import { ContactForm as IContactForm } from 'shared/interfaces/ContactFormInterface'
import { TextArea } from '../../../components/html/TextArea'
import { Button } from 'components/html/Button'
import { Input } from '../../../components/html/Input'
import { toast } from 'react-toastify'
import Validations from 'shared/validations/Validations'
import CodicAPIService from 'shared/api/services/CodicAPIService'

export const ContactForm = () => {
	const handleSubmit = async (values: IContactForm) => {
		try {
			await CodicAPIService.sendContactEmail(values)
			toast.success('✔️ Tack för ditt meddelande. Vi kommer att återkoppla till dig inom snar tid.')
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<Formik
			initialValues={{ name: '', email: '', subject: '', message: '' }}
			validationSchema={Validations.contactFormValidation}
			onSubmit={(values, actions) => { handleSubmit(values) && actions.resetForm() }}>
			<Form autoComplete="off">
				<Input name='name' label='Namn' type='text' required />
				<Input name='email' label='Email' type='email' required />
				<Input name='subject' label='Ärende' type='text' required />
				<TextArea name='message' type='textarea' placeholder='Meddelande' />
				<Button text='Skicka' />
			</Form>
		</Formik>
	)
}


