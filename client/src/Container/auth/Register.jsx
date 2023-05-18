import { useNavigate } from "react-router";
import Layout from "../../Component/Layout/Layout"
import { styles } from "../../Utils/Style"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'

const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(100, 'Too Long!')
        .required('Required'),
    address: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    phoneNumber: Yup.string()
        .matches(/^\d+$/, 'Invalid phone number')
        .min(10, 'Phone number must be at least 10 digits')
        .max(10, 'Phone number can have at most 10 digits')
        .required('Phone number is required'),
    password: Yup.string()
        .min(5, 'Password must be at least 5 characters')
        .max(20, 'Password can have at most 20 characters')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
            'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        )
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
});

const Register = () => {
    const navigate = useNavigate()

    const handleSubmit = async (value) => {
        const { name, email, phoneNumber, password, address } = value
        try {
            const res = await axios.post(`${import.meta.env.VITE_APP_URL}/api/auth/register`, {
                name,
                email,
                password,
                phone: phoneNumber,
                address,
            })
            if (res && res.data.success) {
                // toast.success(res.data.message)
                navigate("/login");
            } else {
                // toast.error(res.data.message);
                console.log(res.data.message)
            }

        } catch (error) {
            console.log(error)
        }

    }


    return (
        <Layout>
            <div className="h-screen bg-slate-800 flex flex-col justify-center items-center ">
                <Formik
                    initialValues={{
                        name: '',
                        address: '',
                        email: '',
                        phoneNumber: '',
                        password: '',
                        confirmPassword: '',
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={values => {
                        // same shape as initial values
                        handleSubmit(values);
                    }}
                >
                    {({ errors, touched }) => (
                        <Form className="border min-w-[70%] flex flex-col justify-center items-center mt-20 p-5 rounded-2xl">
                            <h1 className={`${styles.heroHeadText}`}>Signup</h1>

                            <Field name="name" placeholder="Full Name" className='input mt-2' />
                            {errors.name && touched.name ? (
                                <div>{errors.name}</div>
                            ) : null}
                            <Field name="address" className='input mt-2' placeholder="Address" />
                            {errors.address && touched.address ? (
                                <div>{errors.address}</div>
                            ) : null}
                            <Field name="email" type="email" placeholder="Email" className='input mt-2' />
                            {errors.email && touched.email ? <div>{errors.email}</div> : null}

                            <Field name="phoneNumber" className='input mt-2' placeholder="Phone Number" />
                            {errors.phoneNumber && touched.phoneNumber ? (
                                <div>{errors.phoneNumber}</div>
                            ) : null}
                            <Field
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                className='input mt-2'
                            />
                            <ErrorMessage name="password" component="div" />
                            <Field
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="Confirm your password"
                                className="input mt-2"
                            />
                            <ErrorMessage name="confirmPassword" component="div" />
                            <button className="btn mt-2" type="submit">Submit</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </Layout>
    )
}

export default Register
