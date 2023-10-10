import * as yup from "yup";
const emailRegex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
export const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required")
    .matches(emailRegex, "Invalid email format"),
  password: yup
    .string()
    .required("Passwork is required")
    .min(8, "Password must be at least 8 characters")
    .max(12, "Password must be less then 12 characters"),
});

export const SignUpSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("First Name Is Required")
    .min(4, "First Name must be at least 4 characters")
    .max(8, "First Name must be less then 8 characters")
    .matches(/^[a-zA-Z]+$/, "First Name can only contain letters")
    .transform((value) => {
      return value ? value.trim() : value;
    }),

  lastName: yup
    .string()
    .required("lastName Is Required")
    .min(4, "lastName must be at least 4 characters")
    .max(8, "lastName must be less then 8 characters")
    .matches(/^[a-zA-Z]+$/, "First Name can only contain letters")
    .transform((value) => {
      return value ? value.trim() : value;
    }),

  email: yup
    .string()
    .email("This is not valid email type")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(12, "Password must be less then 12 characters")
    .transform((value) => {
      return value ? value.trim() : value;
    }),

  confirmPassword: yup
    .string()
    .required(" Confirm Password is required")
    .min(8, "Confirm Password must be at least 8 characters")
    .max(12, "Confirm Password must be less then 12 characters")
    .transform((value) => {
      return value ? value.trim() : value;
    }),
});

export const Notes = yup.object().shape({
  title: yup
    .string()
    .required("Title Is Required")
    .min(4, "Title must be at least 4 characters")
    .max(12, "Title must be less then 12 characters")
    .transform((value) => {
      return value ? value.trim() : value;
    }),
  content: yup
    .string()
    .required("Content Is Required")
    .min(1, "title must be at least 1 characters")
    .transform((value) => {
      return value ? value.trim() : value;
    }),

  priority: yup
    .object()
    .shape({
      label: yup.string().required("Priority in Required"),
      value: yup.string().required("Priority in Required"),
    })
    .nullable()
    .required("Please Select Priority"),
  boards: yup
    .object()
    .shape({
      label: yup.string(),
      value: yup.string(),
    })
    .nullable(),
});

export const EditNotes = yup.object().shape({
  title: yup
    .string()
    .required("Title Is Required")
    .min(4, "Title must be at least 4 characters")
    .max(12, "Title must be less then 12 characters")
    .transform((value) => {
      return value ? value.trim() : value;
    }),
  content: yup
    .string()
    .required("Content Is Required")
    .min(1, "title must be at least 1 characters")
    .transform((value) => {
      return value ? value.trim() : value;
    }),

  priority: yup
    .object()
    .shape({
      label: yup.string().required("Priority in Required"),
      value: yup.string().required("Priority in Required"),
    })
    .nullable()
    .required("Please Select Priority"),
  boards: yup
    .object()
    .shape({
      label: yup.string(),
      value: yup.string(),
    })
    .nullable(),
});
