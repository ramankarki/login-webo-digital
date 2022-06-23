export async function getServerSideProps() {
  return {
    redirect: {
      permanent: false,
      destination: 'https://webo.digital',
    },
  };
}

export default function Webo() {
  return <div></div>;
}
