import React from "react";
import ResponsiveAppBar from "./ResponsiveAppBar";
import Grid from "@mui/material/Grid";

function LayoutComponent({ children, setCurrentPage }: any) {
  const MenuItems = [
    {
      id: 1,
      name: "Customer",
    },
    {
      id: 2,
      name: "Contacts",
    },
    {
      id: 3,
      name: "Interaction",
    },
  ];
  const handlePage = (pageid: number) => {
    console.log("Clicked on page ", pageid);
    localStorage.setItem("page", JSON.stringify(pageid));
    setCurrentPage(pageid);
  };
  return (
    <>
      <ResponsiveAppBar />
      <div style={{ margin: 10}}>{children}</div>
    </>
  );
}

export default LayoutComponent;
