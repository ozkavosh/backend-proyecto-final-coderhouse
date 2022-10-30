import * as yup from 'yup';

const loginUserSchema = yup.object().shape({
    email: yup.string().required("User email is required").email("User email does not match an email format"),
    password: yup.string().required("User password is required").min(4, "User password must be at least 4 characters long"),
}).noUnknown(true, "Unknown params found in user").strict(true);

const registerUserSchema = yup.object().shape({
    email: yup.string().required("User email is required").email("User email does not match an email format"),
    password: yup.string().required("User password is required").min(4, "User password must be at least 4 characters long"),
    name: yup.string().required("User name is required").matches(/^[a-zA-Z]+( [a-zA-Z]+)*$/, "User name may only have words and spaces between them"),
    cellphone: yup.number().required("User phone number is required")
}).noUnknown(true, "Unknown params found in user").strict(true);

export const isValidLoginUser = async (user: Object) => {
    return await loginUserSchema.validate(user, { abortEarly: false });
}

export const isValidRegisterUser = async (user: Object) => {
    return await registerUserSchema.validate(user, { abortEarly: false });
}