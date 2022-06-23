import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { getSession, signOut } from 'next-auth/react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import Image from 'next/image';
import { loadUser } from '../redux/actions/user';
import { useEffect } from 'react';
import { Icon } from '@chakra-ui/icons';
import { MdEmail } from 'react-icons/md';
import { BsTelephoneInboundFill, BsFillBriefcaseFill } from 'react-icons/bs';
import { ImLocation } from 'react-icons/im';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';

const ShowData = (props) => (
  <Text
    as="p"
    display="flex"
    alignItems="center"
    gap=".8rem"
    color="gray.600"
    margin="1rem 0"
    fontSize=".9rem"
    {...props}
  >
    {props.children}
  </Text>
);

export default function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.loadedUser.user);

  useEffect(() => {
    loadUser()(dispatch);
  }, [dispatch]);

  return (
    <Box backgroundColor="gray.100" minHeight="100vh" display="flex">
      <Head>
        <title>Assignment of WEBO digital | Profile</title>
        <meta
          name="description"
          content="Assignment of WEBO digital to create login and profile page with next-auth and redux."
        />
      </Head>
      <Box
        backgroundColor="white"
        borderWidth="1px"
        rounded="lg"
        shadow="rgba(149, 157, 165, 0.2) 0px 8px 24px"
        maxWidth={600}
        m="auto"
        width="100%"
      >
        <Box
          backgroundColor="brand.900"
          borderRadius=".5rem .5rem 0 0"
          position="relative"
          height="120px"
        >
          <Box
            as="picture"
            display="flex"
            overflow="hidden"
            borderRadius="100rem"
            maxWidth="120px"
            width="100%"
            position="absolute"
            left="50%"
            transform="translate(-50%)"
            top="60px"
            border="4px solid white"
            shadow="rgba(149, 157, 165, 0.2) 0px 8px 24px"
          >
            <Image
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
              alt="user avatar"
              width="500px"
              height="500px"
            />
          </Box>
        </Box>
        <Box padding="2.8rem 2rem 2rem" margin="1.8rem 0 0">
          <Heading as="h1" textAlign="center" fontSize="1.2rem">
            {user?.name}
          </Heading>
          <Text as="p" textAlign="center">
            @{user?.username}
          </Text>
          <Box as="hr" margin="1.5rem 0" />
          <ShowData>
            <Icon as={MdEmail} /> {user?.email}
          </ShowData>
          <ShowData>
            <Icon as={BsTelephoneInboundFill} /> {user?.phone}
          </ShowData>
          <ShowData>
            <Icon as={ImLocation} /> {user?.address.city},{' '}
            {user?.address.street}
          </ShowData>
          <ShowData>
            <Icon as={BsFillBriefcaseFill} /> {user?.company.name}
          </ShowData>
          <ShowData
            as="a"
            href={'http://' + user?.website}
            target="_blank"
            rel="noreferrer"
            color="brand.700"
          >
            <Icon as={FaExternalLinkAlt} /> {user?.website}
          </ShowData>
          <Button
            display="flex"
            gap=".5rem"
            color="white"
            backgroundColor="brand.700"
            margin="2rem 0 0"
            _hover={{ backgroundColor: 'brand.900' }}
            _active={{ transform: 'scale(.97)' }}
            onClick={signOut}
          >
            <Icon as={BiLogOut} /> Logout
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }

  return {
    props: { session },
  };
}
