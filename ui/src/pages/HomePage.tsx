import { MainLayout } from "@/Layouts/MainLayout";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <MainLayout>
        <Helmet>
          <title>Home</title>
        </Helmet>
        <div>
          <Link to="/createNewCourseOutline">Create New Course</Link>
        </div>
      </MainLayout>
    </>
  );
};
export default HomePage;
