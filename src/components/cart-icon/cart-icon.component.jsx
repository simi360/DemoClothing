import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectIsCartOpen, selectCartCount } from '../../store/cart/cart.selector'
import { setIsCartOpen } from '../../store/cart/cart.action'


import {CartIconContainer, ShoppingIcon, ItemCount} from './cart-icon.styles.jsx'


const CartIcon = () => {
    // const {isCartOpen, setIsCartOpen, cartCount} = useContext(CartContext);
    const dispatch = useDispatch();
    const isCartOpen = useSelector(selectIsCartOpen);
    const cartCount = useSelector(selectCartCount);

    const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

    return  (<CartIconContainer onClick={toggleIsCartOpen}>
                <ShoppingIcon />
                <ItemCount>{cartCount}</ItemCount>
            </CartIconContainer>)
}

export default CartIcon;
   

