import dbConnect from './config/dbConnect';

const Home = async () => {
  await dbConnect();
  return <div>Home</div>;
};

export default Home;
