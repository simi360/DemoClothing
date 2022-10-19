import { Fragment } from "react";
import { useSelector } from "react-redux";
import { selectCategories } from "../../store/categories/category.selector";

import CategoryPreview from '../../components/category-preview/category-preview.component'


const CategoriesPreview = () => {
    const categoriesMap = useSelector(selectCategories);


    return (
       <Fragment>
            {Object.keys(categoriesMap).map((key) => {
                    const products = categoriesMap[key];
                    return (

                        <CategoryPreview key={key} title={key} products={products}/>
            )})
            }

        </Fragment> 
    );
};

export default CategoriesPreview;