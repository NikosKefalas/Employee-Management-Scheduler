import useFetch from "../hooks/useFetch.js";
import React from "react";
import { useParams } from "react-router-dom";
import SkillCard2 from "../components/SkillCard2.js";

const SkillDetails = () => {
  const params = useParams();
  const { data, loading, error } = useFetch("/api/skills/" + params.id);

  return (
    <div>
      <SkillCard2 data={data} />
    </div>
  );
};

export default SkillDetails;
