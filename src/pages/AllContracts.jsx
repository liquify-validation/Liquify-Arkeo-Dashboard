import { Box, Typography } from "@mui/material";
import { useAllContracts } from "../hooks/useAllContracts";
import AllContractsTable from "../components/AllContractsTable";

const AllContracts = () => {
  const { data: contractsData, isLoading, error } = useAllContracts();

  if (isLoading) return <Typography>Loading all contracts...</Typography>;
  if (error) return <Typography>Error loading contracts!</Typography>;

  const contractsArray = Object.values(contractsData);

  return (
    <Box m="20px">
      <Typography variant="h3" mb={2}>
        All Contracts
      </Typography>
      <AllContractsTable contracts={contractsArray} />
    </Box>
  );
};

export default AllContracts;
