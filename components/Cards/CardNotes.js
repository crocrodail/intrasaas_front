import React from "react";
import { DateTime } from "luxon";

// components

export default function CardNotes({ data }) {
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className={"font-semibold text-lg  text-blueGray-700"}>
                Notes
              </h3>
            </div>
          </div>
        </div>
        {data.map((item, index) => (
          <div key={index}>
            <hr className="my-4 md:min-w-full" />
            <div className="flex w-full overflow-x-auto items-center ssm:flex-wrap">
              <div className="flex flex-col border-t-0 px-6 border-l-0 border-r-0 text-s whitespace-nowrap p-4 text-left">
                <p>{DateTime.fromISO(item.date).toLocaleString()}</p>
                <p>{item.note}</p>
              </div>
              <div className="border-t-0 px-6 border-l-0 border-r-0 text-s  p-4">
                <p className="font-medium	mb-4">{item.name}</p>
                <p>{item.commentaire}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
