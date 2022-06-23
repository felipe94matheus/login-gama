import { useFormik } from 'formik';
import { Button, Card, Form, Alert } from 'react-bootstrap';
import * as Yup from 'yup';
import { postSignIn, baseUrl } from '../../services/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../../store/users';

const Login: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
          email: '',
          password: '',
          
        },
        validationSchema: Yup.object({
          email: Yup.string()
          .email("Email is not valid")
          .required("Email is required"),
          password: Yup.string()
          .required("Password is required")
          .min(6, "Password must be at least 6 characters")
          .max(12, "Password must be at least 12 characters"),
        }),
        onSubmit: async values => {
          const { accessToken, user } = await postSignIn(values);
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
            <Button  
              type="submit" 
              style={{marginTop: 15}}
              disabled={!formik.isValid}
            >
              Login
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
          </Form>
          </Card.Body>
        </Card>
      )
}

export default Login;