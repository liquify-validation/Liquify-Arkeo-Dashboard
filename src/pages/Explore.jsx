import React from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  Pagination,
} from "@mui/material";
import { tokens } from "../theme";
import { ExploreCard, Header, ExploreBar } from "../components";
import { LiquifyIcon } from "../assets";

const Explore = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <div className="hexmap-bg">
      <Box m="40px" paddingTop="0px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header
            title="Explore"
            subtitle="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
          />
        </Box>
        <Box justifyContent="space-between" alignItems="center">
          {" "}
          <ExploreBar />
        </Box>

        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="140px"
          gap="7rem"
          mt={5}
        >
          <Box span="3">
            <ExploreCard
              category="Defi"
              companyIcon={<img src={LiquifyIcon} alt="Provider Icon" />}
              companyDescription="Lorem Ipsum is simply dummy text of the printing, Lorem Ipsum has been the."
              xLink="https://twitter.com/Liquify_ltd"
              githubLink="https://github.com/liquify-validation"
              linkedinLink="https://www.linkedin.com/company/liquifyltd/?originalSubdomain=uk"
              externalLink="https://www.liquify.io/"
            />
          </Box>
        </Box>
        {/* Pagination */}
        <Box display="flex" fixed="bottom" justifyContent="center" mt={25}>
          <Pagination
            count={10}
            variant="outlined"
            shape="rounded"
            sx={{
              "& .MuiPaginationItem-root": {
                borderColor: "grey",
              },
              "& .MuiPaginationItem-root.Mui-selected": {
                color: "#176BF8",
                borderColor: "#176BF8",
                backgroundColor: "transparent",
              },
            }}
          />
        </Box>
      </Box>
    </div>
  );
};

export default Explore;
