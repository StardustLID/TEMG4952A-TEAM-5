import { useRef, useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import * as d3 from "d3";
import { dsv } from "d3";

export default function SearchBar(props) {
  const [bar, setBar] = useState(null); // "plot" will later point to an instance of LineGraph

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get("/SearchBar")
      .then((res) => {
        setLoading(false);

        console.log(res.data);
        setBar(
          <Autocomplete
            id="combo-box-demo"
            options={d3.csvParse(res.data)}
            getOptionLabel={(option) => option.org_name}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
          />,
        );
        //console.log(companynames);
        //companynames = res.data;
      })
      .catch(() => setError(true));
  }, []);

  return loading || error ? <LoadingSpinner error={error} /> : bar;
}
