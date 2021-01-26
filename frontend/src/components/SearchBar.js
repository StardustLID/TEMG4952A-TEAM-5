import { useRef, useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import * as d3 from "d3";

export default function SearchBar(props) {
  const [bar, setBar] = useState(null); // "plot" will later point to an instance of LineGraph

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get("/SearchBar")
      .then((res) => {
        setLoading(false);

        const data = d3.csvParse(res.data);

        const options = data.map((option) => {
          const firstLetter = option.company_name[0].toUpperCase();
          return {
            firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
            ...option,
          };
        });

        setBar(
          <Autocomplete
            onChange={(event, newValue) => {
              newValue ? props.setValue(newValue.company_name) : props.setValue(null);
            }}
            id="combo-box-demo"
            options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => option.company_name}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Company" variant="outlined" />}
          />,
        );
      })
      .catch(() => setError(true));
  }, []);

  return loading || error ? <LoadingSpinner error={error} /> : bar;
}
