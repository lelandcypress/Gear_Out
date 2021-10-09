import React from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_ITEM } from "../utils/queries";

const Item = ({ props }) => {
const {loading, data} useQuery(QUERY_SINGLE_ITEM)

  return <div></div>;
};
export default Item;
