// apiService.js
const baseUrl = "https://fakestoreapi.com/";

export const fetchCategories = async () => {
  try {
    const response = await fetch(baseUrl + "products/categories");
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error fetching categories: " + error.message);
  }
};

export const fetchProductsByCategory = async (category) => {
  try {
    const url = baseUrl + `products/category/${category}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error fetching products: " + error.message);
  }
};
