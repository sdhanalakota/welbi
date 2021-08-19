import React from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";
import { sideBarRoot, sideBarHeader } from "./sidebar.style";
export default function Sidebar() {
  return (
    <div className={sideBarRoot()}>
      <CDBSidebar
        backgroundColor="#0d324d"
        style={{ width: "100%", minWidth: "100%" }}
      >
        <CDBSidebarHeader className="d-flex justify-content-center">
          <a href="/" className={sideBarHeader()}>
            WELBI
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Programs</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/residents" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">Residents</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
    </div>
  );
}
