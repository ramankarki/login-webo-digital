import Head from 'next/head';
import { useEffect } from 'react';
import { Box, ButtonGroup, Heading } from '@chakra-ui/react';
import { Formik } from 'formik';
import { InputControl, SubmitButton } from 'formik-chakra-ui';
import * as React from 'react';
import * as Yup from 'yup';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { getSession } from 'next-auth/react';

const initialValues = {
  email: '',
  password: '',
};

const validationSchema = Yup.object({
  email: Yup.string().required().email(),
  password: Yup.string().required().min(6),
});

const Form = () => {
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/profile');
  });

  const onSubmit = async (values) => {
    const result = await signIn('credentials', {
      redirect: false,
      ...values,
    });

    if (result.ok) {
      router.push('/profile');
    } else {
      toast.error('Email or Password is wrong!', {
        position: 'bottom-left',
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <Box
      backgroundColor={'gray.100'}
      margin="0"
      padding="1rem"
      minHeight={'100vh'}
      display="flex"
    >
      <Head>
        <title>Assignment of WEBO digital | Login</title>
        <meta
          name="description"
          content="Assignment of WEBO digital to create login and profile page with next-auth and redux."
        />
      </Head>
      <ToastContainer
        position="bottom-left"
        autoClose={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
      />
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, values, errors }) => (
          <Box
            backgroundColor="white"
            borderWidth="1px"
            rounded="lg"
            shadow="rgba(149, 157, 165, 0.2) 0px 8px 24px"
            maxWidth={600}
            p={'3rem'}
            m="auto"
            as="form"
            onSubmit={handleSubmit}
            width="100%"
          >
            <Box
              as="picture"
              maxWidth="120px"
              margin={' 0 auto 1rem'}
              display="block"
            >
              <Image
                src="/assets/webo.svg"
                alt="webo logo"
                width="182px"
                height="51px"
              />
            </Box>
            <Heading
              color="brand.700"
              fontSize="1.5rem"
              margin="0 0 2.5rem"
              textAlign={'center'}
            >
              Assignment of WEBO digital
            </Heading>
            <InputControl
              name="email"
              label="Email"
              margin="1.4rem 0"
              labelProps={{ color: 'gray.500' }}
              inputProps={{ variant: 'filled' }}
              _autofill={true}
            />
            <InputControl
              name="password"
              inputProps={{ type: 'password', variant: 'filled' }}
              label="Password"
              labelProps={{ color: 'gray.500' }}
              margin="1.4rem 0"
            />
            <ButtonGroup width={'100%'} margin="1rem 0 0">
              <SubmitButton
                width={'100%'}
                backgroundColor="brand.700"
                _hover={{ backgroundColor: 'brand.900' }}
                _active={{ transform: 'scale(.97)' }}
              >
                Submit
              </SubmitButton>
            </ButtonGroup>
          </Box>
        )}
      </Formik>
    </Box>
  );
};

export default Form;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: '/profile',
      },
    };
  }

  return {
    props: { session },
  };
}
