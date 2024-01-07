import { MainLayout } from "@/Layouts/MainLayout";
import { Helmet } from "react-helmet";

const HomePage = () => {
  return (
    <>
      <MainLayout>
        <Helmet>
          <title>Home</title>
        </Helmet>
        <div>Homepage</div>
      </MainLayout>
    </>
  );
};
export default HomePage;
