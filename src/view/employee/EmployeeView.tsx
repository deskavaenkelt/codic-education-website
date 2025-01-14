import { useEffect, useState } from 'react'
import { ProfileCard } from 'components/ProfileCard'
import { windowsMaxWidth } from 'shared/data/WindowsSizes'
import { DimensionsInterface } from 'shared/interfaces/DimensionsInterface'
import styled from 'styled-components'
import CodicAPIService from 'shared/api/services/CodicAPIService'

export const EmployeeView = () => {
	const [serverResponse, setServerResponse] = useState([])

	const fetchData = async () => {
		try {
			const { data } = await CodicAPIService.getAllEmployees()
			setServerResponse(data)
		} catch (error) {
			console.log(error)
		}
	}

	const placeholder = {
		img: '',
		firstName: 'commercial',
		lastName: '',
		email: '',
		tel: ''
	} as never

	const addCommercialBoxToEmployees = [...serverResponse]
	addCommercialBoxToEmployees.splice(8, 0, placeholder)

	const displayAllEmployees = () => {
		return (
			addCommercialBoxToEmployees.map((item: any) =>
				<ProfileCard key={item._id}
					image={item.img}
					name={item.firstName + ' ' + item.lastName}
					email={item.email}
					number={item.mobile}
				/>
			)
		)
	}


	useEffect(() => {
		fetchData()
	}, [])

	return (
		<>
			<Div>
				<h1>Möt våra IT-konsulter</h1>
				<Span>
					Det här är vårt växande team med IT-konsulter i Göteborg.
					Med Codic som utgångspunkt sitter våra anställda på olika startups och större företag runtom i stan.
					Förutom utvecklare innehar de titlar som systemarkitekt, app- och frontendutvecklare, Cloud Deployment-expert, Scrum Master och AWS DevOps.
				</Span>
			</Div>
			<GridWrapper dimensions={windowsMaxWidth}>
				{displayAllEmployees()}
			</GridWrapper>
			<Space />
		</>
	)
}

const GridWrapper = styled.div<DimensionsInterface>`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	margin: 0 auto;
	width: 80%;
	padding: 1%;
	grid-gap: 1%;
	@media (max-width: 1450px) {
		grid-template-columns: repeat(3, 1fr);
	}
	@media (max-width: 1050px) {
		grid-template-columns: repeat(2, 1fr);
	}
	@media (max-width: 700px) {
		grid-template-columns: repeat(1, 1fr);
	}
`

const Div = styled.div`
	width: 78%;
	margin: 0 auto;
	padding: 1%;
`

const Span = styled.span`
	font-family: none;
	font-size: 1.3rem;
`

const Space = styled.div`
	padding: 2%;
	@media (max-width: 1450px) {
		padding: 5%;
	}
	@media (max-width: 1050px) {
		padding: 13%;
	}
	@media (max-width: 700px) {
		height: 1450px;
	}
	@media (max-width: 622px) {
		height: 1350px;
	}
	@media (max-width: 566px) {
		height: 1250px;
	}
	@media (max-width: 500px) {
		height: 1100px;
	}
	@media (max-width: 428px) {
		height: 1000px;
	}
	@media (max-width: 380px) {
		height: 900px;
	}
`