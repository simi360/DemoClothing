import { useContext } from "react";
import { CategoriesContext } from '../../contexts/categories.context'
import ProductCard from '../../components/product-card/product-card.component'
import './shop.styles.scss'

const Shop = () => {
    const {} = useContext(CategoriesContext);
    // {products.map((product) => {
    //     return <ProductCard key={product.id} product={product} />
    // })

    return (
        <div className="products-container">
            Hello!
        </div>
    );
};

export default Shop;