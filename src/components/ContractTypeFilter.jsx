import { Button, ButtonGroup } from "@mui/material";

const ContractTypeFilter = ({ filterType, setFilterType }) => {
  const buttonStyles = (type) => ({
    backgroundColor: filterType === type ? " #1D8AED" : "#BABABA80",
    color: filterType === type ? "#FFFFFF" : "#000000",
    "&:hover": {
      backgroundColor: filterType === type ? " #1577C2" : "#BABABA",
    },
  });

  return (
    <ButtonGroup variant="outlined" sx={{ borderRadius: 15, pr: 2 }}>
      <Button onClick={() => setFilterType("ALL")} sx={buttonStyles("ALL")}>
        ALL
      </Button>
      <Button
        onClick={() => setFilterType("PAY_AS_YOU_GO")}
        sx={buttonStyles("ACTIVE")}
      >
        PAY AS YOU GO
      </Button>
      <Button
        onClick={() => setFilterType("SUBSCRIPTION")}
        sx={buttonStyles("COMPLETED")}
      >
        SUBSCRIPTION
      </Button>
    </ButtonGroup>
  );
};

export default ContractTypeFilter;
