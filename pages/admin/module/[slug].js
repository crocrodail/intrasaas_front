import React from "react";
import { API } from "services/api";
import Admin from "layouts/Admin";
import CardSettingsUser from "components/Cards/CardSettingsUser";
import { DateTime } from "luxon";
import CardTableModule from "components/Cards/CardTableModule";

export default function ModuleLanding({ data }) {
  // console.log(data);
  // console.log(DateTime.fromISO(data.lessons[0].StartTime).toString());
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full  px-4">
          <CardTableModule data={data} />
          {/* <p>{DateTime.fromISO(data.lessons[0].StartTime).toLocaleString()}</p> */}
        </div>
      </div>
    </>
  );
}

ModuleLanding.layout = Admin;

export const getServerSideProps = async ({ locale, query, req }) => {
  const { slug } = query;
  const res = await API.get(`/module/${slug}`);

  const data = res.data.data;
  return {
    props: {
      data,
    },
  };
};
