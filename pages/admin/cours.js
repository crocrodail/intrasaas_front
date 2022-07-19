import React from "react";
import CardTableSalles from "components/Cards/CardTableSalles";
import DatePicker, { registerLocale } from "react-datepicker";
import fr from "date-fns/locale/fr";
// layout for page

import Admin from "layouts/Admin.js";
import { API } from "services/api";
import CardTableCours from "components/Cards/CardTableCours";

export default function Cours({ salles, intervenants, modules, planning }) {
  const [salle, setSalle] = React.useState("");
  const [mod, setMod] = React.useState("");
  const [user, setUser] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [cours, setCourss] = React.useState(planning);
  const addCours = async () => {
    await API.post("/planning", {
      Subject: user,
      StartTime: startDate,
      EndTime: endDate,
      PromoId: 1,
      TaskId: 1,
      module: mod,
      salle: salle,
    }).then(() => {
      setSalle("");
      setMod("");
      setUser("");
      setStartDate("");
      setEndDate("");
    });
  };

  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0 ">
          <div className="rounded-t bg-white mb-0 px-4 py-3">
            <div className="text-center flex justify-between">
              <h6 className="text-blueGray-700 text-lg font-bold">
                Créer une salle
              </h6>
              <button
                className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => addCours()}
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
                      Intervenant
                    </label>
                    <select
                      id="countries"
                      class="border-0 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      onChange={(e) => setUser(e.target.value)}
                    >
                      <option value="">Choisir un intervenant</option>
                      {intervenants.map((user, i) => (
                        <option
                          key={i}
                          value={user.firstname + " " + user.lastname}
                        >
                          {user.firstname} {user.lastname}
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
                      Salle
                    </label>
                    <select
                      id="countries"
                      class="border-0 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      onChange={(e) => setSalle(e.target.value)}
                    >
                      <option value="">Choisir une salle</option>
                      {salles.map((salle, index) => (
                        <option key={index} value={salle.id}>
                          {salle.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Date et heure de début
                    </label>
                    <input
                      type="datetime-local"
                      id="meeting-time"
                      name="meeting-time"
                      value={startDate}
                      className="border-0 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Date et heure de fin
                    </label>
                    <input
                      type="datetime-local"
                      id="meeting-time"
                      name="meeting-time"
                      value={endDate}
                      className="border-0 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <CardTableCours data={cours} />
      </div>
    </>
  );
}

Cours.layout = Admin;

export const getServerSideProps = async ({ req }) => {
  const res = await API.get(`/salle/notused`);
  const response = await API.get(`/dashbord/intervenant`);
  const r = await API.get(`/module`);
  const resp = await API.get("/planning");

  const planning = resp.data;
  const salles = res.data.data;
  const intervenants = response.data.data;
  const modules = r.data.data;

  return {
    props: {
      salles,
      intervenants,
      modules,
      planning,
    },
  };
};
