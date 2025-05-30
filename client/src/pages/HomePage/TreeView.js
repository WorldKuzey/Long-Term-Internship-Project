import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function TreeView() {
  const [reportTitle, setReportTitle] = useState([]);
  const [recNo, setRecNo] = useState([]);

  const [menuName, setMenuName] = useState([]);
  const [query, setQuery] = useState([]);

  const [initRun, setInitRun] = useState([]);

  useEffect(() => {
    async function fetchMenuItems() {
      try {
        const response = await axios.get("/tree-view");

        const menuArray = [];
        const queryArray = [];
        const reportTitleArray = [];
        const recNoArray = [];
        const initRunArray = [];

        let iteraty,
          menuAdi,
          raporBaslik,
          selectSorgusu,
          recNo,
          baslangicCalissinMi;
        const tabloTanimlariDegerleri = Object.values(response.data);

        for (let i = 0; i < tabloTanimlariDegerleri.length; i++) {
          iteraty = response.data[i];
          menuAdi = Object.values(iteraty)[2];
          raporBaslik = Object.values(iteraty)[5];
          selectSorgusu = Object.values(iteraty)[6];
          recNo = Object.values(iteraty)[0];
          baslangicCalissinMi = Object.values(iteraty)[7];

          menuArray.push(menuAdi);
          queryArray.push(selectSorgusu);
          reportTitleArray.push(raporBaslik);
          recNoArray.push(recNo);
          initRunArray.push(baslangicCalissinMi);
        }
        setMenuName(menuArray);
        setQuery(queryArray);
        setReportTitle(reportTitleArray);
        setRecNo(recNoArray);
        setInitRun(initRunArray);
      } catch (error) {
        console.error("Failed to fetch menu items: ", error);
      }
    }
    fetchMenuItems();
  }, []);

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">RAPORLAR</h1>
      <ul>
        {query.map((queryItem, index) => (
          <li key={index} className="mb-2">
            <Link
              to={`/report-page/${recNo[index]}/${queryItem}/${reportTitle[index]}/${initRun[index]}`}
              className="block px-4 py-2 w-40 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              target="_blank"
            >
              {menuName[index]}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TreeView;
