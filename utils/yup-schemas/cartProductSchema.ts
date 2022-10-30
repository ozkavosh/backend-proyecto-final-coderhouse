import * as yup from 'yup';

const cartProductSchema = yup.object().shape({
    id: yup.string().required("Product id is required"),
    quantity: yup.number().required("Product quantity is required").positive("Product quantity must be greater than 0"),
}).noUnknown(true, "Unknown params found in product").strict(true);

const isValidCartProduct = async (product: Object) => {
    return await cartProductSchema.validate(product, { abortEarly: false });
}

export default isValidCartProduct;