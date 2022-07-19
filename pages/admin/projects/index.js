import React from "react";

// layout for page

import CardTableProjects from "components/Cards/CardTableProjects";
import Admin from "layouts/Admin.js";
import { API } from "services/api";

export default function Projects({ data, modules }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [mod, setMod] = React.useState("");
  const [mods, setMods] = React.useState(data);
  const [date, setDate] = React.useState("");

  console.log(data);

  const handleSubmit = async (e) => {
    await API.put(`/project/${mod}`, {
      name,
      description,
      date,
    }).then(() => {
      API.get("/project/all").then((res) => {
        setMods(res.data.data);
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
                Créer un project
              </h6>
              <button
                className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleSubmit}
              >
                Créer
              </button>
            </div>
          </div>
          <div className="flex-auto px-4 lg:px-4 py-3 pt-0 mt-2">
            <form>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Nom du projet
                    </label>
                    <input
                      type="email"
                      className="border-0 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Description
                    </label>
                    <input
                      type="email"
                      className="border-0 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Module
                    </label>
                    <select
                      id="countries"
                      class="border-0 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      onChange={(e) => setMod(e.target.value)}
                    >
                      <option value="">Choisir un module</option>
                      {modules.map((mod, _i) => (
                        <option key={_i} value={mod._id}>
                          {mod.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Date de rendu
                    </label>
                    <input
                      type="date"
                      className="border-0 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
          <CardTableProjects data={mods} />
        </div>
      </div>
    </>
  );
}

Projects.layout = Admin;

export const getServerSideProps = async ({ req }) => {
  const res = await API.get(`/project/all`);
  const response = await API.get("/module");
  const modules = response.data.data;
  const data = res?.data.data || null;

  return {
    props: {
      data,
      modules,
    },
  };
};
