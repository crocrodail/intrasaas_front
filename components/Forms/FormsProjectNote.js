import React from "react";
import { useRouter } from "next/router";
import { API } from "services/api";
export default function FormsProjectNote({ user }) {
  const router = useRouter();
  const [note, setNote] = React.useState("");
  const [commentaire, setCommentaire] = React.useState("");

  const idModule = router.query.id;
  const slug = router.query.slug;

  React.useEffect(() => {
    for (let i in user.notes) {
      if (user.notes[i].idProject === slug) {
        setNote(user.notes[i].note);
        setCommentaire(user.notes[i].commentaire);
      }
    }
  }, [note]);

  const handleSubmit = (id) => {
    API.put(`/project/${idModule}/${slug}/${id}`, {
      note,
      commentaire,
    });
  };
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0 ">
        <div className="rounded-t bg-white mb-0 px-4 py-3">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-lg font-bold">
              {user.firstname} {user.lastname}
            </h6>
            <button
              className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => handleSubmit(user._id)}
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
                    Note
                  </label>
                  <input
                    type="email"
                    className="border-0 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Commentaire
                  </label>
                  <input
                    type="text"
                    className="border-0 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    value={commentaire}
                    onChange={(e) => setCommentaire(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
