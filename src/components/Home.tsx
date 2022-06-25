import React from "react";
import {Container, Box} from "@mui/material";
import {Search} from "./Search";

export const Home = () => (
  <Container maxWidth='sm'>
    <Box style={{marginTop: '200px'}}>
      <Search/>
    </Box>
  </Container>
);
