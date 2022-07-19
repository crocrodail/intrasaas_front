import FormsProjectNote from "components/Forms/FormsProjectNote";
import Admin from "layouts/Admin";
import { API } from "services/api";
export default function ModuleLanding({ data }) {
  return (
    <>
      {data.users.map((user, index) => (
        <div key={index} className="flex flex-wrap mt-4">
          <FormsProjectNote user={user} />
        </div>
      ))}
    </>
  );
}

ModuleLanding.layout = Admin;

export const getServerSideProps = async ({ locale, query, req }) => {
  const { slug } = query;
  const { id } = query;

  console.log(query);
  const res = await API.get(`/project/${id}/${slug}`);

  const data = res.data.data;
  return {
    props: {
      data,
    },
  };
};
