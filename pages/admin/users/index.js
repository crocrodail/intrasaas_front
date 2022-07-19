import React from "react";
import CardProjects from "components/Cards/CardProjects";
import CardTableUsers from "components/Cards/CardTableUsers.js";
import DatePicker, { registerLocale } from "react-datepicker";
import fr from "date-fns/locale/fr";
// layout for page

import Admin from "layouts/Admin.js";
import { API } from "services/api";
import { useRouter } from "next/router";

export default function Index({ data }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [role, setRole] = React.useState("");
  const [startDate, setStartDate] = React.useState(new Date());
  const router = useRouter();
  const createUser = async () => {
    await API.post("/auth/register", {
      email,
      password,
      role,
    }).then((res) => {
      router.push(`/admin/users/${res.data.data.user._id}`);
    });
  };

  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0 ">
          <div className="rounded-t bg-white mb-0 px-4 py-3">
            <div className="text-center flex justify-between">
              <h6 className="text-blueGray-700 text-lg font-bold">
                Créer un utilisateur
              </h6>
              <button
                className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button"
                onClick={createUser}
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
                      email
                    </label>
                    <input
                      type="email"
                      className="border-0 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      mot de passe (provisoire)
                    </label>
                    <input
                      type="password"
                      className="border-0 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Rôle
                    </label>
                    <select
                      id="countries"
                      class="border-0 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="Admin">Admin</option>
                      <option value="Intervenant">Intervenant</option>
                      <option value="Etudiant">Etudiant</option>
                    </select>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
          <CardTableUsers data={data} />
        </div>
        {/* <div className="w-full xl:w-4/12 px-4">
          <CardSocialTraffic />
        </div> */}
      </div>
    </>
  );
}

Index.layout = Admin;

export const getServerSideProps = async ({ req }) => {
  const token = req.cookies["te_co"] || null;
  let res = null;
  if (token) {
    res = await API.get(`/dashbord/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } else {
    console.log("no token");
  }

  const data = res?.data.data || null;

  return {
    props: {
      data,
    },
  };
};
