import React from "react";
import CardProjects from "components/Cards/CardProjects";
import CardTableSalles from "components/Cards/CardTableSalles";

// layout for page

import Admin from "layouts/Admin.js";
import { API } from "services/api";
import CardTableModules from "components/Cards/CardTableModules";

export default function Module({ data }) {
  const [modules, setModules] = React.useState(data);
  const [name, setName] = React.useState("");

  const addSalle = async () => {
    await API.post("/module", {
      name: name,
    }).then(() => {
      setName("");
      API.get("/module").then((res) => {
        setModules(res.data.data);
      });
    });
  };

  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0 ">
          <div className="rounded-t bg-white mb-0 px-4 py-3">
            <div className="text-center flex justify-between">
              <h6 className="text-blueGray-700 text-lg font-bold">
                Créer un module
              </h6>
              <button
                className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button"
                onClick={addSalle}
              >
                Créer
              </button>
            </div>
          </div>
          <div className="flex-auto px-4 lg:px-4 py-3 pt-0 mt-2">
            <form>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Nom du module
                    </label>
                    <input
                      type="email"
                      className="border-0 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
          <CardTableModules data={modules} />
        </div>
        {/* <div className="w-full xl:w-4/12 px-4">
          <CardSocialTraffic />
        </div> */}
      </div>
    </>
  );
}

Module.layout = Admin;

export const getServerSideProps = async ({ req }) => {
  const res = await API.get(`/module`);

  const data = res?.data.data || null;

  return {
    props: {
      data,
    },
  };
};
