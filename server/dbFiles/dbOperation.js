const config = require("./dbConfig");
sql = require("mssql");

async function getTreeView() {
  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM Tbl_1_Rapor_Tanimlari`;
    return result.recordset;
  } catch (error) {
    throw new Error("Failed to retrieve TreeView");
  }
}

async function getCriterion(selectedRecNo) {
  try {
    await sql.connect(config);
    const result =
      await sql.query`SELECT * FROM Tbl_2_Rapor_Kriterleri WHERE RaporTanimRecNo=${selectedRecNo}`; //

    return result.recordset;
  } catch (error) {
    throw new Error("Failed to retrieve Criterion ");
  }
}

async function getOptions(selectedOptions) {
  try {
    await sql.connect(config);
    const result = await sql.query(selectedOptions);
    return result.recordset;
  } catch (error) {
    throw new Error("Failed to retrieve Options ");
  }
}

const executeQuery = async (query, params) => {
  try {
    const pool = await sql.connect(config);
    const request = pool.request();

    for (const paramName in params) {
      request.input(paramName, params[paramName]);
    }

    const result = await request.query(query); // Sorguyu çalıştır
    return result.recordset; // Sonucu döndür
  } catch (error) {
    console.error("Error executing query:", error);
    throw new Error("Failed to execute query");
  }
};

module.exports = { getCriterion, executeQuery, getTreeView, getOptions };
