// import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const HeroBanner = () => {
  // const history = useHistory();

  // const navigateToCreateCourseOutline = () => {
  //   history.push("/createcourseoutline");
  // };

  return (
    <>
      <div className="w-full h-500 flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-5 h-full w-full md:w-3/4">
          <h3 className="text-3xl">Welcome to our Platform.</h3>
          <p>Unlock your potential and teach or learn with us.</p>
          <p className="text-lg md:text-xl mb-8">
            Create, collaborate, and seamlessly generate PDFs from your course
            outlines.
          </p>
          <Link
            to="/outline/new"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Get Started
          </Link>
        </div>
      </div>
    </>
  );
};

export default HeroBanner;
