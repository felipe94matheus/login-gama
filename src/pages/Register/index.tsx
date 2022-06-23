import { useFormik } from 'formik';
import { Button, Card, Form, Alert } from 'react-bootstrap';
import * as Yup from 'yup';
import { baseUrl, postUser } from '../../services/auth';
import { signIn } from '../../store/users';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
          email: '',
          password: '',
          firstname: '',
          lastname: '',
          age: 0,
        },
        validationSchema: Yup.object({
          email: Yup.string()
          .email("Email is not valid")
          .required("Email is required"),
          password: Yup.string()
          .required("Password is required")
          .min(6, "Password must be at least 6 characters")
          .max(12, "Password must be at least 12 characters"),
          firstname: Yup.string().required("Firstname is required"),
          lastname: Yup.string().required("Lastname is required"),
          age: Yup.number().required("Age is required"),
        }),
        onSubmit: async values => {
          const { accessToken, user } = await postUser({...values, permission: 1});
          dispatch(signIn({accessToken, permission: user.permission}));
          //@ts-ignore
          baseUrl.defaults.headers["Authorization"] = `Bearer ${accessToken}`;
          navigate('/dashboard');
        }
      });
      return (
        <Card style={{ width: '30rem' }}>
          <Card.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group controlId="email" style={{marginTop: 15}}>
              <Form.Label>Email</Form.Label>
              <Form.Control
                autoFocus
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                isInvalid={formik.touched.email && !!formik.errors.email}
                isValid={formik.touched.email && !formik.errors.email}
              />
            </Form.Group>
            <Form.Group controlId="password" style={{marginTop: 15}}>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                isInvalid={!!formik.errors.password && formik.touched.password}
                isValid={formik.touched.password && !formik.errors.password}
              />
            </Form.Group>
            <Form.Group controlId="firstname" style={{marginTop: 15}}>
              <Form.Label>Firstname</Form.Label>
              <Form.Control
                type="text"
                value={formik.values.firstname}
                onChange={formik.handleChange}
                isInvalid={!!formik.errors.firstname && formik.touched.firstname}
                isValid={formik.touched.firstname && !formik.errors.firstname}
              />
            </Form.Group>
            <Form.Group controlId="lastname" style={{marginTop: 15}}>
              <Form.Label>Lastname</Form.Label>
              <Form.Control
                type="text"
                value={formik.values.lastname}
                onChange={formik.handleChange}
                isInvalid={!!formik.errors.lastname && formik.touched.lastname}
                isValid={formik.touched.lastname && !formik.errors.lastname}
              />
            </Form.Group>
            <Form.Group controlId="age" style={{marginTop: 15}}>
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                value={formik.values.age}
                onChange={formik.handleChange}
                isInvalid={!!formik.errors.age && formik.touched.age}
                isValid={formik.touched.age && !formik.errors.age}
              />
              </Form.Group>
            <Button  
              type="submit" 
              style={{marginTop: 15}}
              disabled={!formik.isValid}
            >
              Register
            </Button>
            {formik.errors.email && formik.touched.email 
              && ( 
                <Alert style={{marginTop: 15}} variant="danger">
                  {formik.errors.email}
                </Alert> 
              )}
            {formik.errors.password && formik.touched.password 
              && ( 
                <Alert style={{marginTop: 15}} variant="danger">
                  {formik.errors.password}
                </Alert> 
              )}
            {formik.errors.firstname && formik.touched.firstname
              && (
                <Alert style={{marginTop: 15}} variant="danger">
                  {formik.errors.firstname}
                </Alert>
              )}
            {formik.errors.lastname && formik.touched.lastname
              && (
                <Alert style={{marginTop: 15}} variant="danger">
                  {formik.errors.lastname}
                </Alert>
              )}
            {formik.errors.age && formik.touched.age
              && (
                <Alert style={{marginTop: 15}} variant="danger">
                  {formik.errors.age}
                </Alert>
              )}
          </Form>
          </Card.Body>
        </Card>
      )
}

export default Register;