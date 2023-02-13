import React, { useState } from "react";
import { useParams } from "react-router-dom";
import EmployeeCard from "../components/EmployeeCard.js";

const EmployeeDetails = () => {
  const params = useParams();

  return (
    <div>
      <EmployeeCard id={params.id} />
    </div>
  );
};

export default EmployeeDetails;
