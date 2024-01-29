import { MainLayout } from "@/Layouts/MainLayout";
import { Button } from "@/components/ui/button";

export default function OutlineLoader() {
  return (
    <>
      <MainLayout>
      <div className="flex justify-center items-center w-full ">
        <div className="w-full md:w-3/4 border rounded-md flex flex-col p-4 mt-10 items-center min-h-screen overflow-y-auto">
          <div className="flex flex-col items-end w-full justify-center">
            <Button>Generate PDF</Button>
          </div>

          <h1 className="text-2xl border-b w-full p-3 text-blue-600">
            Here's your outline
          </h1>
          <div className="mt-5 flex flex-col gap-3 items-center w-full p-3 animate-pulse">
            <h1 className="bg-slate-200 h-10 w-full "></h1>

            <p className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl h-20 bg-slate-200 border w-full"></p>
          </div>
          <div className="mt-5 flex flex-col items-center w-full p-3">

            <p className="leading-7 [&:not(:first-child)]:mt-6"></p>
          </div>
          <div className="mt-5 flex flex-col items-left  w-full p-3">
            <label className="text-2xl text-blue-600 mb-5">Topics</label>
            <div className="flex flex-col gap-3 items-left justify-start animate-pulse">
              {Array.from({ length: 4 }).map((topic, index) => (
                <div className="flex flex-col gap-3" key={index}>
                 
                  <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight transition-colors h-8 w-full bg-slate-200 "></h2>
                  
                  <p className="h-32 bg-slate-200 "></p>
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
      </MainLayout>
    </>
  );
}
