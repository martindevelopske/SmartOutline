import { FieldErrors, useFieldArray, useForm, useWatch } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { createCousrseOutline } from "@/endpoints";
import axios from "axios";
import { User } from "lucide-react";
import { TopicsAccordion } from "@/components/TopicsAccordion";
import { Toaster, toast } from "sonner";

type Formvalues = {
  userID: User["id"] | undefined;
  Title: string;
  Description: string;
  Completed: boolean;
  hasTopics: boolean;
  user: User;
  topics: Topic[];
};
export default function CreateCoursePage() {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(
    JSON.parse(localStorage.getItem("user") as string)
  );

  const [defaultFields, setDefaultFields] = useState({
    Title: "",
    userID: currentUser?.id,
    Description: "",
    Completed: false,
    hasTopics: true,
    user: { currentUser },
    topics: [
      {
        TopicID: 1,
        CourseID: 1, // Adjust this according to your data structure
        Name: "",
        Description: "",
        Completed: false,
        hasSubTopics: false, // Adjust as needed
        course: {
          CourseID: 1, // Adjust as needed
        },
        subtopics: [], // Adjust as needed
      },
    ],
  });
  const navigate = useNavigate();
  const location = useLocation();
  //get user from local storage
  useEffect(() => {
    const userstring: string | null = localStorage.getItem("user");
    if (userstring) {
      const user = JSON.parse(userstring as string) as User;
      setCurrentUser(JSON.parse(userstring));
      //set the defaults
      // setDefaultFields((prevDefaultFields) => ({
      //   ...prevDefaultFields,
      //   userID: user.id,
      //   user: user,
      // }));
    } else {
      console.log("no user form local storage");
      navigate("/signin", { state: { from: location } });
    }
  }, []);

  const form = useForm<Formvalues>({
    defaultValues: defaultFields,
    resetOptions: {
      keepDefaultValues: true,
    },
  });
  const { register, control, watch, handleSubmit, formState } = form;
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    { name: "topics", control }
  );

  const { errors } = formState;

  //watch
  // const watchAllFields = watch();
  // console.log(watchAllFields);
  const TitleWatch = useWatch({ control, name: "Title" });
  const DesWatch = useWatch({ control, name: "Description" });
  const TopicsWatch = useWatch({ control, name: "topics" });

  const onError = (errors: FieldErrors<Formvalues>) => {
    console.log("form error", errors);
  };
  const onSubmit = async (data: Formvalues) => {
    try {
      console.log(defaultFields);

      console.log("form submitted");
      console.log(data);
      //make api call
      // const res = await axios.post(createCousrseOutline, data, {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });
      toast.success("submission successfull");
      navigate(`/outline/1`);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <div className="flex flex-row min-h-screen">
        <Toaster position="top-right" richColors />
        <div className="flex flex-col w-full md:w-1/2">
          <Header />
          <div className="w-full flex items-center justify-center mt-20 text-2xl border-b py-5">
            Create New Course Outline
          </div>
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="flex flex-col gap-2 p-7 w-full  border"
            noValidate
          >
            <label className="font-bold">User ID</label>
            <input
              type="text"
              id="id"
              {...register("userID")}
              value={defaultFields.userID}
            ></input>
            <label className="font-bold">Title</label>
            <input
              type="text"
              id="title"
              {...register("Title", { required: "Username is required" })}
              className="border p-2"
            ></input>
            <p className="text-red-500">{errors.Title?.message}</p>
            <label className="font-bold">Descrition</label>
            <textarea
              id="description"
              {...register("Description", {
                required: "Description is required",
              })}
              className="border p-2"
            ></textarea>
            <p className="text-red-500">{errors.Description?.message}</p>
            <div className=" flex flex-col gap-3 items-center justify-center">
              <div className="text-2xl mb-5 font-bold">Topics section</div>
              {fields.map((field, index) => (
                <div key={field.id} className="flex flex-col gap-2 w-3/4">
                  <label className="font-bold">Topic: {index}</label>
                  <input
                    className="border rounded-md p-2 h-8"
                    type="text"
                    {...register(`topics.${index}.Name` as const, {
                      required: `Topic Name is required for topic ${index + 1}`,
                    })}
                    placeholder="Topic Name"
                  />
                  <textarea
                    className="border rounded-md p-2 h-32"
                    {...register(`topics.${index}.Description` as const, {
                      required: `Topic Description is required for topic ${
                        index + 1
                      }`,
                    })}
                    placeholder="Topic Description"
                  />
                  {/* <label>
                Completed
                <input
                  type="checkbox"
                  {...register(`topics.${index}.Completed` as const)}
                />
              </label> */}
                  {index > 0 && (
                    <Button
                      variant="destructive"
                      type="button"
                      className="w-1/5"
                      onClick={() => remove(index)}
                    >
                      Remove
                    </Button>
                  )}
                  <br></br>
                  <Button
                    type="button"
                    className="mt-5 w-1/2 md:w-2/5"
                    onClick={() =>
                      append({
                        TopicID: 0, // Replace with the appropriate default value
                        CourseID: 0, // Replace with the appropriate default value
                        Name: "", // Replace with the appropriate default value
                        Description: "", // Replace with the appropriate default value
                        Completed: false,
                        hasSubTopics: false, // Replace with the appropriate default value
                        course: {
                          CourseID: 0, // Replace with the appropriate default value
                        },
                        subtopics: [], // You may initialize subtopics with default values if needed
                      })
                    }
                  >
                    Add Topic +
                  </Button>
                </div>
              ))}
            </div>
            <Button className="w-1/3 ml-40 md:ml-60 mt-8" type="submit">
              Submit
            </Button>
          </form>
          <DevTool control={control} />
        </div>

        <div className="w-1/2 border rounded-md md:flex flex-col p-4 mt-20 items-center h-screen fixed top-0 right-0 overflow-y-auto hidden">
          <h1 className="text-2xl border-b w-full p-3 text-blue-600">
            Here's your live outline
          </h1>
          <div className="mt-5 flex flex-col items-center w-full p-3">
            {/* <label className="text-2xl text-blue-600">Title</label>
            <h1 className="text-xl font-mono">{TitleWatch}</h1> */}
            <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl">
              {TitleWatch}
            </h1>
          </div>
          <div className="mt-5 flex flex-col items-center w-full p-3">
            {/* <label className="text-2xl text-blue-600">Description</label>
            <h1 className="text-xl font-mono">{DesWatch}</h1> */}
            <p className="leading-7 [&:not(:first-child)]:mt-6">{DesWatch}</p>
          </div>
          <div className="mt-5 flex flex-col items-left  w-full p-3">
            <label className="text-2xl text-blue-600 mb-5">Topics</label>
            <div className="flex flex-col items-left justify-start">
              {TopicsWatch.map((topic, index) => (
                <div className="flex flex-col gap-2">
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
      </div>
    </>
  );
}
