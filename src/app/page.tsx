"use client";

import PageLayout from "./components/PageLayout";
import { useTasks } from "./allTasks/Task/context/TaskContext";
import { useProjects } from "./allProject/Project/context/ProjectContext";

export default function Home() {
  const { tasks } = useTasks();
  const { projects } = useProjects();

  const totalProject = projects.length;
  const totalTasks = tasks.length;
  const lowTasks = tasks.filter((t) => t.priority === "low").length;
  const mediumTasks = tasks.filter((t) => t.priority === "medium").length;
  const highTasks = tasks.filter((t) => t.priority === "high").length;

  return (
    <PageLayout>
       {({ viewMode }) => (
        <section className="h-full w-full  bg-gray-100 flex justify-center items-center p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
            {/* Total Projects */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 w-56 text-center hover:shadow-lg transition">
              <p className="text-gray-500 text-xl font-semibold">
                Total Projects
              </p>
              <p className="text-4xl font-extrabold text-blue-600 mt-2">
                {totalProject}
              </p>
            </div>

            {/* Total Tasks */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 w-56 text-center hover:shadow-lg transition">
              <p className="text-gray-500 text-xl font-semibold">Total Tasks</p>
              <p className="text-4xl font-extrabold text-blue-600 mt-2">
                {totalTasks}
              </p>
            </div>

            {/* فراغ علشان يكمل الصف */}
            <div></div>

            {/* Low Priority */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 w-56 text-center hover:shadow-lg transition">
              <p className="text-gray-500 text-xl font-semibold">
                Low Priority
              </p>
              <p className="text-4xl font-extrabold text-green-600 mt-2">
                {lowTasks}
              </p>
            </div>

            {/* Medium Priority */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 w-56 text-center hover:shadow-lg transition">
              <p className="text-gray-500 text-xl font-semibold">
                Medium Priority
              </p>
              <p className="text-4xl font-extrabold text-yellow-500 mt-2">
                {mediumTasks}
              </p>
            </div>

            {/* High Priority */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 w-56 text-center hover:shadow-lg transition">
              <p className="text-gray-500 text-xl font-semibold">
                High Priority
              </p>
              <p className="text-4xl font-extrabold text-red-600 mt-2">
                {highTasks}
              </p>
            </div>
          </div>
        </section>
      )}
    </PageLayout>
  );
}
