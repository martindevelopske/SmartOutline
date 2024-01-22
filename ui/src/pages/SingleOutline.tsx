import { MainLayout } from "@/Layouts/MainLayout";
import { getCousrseOutline } from "@/endpoints";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function SingleOutline() {
  const { id } = useParams();

  const [courseOutline, setCourseOutline] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getOutline = async () => {
    try {
      const response = await axios.get(`${getCousrseOutline}/${id}`);
      console.log(response.data.message);
      if (!response || !response.data.success) {
        console.log("error getting data", response.data.message);
        setError(response.data.message || "error occured");
        console.log(error);
      }
      setCourseOutline(response.data.message);
      // Assuming the response data is what you want to store
    } catch (error) {
      setError(
        error.message || "An error occurred while fetching the course outline."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOutline();
  }, [id]);
  const TopicsWatch = [{}, {}];
  return (
    <>
      <MainLayout>
        <div className="flex justify-center items-center w-full ">
          {error ? (
            <div>{error}</div>
          ) : (
            <div className="w-full md:w-3/4 border rounded-md flex flex-col p-4 mt-10 items-center min-h-screen overflow-y-auto">
              <h1 className="text-2xl border-b w-full p-3 text-blue-600">
                Here's your outline
              </h1>
              <div className="mt-5 flex flex-col items-center w-full p-3">
                {/* <label className="text-2xl text-blue-600">Title</label>
            <h1 className="text-xl font-mono">{TitleWatch}</h1> */}
                <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl">
                  {courseOutline?.Title}
                </h1>
              </div>
              <div className="mt-5 flex flex-col items-center w-full p-3">
                {/* <label className="text-2xl text-blue-600">Description</label>
            <h1 className="text-xl font-mono">{DesWatch}</h1> */}
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                  {courseOutline?.Description}
                </p>
              </div>
              <div className="mt-5 flex flex-col items-left  w-full p-3">
                <label className="text-2xl text-blue-600 mb-5">Topics</label>
                <div className="flex flex-col items-left justify-start">
                  {courseOutline?.topics?.map((topic, index) => (
                    <div className="flex flex-col gap-2" key={index}>
                      {/* <h3 className="text-lg p-2 ">
                    {index + 1}. {topic.Name}
                  </h3> */}
                      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight transition-colors first:mt-5">
                        {index + 1}. {topic.Name}
                      </h2>
                      {/* <p className="font-light text-lg ml-5">{topic.Description}</p> */}
                      <p className="leading-7 [&:not(:first-child)]:mt-6">
                        {topic.Description}
                      </p>
                    </div>
                    // <TopicsAccordion
                    //   topic={topic.Name}
                    //   Description={topic.Description}
                    // />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </MainLayout>
    </>
  );
}
