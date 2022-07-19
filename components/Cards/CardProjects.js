import React from "react";

// components

export default function CardProjects({ data }) {
  return (
    <>
      {data?.map((project, index) => (
        <div
          key={index}
          className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded"
        >
          <div className="flex w-full overflow-x-auto items-center ssm:flex-wrap">
            <div className="border-t-0 px-6 border-l-0 border-r-0 text-s  p-4">
              <p className="font-medium	mb-4">{project.name}</p>
              <p>{project.description}</p>
              <p>Date de rendu : {project.date}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
