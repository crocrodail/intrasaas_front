import React from "react";
import { API } from "services/api";
import Admin from "layouts/Admin";
import CardSettingsUser from "components/Cards/CardSettingsUser";
import CardNotes from "components/Cards/CardNotes";

export default function userLanding({ data }) {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full  px-4">
          <CardSettingsUser data={data} />
          {data.role[0] === "Etudiant" ? <CardNotes data={data.notes} /> : null}
        </div>
        {/* <div className="w-full lg:w-4/12 px-4">
          <CardProfile />
        </div> */}
      </div>
    </>
  );
}

userLanding.layout = Admin;

export const getServerSideProps = async ({ locale, query, req }) => {
  const { slug } = query;

  const res = await API.get(`/dashbord/user/${slug}`);

  const data = res.data.data;
  return {
    props: {
      data,
    },
  };
};
