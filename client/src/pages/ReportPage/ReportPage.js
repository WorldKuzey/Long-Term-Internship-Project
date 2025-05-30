import React from "react";
import Header from "../../components/ui/header/header";
import Footer from "../../components/ui/footer/footer";
import CriterionButton from "./buttonCriterion";

function ReportPage() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Header />

      <div style={{ marginLeft: "20px", marginTop: "20px" }}>
        <CriterionButton />
      </div>

      <div style={{ marginTop: "auto" }}>
        <Footer />
      </div>
    </div>
  );
}

export default ReportPage;
