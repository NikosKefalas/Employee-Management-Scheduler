import useFetch from "../hooks/useFetch.js";
import React, { useState } from "react";
import { json, useParams } from "react-router-dom";
import EmployeeCard from "../components/EmployeeCard.js";
import { Container, display } from "@mui/system";
import { Button, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import axios from "axios";

const EmployeeDetails = () => {
  const params = useParams();
  // const [data, setData] = useState("");
  // const [skill, setSkill] = useState("");
  const { data, loading, error } = useFetch("/api/employees/" + params.id);

  // useEffect(() => {
  //   axios
  //     .get("/api/employees/" + params.id)
  //     .then((res) => {
  //       setData(res.data);
  //       return axios.get("/api/skills/" + data.setofskills);
  //     })
  //     .then((res) => {
  //       setSkill(res.data);
  //     });
  // }, [params.id, data.setofskills]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={6} md={4} lg={3} xl={3}>
        {data && <EmployeeCard data={data} />}
      </Grid>
    </Grid>
  );
};

export default EmployeeDetails;