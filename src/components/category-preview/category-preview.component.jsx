import {CategoryPreviewContainer, CategoryPreviewTitle, CategoryPreviewDetails} from './category-preview.styles.jsx';

import ProductCard from '../product-card/product-card.component'

const CategoryPreview = ({title, products}) => {
    return (
        <CategoryPreviewContainer>
          <h2>
            <CategoryPreviewTitle to={title}> {title.toUpperCase()}</CategoryPreviewTitle>
          </h2>  
          <CategoryPreviewDetails>
            {
                products
                .filter((_, ind) => ind < 4)
                .map((product) => (
                    <ProductCard key={product.id} product = {product} />
                ))
            }
          </CategoryPreviewDetails>
        </CategoryPreviewContainer>
    )
}

export default CategoryPreview;

