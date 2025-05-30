import React from "react";
import Header from "../../components/ui/header/header";
import Footer from "../../components/ui/footer/footer";
import TreeView from "./TreeView";

function HomePage() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Header />
      <TreeView />
      <div style={{ marginTop: "auto" }}>
        <Footer />
      </div>
    </div>
  );
}

export default HomePage;
