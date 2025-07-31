import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Box, Typography } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import WorkspacesOutlinedIcon from "@mui/icons-material/WorkspacesOutlined";
import ArticleIcon from "@mui/icons-material/Article";
import { ArkeoLogo, ArkeoIcon, AllProvidersIcon } from "../assets";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

const Item = ({ title, to, icon, currentPath, external = false }) => {
  const navigate = useNavigate();

  if (external) {
    return (
      <MenuItem icon={icon} style={{ color: "white" }}>
        <a href={to} target="_blank" rel="noopener noreferrer">
          <Typography>{title}</Typography>
        </a>
      </MenuItem>
    );
  }

  return (
    <MenuItem
      icon={icon}
      active={currentPath === to}
      onClick={() => navigate(to)}
      style={{ color: "white" }}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const Sidebar = ({ isSidebar }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <Box
      sx={{
        height: "100%",
        "& .pro-sidebar-inner": {
          background: `#21233F`,
        },

        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },

        "& .pro-inner-item": {
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          flexDirection: "row",
          padding: "10px 20px !important",
          marginLeft: "20px",
          marginBottom: "10px",
          textAlign: "left",
          color: "white",
          transition: "all 0.3s ease",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },

        "& .pro-menu-item.active": {
          backgroundColor: "transparent !important",
        },
        "& .pro-menu-item.active .pro-icon-wrapper svg, & .pro-menu-item.active .pro-icon-wrapper img":
          {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#176BF8",
            borderRadius: "25%",
            padding: "10px",
            overflow: "visible",
            boxSizing: "content-box",
          },

        "& .pro-sidebar.collapsed": {},

        "& .pro-sidebar.collapsed .pro-inner-item": {
          justifyContent: "center",
          padding: "15px 0 !important",
          textAlign: "center",
        },
        "& .pro-sidebar.collapsed .pro-inner-item .MuiTypography-root": {
          display: "none",
        },
        "& .pro-sidebar.collapsed .pro-icon-wrapper svg, & .pro-sidebar.collapsed .pro-icon-wrapper img":
          {
            width: "35px",
            height: "35px",
          },
        "& .pro-sidebar:not(.collapsed) .pro-inner-item .MuiTypography-root": {
          marginLeft: "15px",
        },
      }}
    >
      <ProSidebar collapsed={isSidebar}>
        <Menu iconshape="square">
          <MenuItem style={{ margin: "10px 0 50px 0", color: "white" }}>
            <Box display="flex" justifyContent="left" alignItems="center">
              {isSidebar ? (
                <img
                  src={ArkeoIcon}
                  alt="Arkeo Icon"
                  style={{ width: "30px" }}
                />
              ) : (
                <img
                  src={ArkeoLogo}
                  alt="Arkeo Logo"
                  style={{ width: "150px" }}
                />
              )}
            </Box>
          </MenuItem>

          <Box>
            <Item
              title="Dashboard"
              to="/"
              icon={<DashboardIcon style={{ width: "30px", height: "30px" }} />}
              currentPath={currentPath}
            />

            <Item
              title="Providers"
              to="/providers"
              icon={
                <WorkspacesOutlinedIcon
                  style={{ width: "30px", height: "30px" }}
                />
              }
              currentPath={currentPath}
            />

            <Item
              title="Contracts"
              to="/contracts"
              icon={
                <img
                  src={AllProvidersIcon}
                  alt="All Providers"
                  style={{ width: "30px", height: "30px" }}
                />
              }
              currentPath={currentPath}
            />

            <Item
              title="Docs"
              to="/docs"
              icon={<ArticleIcon style={{ width: "30px", height: "30px" }} />}
              currentPath={currentPath}
            />

            <Item
              title="Onboarding"
              to="https://docs.arkeo.network/arkeo-for-data-providers/provider"
              external
              icon={<RocketLaunchIcon />}
              currentPath={location}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
