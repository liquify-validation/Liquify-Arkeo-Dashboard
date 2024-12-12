import { useSearchParams, useParams } from "react-router-dom";
import { Box, Typography, useTheme } from "@mui/material";
import { useProviderContracts } from "../hooks/useProviderContracts";
import ContractTable from "../components/ContractTable";
import { tokens } from "../theme";

const Contract = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { providerId } = useParams();
  const [searchParams] = useSearchParams();
  const location = searchParams.get("location") || "N/A";
  const isp = searchParams.get("isp") || "N/A";
  const providerName = searchParams.get("providerName") || "Provider";

  // TO DO - Add copy and past to ID
  // Style
  // Add cards
  // Add Background
  // Add back button

  const {
    data: contractsData,
    isLoading,
    error,
  } = useProviderContracts(providerId);

  if (isLoading) return <Typography>Loading Contracts...</Typography>;
  if (error) return <Typography>Error loading contracts!</Typography>;

  const contractsArray = Object.values(contractsData);

  return (
    <Box m="20px">
      <Typography variant="h3" mb={2}>
        Provider - {providerName} (ID: {providerId})
      </Typography>
      <ContractTable contracts={contractsArray} isp={isp} location={location} />
    </Box>
  );
};

export default Contract;
