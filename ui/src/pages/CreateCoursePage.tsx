import { FieldErrors, useFieldArray, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { Button } from "@/components/ui/button";

const currentuser: User = {
  id: "2",
  email: "user@gmail.com",
  firstname: "martin ",
  lastname: "dev",
};
type Formvalues = {
  userID: User["id"];
  Title: string;
  Description: string;
  Completed: boolean;
  hasTopics: boolean;
  user: User;
  topics: Topic[];
};
const defaultFields: Formvalues = {
  Title: "",
  userID: currentuser.id,
  Description: "",
  Completed: false,
  hasTopics: true,
  user: currentuser,
  topics: [],
};
const defaultFields1: Formvalues = {
  Title: "",
  userID: currentuser.id,
  Description: "",
  Completed: false,
  hasTopics: true,
  user: currentuser,
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
};

export default function CreateCoursePage() {
  const form = useForm<Formvalues>({ defaultValues: defaultFields1 });
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  //dynamic topic fields
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    { name: "topics", control }
  );
  const onError = (errors: FieldErrors<Formvalues>) => {
    console.log("form error", errors);
  };
  const onSubmit = (data: Formvalues) => {
    console.log("form submitted");
    console.log(data);
  };
  return (
    <>
      <div className="w-full flex items-center justify-center">
        Create New Course Outline
      </div>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="flex flex-col gap-2 p-7 w-3/4"
        noValidate
      >
        <label>Title</label>
        <input
          type="text"
          id="title"
          {...register("Title", { required: "Username is required" })}
          className="border"
        ></input>
        <p className="text-red-500">{errors.Title?.message}</p>
        <label>Descrition</label>
        <textarea
          id="description"
          {...register("Description", {
            required: "Description is required",
          })}
          className="border"
        ></textarea>
        <p className="text-red-500">{errors.Description?.message}</p>
        <div className=" flex flex-col gap-3 items-center justify-center">
          <div className="text-2xl mb-5">Topics section</div>
          {fields.map((field, index) => (
            <div key={field.id} className="flex flex-col gap-2 w-3/4">
              <label>Topic: {index}</label>
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
                className="mt-5 w-1/5"
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
                Add Topic
              </Button>
            </div>
          ))}
        </div>
        <Button type="submit">Submit</Button>
      </form>
      <DevTool control={control} />
    </>
  );
}
