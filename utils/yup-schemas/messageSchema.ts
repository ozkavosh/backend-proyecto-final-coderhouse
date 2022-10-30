import * as yup from 'yup';

const messageSchema = yup.object().shape({
    email: yup.string().required("Message owner email is required"),
    body: yup.string().required("Message body is required"),
}).noUnknown(true, "Unknown params found in Message").strict(true);

const updatedMessageSchema = yup.object().shape({
    email: yup.string().required("Message owner email is required"),
    body: yup.string().required("Message body is required"),
    createdAt: yup.string().required("Message created at date is required"),
}).noUnknown(true, "Unknown params found in Message").strict(true);

export const isValidMessage = async (message: Object) => {
    return await messageSchema.validate(message, { abortEarly: false });
}

export const isValidUpdatedMessage = async (message: Object) => {
    return await updatedMessageSchema.validate(message, { abortEarly: false });
}