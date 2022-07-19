import React from "react";

import Admin from "layouts/Admin.js";
import CardLineChart from "components/Cards/CardLineChart";
import CardBarChart from "components/Cards/CardBarChart";
import CardPageVisits from "components/Cards/CardPageVisits";
import CardSocialTraffic from "components/Cards/CardSocialTraffic";
import Student from "layouts/Student";
import CardNotes from "components/Cards/CardNotes";
import CardLastNotes from "components/Cards/CardLastNotes";
import CardProjects from "components/Cards/CardProjects";
import { API } from "services/api";

export default function Projects({ data }) {
  return (
    <>
      {/* <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardLineChart />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardBarChart />
        </div>
      </div> */}
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
          <CardProjects data={data} />
        </div>
        {/* <div className="w-full xl:w-4/12 px-4">
          <CardSocialTraffic />
        </div> */}
      </div>
    </>
  );
}

Projects.layout = Student;

export const getServerSideProps = async ({ locale, query, req }) => {
  const res = await API.get(`/project/all`);
  const data = res.data.data;
  return {
    props: {
      data,
    },
  };
};
