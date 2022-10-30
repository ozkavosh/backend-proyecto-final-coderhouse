import * as yup from 'yup';

const orderSchema = yup.object().shape({
    email: yup.string().required("Order owner email is required"),
    products: yup.array().required("Order products array is required").min(1, "Order products array must not be empty"),
    status: yup.string()
}).noUnknown(true, "Unknown params found in Order").strict(true);

const updatedOrderSchema = yup.object().shape({
    email: yup.string().required("Order owner email is required"),
    products: yup.array().required("Order products array is required").min(1, "Order products array must not be empty"),
    status: yup.string().required("Order status is required"),
    createdAt: yup.string().required("Order created at date is required"),
    orderNum: yup.number().required("Order number is required"),
}).noUnknown(true, "Unknown params found in Order").strict(true);

export const isValidOrder = async (order: Object) => {
    return await orderSchema.validate(order, { abortEarly: false });
}

export const isValidUpdatedOrder = async (order: Object) => {
    return await updatedOrderSchema.validate(order, { abortEarly: false });
}