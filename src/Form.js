import { useFormik } from "formik";
import * as Yup from 'yup';

const Form = () => {

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            amount: 0,
            currency: '',
            text: '',
            terms: false
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            amount: Yup.number().positive('Must be positive and more than 0').required('Required'),
            currency: Yup.string().required('Select currency!'),
            terms: Yup.boolean().oneOf([true], 'Need to check')
        }),
        onSubmit: values => {
            console.log(JSON.stringify(values, null, 2));
        },
    });

    return (
        <form className="form" onSubmit={formik.handleSubmit}>
            <h2>Отправить пожертвование</h2>
            <label htmlFor="name">Ваше имя</label>
            <input
                id="name"
                type="text"
                {...formik.getFieldProps('name')}
            />
            {formik.touched.name && formik.errors.name ? (
                <div>{formik.errors.name}</div>
            ) : null}

            <label htmlFor="email">Ваша почта</label>
            <input
                id="email"
                type="email"
                {...formik.getFieldProps('email')}
            />
            {formik.touched.email && formik.errors.email ? (
                <div>{formik.errors.email}</div>
            ) : null}

            <label htmlFor="amount">Количество</label>
            <input
                id="amount"
                type="number"
                {...formik.getFieldProps('amount')}
            />
            {formik.touched.amount && formik.errors.amount ? (
                <div>{formik.errors.amount}</div>
            ) : null}

            <label htmlFor="currency">Валюта</label>
            <select
                id="currency"
                {...formik.getFieldProps('currency')}>
                <option value="">Выберите валюту</option>
                <option value="USD">USD</option>
                <option value="UAH">UAH</option>
                <option value="RUB">RUB</option>
            </select>
            {formik.touched.currency && formik.errors.currency ? (
                <div>{formik.errors.currency}</div>
            ) : null}

            <label htmlFor="text">Ваше сообщение</label>
            <textarea
                id="text"
                {...formik.getFieldProps('text')}
            />

            <label className="checkbox">
                <input type="checkbox" {...formik.getFieldProps('terms')} />
                Соглашаетесь с политикой конфиденциальности?
            </label>
            {formik.touched.terms && formik.errors.terms ? (
                <div>{formik.errors.terms}</div>
            ) : null}

            <button type="submit">Отправить</button>
        </form>
    )
}

export default Form;