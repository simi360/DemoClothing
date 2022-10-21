import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCart } from '../../store/cart/cart.action'
import {ProductCardContainer, Footer, ProductName, ProductPrice} from './product-card.styles.jsx'

const ProductCard = ({product}) => {
    const {name, price, imageUrl} = product;
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    // const {addItemToCart} = useContext(CartContext);

    const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

     return   (<ProductCardContainer>
                    <img src={imageUrl} alt={`${name}`}/>
                    <Footer>
                        <ProductName>{name}</ProductName>
                        <ProductPrice>{price}</ProductPrice>
                    </Footer>
                    <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>Add to cart</Button>
                </ProductCardContainer>)
    }

export default ProductCard;