import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";
import { selectCategoriesMap } from "../../store/categories/category.selector";

import {CategoryTitle, CategoryContainer} from './category.styles.jsx';

const Category = () => {
    const {category} = useParams();
    const categoriesMap = useSelector(selectCategoriesMap);
    const [products, setProducts] = useState(categoriesMap[category]);
    console.log('routes>category.component> render/re-rendering component')

    useEffect (() => {
        console.log('routes>category.component> effect fired- calling setProducts')
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap])

    return (
        <>
            <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
            <CategoryContainer>     
                {
                    products && 
                        products.map((product) => (<ProductCard key={product.id} product={product} />))
                }
            </CategoryContainer>
        </>
    )
}

export default Category;