import React from "react";

import Student from "layouts/Student";
import CardLastNotes from "components/Cards/CardLastNotes";
import CardBarProject from "components/Cards/CardBarProject";
import { API } from "services/api";

export default function index({ project }) {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardLastNotes />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardBarProject data={project} />
        </div>
      </div>
    </>
  );
}

index.layout = Student;

export const getServerSideProps = async ({ locale, query, req }) => {
  const res = await API.get(`/project/all`);
  const project = res.data.data;
  return {
    props: {
      project,
    },
  };
};
