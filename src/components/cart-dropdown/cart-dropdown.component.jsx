
import {  useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component';
import { selectIsCartOpen, selectCartItems } from '../../store/cart/cart.selector'
import { setIsCartOpen } from '../../store/cart/cart.action'
import {CartDropdownContainer, EmptyMessage, CartItems} from './cart-dropdown.styles.jsx';

const CartDropdown = () => {
    // const {cartItems, setIsCartOpen, isCartOpen} = useContext(CartContext);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isCartOpen = useSelector(selectIsCartOpen);
    const cartItems = useSelector(selectCartItems);
    

    const goToCheckoutHandler = () => {
        dispatch(setIsCartOpen(!isCartOpen));
        navigate('/checkout');
    };

    return (
        <CartDropdownContainer>
            <CartItems>
                {
                    cartItems.length ? (
                    cartItems.map(item => (
                    <CartItem key={item.id} cartItem={item} />
                ))) : (
                    <EmptyMessage>Your cart is empty!</EmptyMessage>
                )             
            }
            </CartItems>
            <Button onClick={goToCheckoutHandler}>Checkout</Button>
        </CartDropdownContainer>
    )
}

export default CartDropdown;