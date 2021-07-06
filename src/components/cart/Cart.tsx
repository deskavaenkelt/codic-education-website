import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../../shared/providers/UserProvider'
import { CheckoutOptions } from './CheckoutOptions'
import CodicAPIService from '../../shared/api/services/CodicAPIService'
import exit from '../../shared/images/icons/cross.svg'
import trash from '../../shared/images/icons/trash.png'
import emptyCart from '../../shared/images/empty_cart.png'
import styled from 'styled-components'
import RoutingPath from '../../routes/RoutingPath'

export const Cart = (props: { isCartOpen: boolean, setIsCartOpen: (value: boolean) => void }) => {
	const history = useHistory()
	const { isCartOpen, setIsCartOpen } = props
	const [authenticatedUser, setAuthenticatedUser] = useContext(UserContext)

	const removeProductFromCart = async (array: [], index: number) => {
		const newArray = [...array.slice(0, index), ...array.slice(index + 1)]
		await CodicAPIService.updateCart({
			cartId: authenticatedUser?.shoppingCart?._id,
			products: newArray
		})
		setAuthenticatedUser({ ...authenticatedUser, shoppingCart: { ...authenticatedUser.shoppingCart, products: newArray } })
	}

	const displayCartWithItems = () => {
		return <DisplayCartWrapper>
			{authenticatedUser?.shoppingCart?.products?.map((product: any, index: number) =>
				<UList key={index}>
					<Image /* onClick={() => navigateToProductDetail(product)} */
						src={'https://picsum.photos/200/200'}
						alt='' />
					<Icon onClick={() => removeProductFromCart(authenticatedUser.shoppingCart.products, index)}
						src={trash}
						alt={''} />
					<List>titel: {product.title}</List>
					<List>pris: {product.price} :-</List>
					<hr />
				</UList>
			)}
			<CheckoutOptions setIsCartOpen={setIsCartOpen} />
		</DisplayCartWrapper >
	}

	const navigateToShop = () => {
		history.push(RoutingPath.shopView)
		setIsCartOpen(false)
	}

	const displayEmptyCart = () => {
		return <Div>
			<CartImage src={emptyCart} alt='' />
			<p>Din varukorg är tom.. <br /> Besök vår butik?</p>
			<button onClick={() => navigateToShop()}>Butik</button> <br />
		</Div>
	}

	return (
		<CartWrapper isOpen={isCartOpen}>
			<span>{authenticatedUser.shoppingCart.products.length} föremål i varukorgen</span>
			<ExitImage src={exit} alt={''} onClick={() => setIsCartOpen(false)} />
			{authenticatedUser.shoppingCart.products.length !== 0 ? displayCartWithItems() : displayEmptyCart()}
		</CartWrapper>
	)
}

interface values {
	isOpen: boolean;
}

const CartWrapper = styled.nav<values>`
	height: 100%;
	background: white;
	box-shadow: 1px 0px 7px rgba(0, 0, 0, 0.5);
	position: fixed;
	top: 0;
	right: 0;
	width: 70%;
	max-width: 400px;
	z-index: 200;
	transform: translateX(+100%);
	transition: transform 0.3s ease-in-out;
	transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(100)'}
`

const DisplayCartWrapper = styled.div`
	height: 78%;
	overflow-y: auto;
`

const UList = styled.ul`
	border-bottom: solid 1px white;
	padding: 1%;
`

const List = styled.li`

`

const Image = styled.img`
	width: 130px;
`

const Div = styled.div`
	margin-top: 80%;
	text-align: center;
`

const CartImage = styled.img`
	width: 98%;
	
	opacity: 1;
	animation-name: fadeInOpacity;
	animation-iteration-count: 1;
	animation-timing-function: ease-in;
	animation-duration: 0.4s;
`

const Icon = styled.img`
	width: 14px;
	height: 16px;
	aspect-ratio: auto 14/16;
	cursor: pointer;
	transition: 0.3s;
	float: right;
	margin-right: 30px;
	&:hover {
		transform: rotate(140deg);
		transition: 0.3s;
	}
`

const ExitImage = styled.img`
	width: 15px;
	height: 15px;
	aspect-ratio: auto 15/15;
	transition: 0.2s;
	cursor: pointer;
	margin-left: 51%;
	&:hover {
		transition: 0.2s;
		transform: rotate(90deg)
	}
`