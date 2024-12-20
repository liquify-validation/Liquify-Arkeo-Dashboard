import React from "react";
import { Box, Typography, List, ListItem, Link } from "@mui/material";

const Docs = () => {
  return (
    <Box p={4} sx={{ maxWidth: "1000px" }}>
      <Typography variant="h2" fontWeight="bold" gutterBottom>
        Liquify Arkeo Dashboard Documentation
      </Typography>

      <Typography variant="body1" paragraph>
        Liquify specializes in providing top-tier blockchain node management
        solutions that simplify the complexity of deploying, managing, and
        optimizing blockchain infrastructure. Our services ensure that your
        operations are robust, secure, and scalable, enabling you to fully
        leverage blockchain technology without the operational burden.
      </Typography>

      <Typography variant="body1" paragraph>
        Arkeo was created to provide decentralized applications (dApps) with
        increased development velocity, censorship-resistance, and a crucial
        step toward fully decentralizing the UI layer of the web3 stack, all
        while reducing dependence on centralized data sources. In short, Arkeo
        is a free-market solution for decentralized infrastructure.
      </Typography>

      <Typography variant="body1" paragraph>
        The Liquify Arkeo Dashboard is designed to give you insights into
        Arkeo’s network providers, contracts, and related performance metrics in
        a user-friendly interface. It allows teams to easily monitor, search,
        and analyze providers and contracts, offering clear visibility into
        network health, distribution, and activity over time.
      </Typography>

      <Typography variant="h4" fontWeight="bold" gutterBottom mt={4}>
        Dashboard Page
      </Typography>
      <Typography variant="body1" paragraph>
        The main Dashboard provides:
      </Typography>
      <List>
        <ListItem>
          <Typography variant="body1">
            <strong>Key Stats:</strong> Total Providers, Total Bonded Value,
            Number of Services.
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="body1">
            <strong>Time-Filterable Charts:</strong> Distribution of Network
            Providers and Request Distribution by Network. Filters include
            24h/7d/14d/28d.
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="body1">
            <strong>Non-Filterable Charts:</strong> Location of Providers,
            Contract Distribution by Providers.
          </Typography>
        </ListItem>
      </List>
      <Typography variant="body1" paragraph>
        These visuals help you quickly assess network health, geographic
        dispersion, and usage patterns over various time frames.
      </Typography>

      <Typography variant="h4" fontWeight="bold" gutterBottom mt={4}>
        Providers Page
      </Typography>
      <Typography variant="body1" paragraph>
        The Providers page lists all providers in the Arkeo network. You can:
      </Typography>
      <List>
        <ListItem>
          <Typography variant="body1">
            Use the <strong>search bar</strong> to filter providers by
            attributes like name, ISP, location, or other stats.
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="body1">
            View provider stats: Open Contracts, Completed Contracts, Number of
            Services, Age (in blocks), Performance (with a pop-up performance
            chart), Uptime, Total Amount Taxed, Location, Renewed Contracts,
            ISP, Website link, and a button to view Contracts specific to that
            provider.
          </Typography>
        </ListItem>
      </List>
      <Typography variant="body1" paragraph>
        This page provides a comprehensive, searchable interface to identify and
        evaluate providers.
      </Typography>

      <Typography variant="h4" fontWeight="bold" gutterBottom mt={4}>
        Contracts per Provider
      </Typography>
      <Typography variant="body1" paragraph>
        Clicking the "Contracts" button on a provider card takes you to a page
        focused on that provider's contracts. You can view:
      </Typography>
      <List>
        <ListItem>
          <Typography variant="body1">
            Network Stats relevant to the provider's contracts.
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="body1">
            Detailed Contract Data: Service & Provider Name, Duration (blocks),
            Location, Contract Cost, # of Calls Submitted, Time Remaining,
            Queries per Minute, Type (Subscription or Pay-As-You-Go), and Status
            (Completed or Active).
          </Typography>
        </ListItem>
      </List>
      <Typography variant="body1" paragraph>
        This offers a drill-down view of individual contracts, enabling deeper
        analysis of a provider’s activity and performance.
      </Typography>

      <Typography variant="h4" fontWeight="bold" gutterBottom mt={4}>
        All Contracts Page
      </Typography>
      <Typography variant="body1" paragraph>
        The All Contracts page aggregates contract data across all providers,
        showing similar stats as the provider-specific contracts page. This
        offers a network-wide contract overview for global insight and analysis.
      </Typography>

      <Typography variant="h4" fontWeight="bold" gutterBottom mt={4}>
        Time Filters
      </Typography>
      <Typography variant="body1" paragraph>
        Multiple metrics can be filtered by offset_days (e.g., last 24 hours, 7
        days, 14 days, 28 days) to understand short-term versus long-term
        trends. This helps stakeholders make informed decisions on scaling,
        provider selection, and contract negotiations based on historical
        network usage.
      </Typography>

      <Typography variant="h4" fontWeight="bold" gutterBottom mt={4}>
        Summary
      </Typography>
      <Typography variant="body1" paragraph>
        The Arkeo Dashboard provides a clear, data-driven perspective on
        decentralized infrastructure managed via Arkeo. With its dashboard
        overviews, detailed provider listings, contract-level examinations, and
        global statistics, it empowers users to monitor, search, and analyze the
        state of providers and contracts efficiently. Built-in time filters,
        geographic distribution, and performance charts further ensure
        transparency and support data-driven decision-making in a decentralized
        web3 environment.
      </Typography>

      <Typography variant="body1" paragraph>
        For further assistance, contact Liquify's support team.
      </Typography>

      <Typography variant="body2" paragraph>
        For more information:{" "}
        <Link href="https://arkeo.network/" target="_blank" rel="noopener">
          Arkeo Official Site
        </Link>{" "}
        |{" "}
        <Link href="https://liquify.com/" target="_blank" rel="noopener">
          Liquify Official Site
        </Link>
      </Typography>
    </Box>
  );
};

export default Docs;
