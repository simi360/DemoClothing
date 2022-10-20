export const selectCategoriesMap = (state) => {
    console.log('store>categories>category.selector> selector fired')
    const categoriesMap = state.categories.categories.reduce(
      (acc, { title, items }) => {
        acc[title.toLowerCase()] = items;
        return acc;
      },
      {}
    );
    return categoriesMap;
  };