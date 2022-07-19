import React from "react";

import Admin from "layouts/Admin.js";
import CardLineChart from "components/Cards/CardLineChart";
import CardBarChart from "components/Cards/CardBarChart";
import CardPageVisits from "components/Cards/CardPageVisits";
import CardSocialTraffic from "components/Cards/CardSocialTraffic";
import Student from "layouts/Student";
import CardNotes from "components/Cards/CardNotes";
import CardLastNotes from "components/Cards/CardLastNotes";
import { API } from "services/api";

export default function Notes({ data }) {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
          <CardNotes data={data?.notes} />
        </div>
      </div>
    </>
  );
}

Notes.layout = Student;

export const getServerSideProps = async ({ locale, query, req }) => {
  const token = req.cookies["te_co"];
  const res = await API.get(`/user/info`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = res.data.data;
  return {
    props: {
      data,
    },
  };
};
