import React from "react";

// components

import StudentNavbar from "components/Navbars/StudentNavbar.js";
import SidebarStudent from "components/Sidebar/SidebarStudent.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";
import SidebarTeacher from "components/Sidebar/SidebarTeacher";
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import HeaderStatsTeacher from "components/Headers/HeaderStatsTeacher";

export default function Teacher({ children }) {
  return (
    <>
      <SidebarTeacher />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStatsTeacher />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          {children}
          {/* <FooterAdmin /> */}
        </div>
      </div>
    </>
  );
}
