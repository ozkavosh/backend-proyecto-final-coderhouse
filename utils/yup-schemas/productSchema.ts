import * as yup from 'yup';

const productSchema = yup.object().shape({
    title: yup.string().required("Product title is required"),
    price: yup.number().required("Product price is required").positive("Product price must be greater than 0"),
    category: yup.string().required("Product category is required"),
    description: yup.string().required("Product description is required"),
    photoUrl: yup.string().required("Product photoUrl is required").url("Product photoUrl could not be parsed"),
}).noUnknown(true, "Unknown params found in product").strict(true);

const isValidProduct = async (product: Object) => {
    return await productSchema.validate(product, { abortEarly: false });
}

export default isValidProduct;