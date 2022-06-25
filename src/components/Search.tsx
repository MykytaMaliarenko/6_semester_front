import React from 'react';
import {useNavigate} from "react-router-dom";
import {Button, Grid, Input} from "@mui/material";

export const Search: React.FC = () => {
  const [searchRequest, setSearchRequest] = React.useState('');
  const navigate = useNavigate();

  const doSearch = () => {
    navigate(`/${searchRequest}`);
    setSearchRequest('');
  }

  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      spacing={2}
    >
      <Grid item style={{flexGrow: 1}}>
        <Input
          fullWidth
          onChange={(event => setSearchRequest(event.target.value))}
          value={searchRequest}
        />
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          disabled={searchRequest.length === 0}
          onClick={doSearch}
        >
          Search
        </Button>
      </Grid>
    </Grid>
  )
}
