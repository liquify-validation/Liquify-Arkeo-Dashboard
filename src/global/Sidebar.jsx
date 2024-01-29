import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../theme";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined"; //explore icon
import DashboardIcon from "@mui/icons-material/Dashboard";
// import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined"; // logout
import WorkspacesOutlinedIcon from "@mui/icons-material/WorkspacesOutlined"; // providers to be changed
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArticleIcon from "@mui/icons-material/Article";
import PieChartIcon from "@mui/icons-material/PieChart";
import { ArkeoLogo } from "../assets";

const Item = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem
      active={selected === title}
      style={{ color: "white" }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography> <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = ({ isSidebar, setIsSidebar }) => {
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        height: "100vh",
        "& .pro-sidebar-inner": {
          background: `#21233F`,
        },
        "& .pro-icon-wrapper": { backgroundColor: "transparent !important" },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
          marginBottom: "10px",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          boxSizing: "border-box",
          backgroundColor: "#176BF8",
          color: "#FFF;",
          borderRadius: "20px",
          width: "90%",
          transition: "background-color 500ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        },
      }}
    >
      <ProSidebar collapsed={isSidebar}>
        <Menu iconshape="square">
          <MenuItem style={{ margin: "10px 0 40px 25px", color: "white" }}>
            {!isSidebar && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="left"
                >
                  <img
                    src={ArkeoLogo}
                    alt="Arkeo Logo"
                    style={{ width: "150px" }}
                  />{" "}
                </Box>
              </Box>
            )}
          </MenuItem>

          <Box paddingLeft={isSidebar ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<DashboardIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Providers"
              to="/providers"
              icon={<WorkspacesOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Explore"
              to="/explore"
              icon={<ExploreOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Docs"
              to="/docs"
              icon={<ArticleIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Provider"
              to="/provider"
              icon={<PieChartIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
