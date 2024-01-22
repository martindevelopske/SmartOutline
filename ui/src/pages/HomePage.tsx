import { MainLayout } from "@/Layouts/MainLayout";
import HeroBanner from "@/components/HeroBanner";
import { Helmet } from "react-helmet";

const HomePage = () => {
  return (
    <>
      <MainLayout>
        <Helmet>
          <title>Home</title>
        </Helmet>
        <div>
          <HeroBanner />
          {/* <Link to="/createNewCourseOutline">Create New Course</Link> */}
        </div>
      </MainLayout>
    </>
  );
};
export default HomePage;
