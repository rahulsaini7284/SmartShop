import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ title, keywords, description }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <description>{description}</description>
      <keywords>{keywords}</keywords>
    </Helmet>
  );
};
Meta.defaultProps = {
  title: "Welcome to SmartShop",
  description: "We sell the best Products",
  keywords: "Electronics,Sell Electronics,Best Electronics,Top Electronics",
};

export default Meta;
