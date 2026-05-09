import { useSelector } from "react-redux";
import Feed from "./Feed";
import LandingPage from "./LandingPage";

const Home = () => {
  const userData = useSelector((store) => store.user);

  return userData ? <Feed /> : <LandingPage />;
};

export default Home;
