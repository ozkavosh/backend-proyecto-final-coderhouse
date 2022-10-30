import * as yup from 'yup';

const cartSchema = yup.object().shape({
    email: yup.string().required("Cart owner email is required"),
    products: yup.array().required("Cart products array is required"),
}).noUnknown(true, "Unknown params found in cart").strict(true);

const updatedCartSchema = yup.object().shape({
    email: yup.string().required("Cart owner email is required"),
    products: yup.array().required("Cart products array is required"),
    createdAt: yup.string().required("Cart created at date is required"),
}).noUnknown(true, "Unknown params found in cart").strict(true);

export const isValidCart = async (cart: Object) => {
    return await cartSchema.validate(cart, { abortEarly: false });
}

export const isValidUpdatedCart = async (cart: Object) => {
    return await updatedCartSchema.validate(cart, { abortEarly: false });
}