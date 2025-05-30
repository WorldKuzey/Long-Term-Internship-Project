import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ButtonCriterion() {
  const { recNo, queryItem, reportTitle, initRun } = useParams();

  const [criteriaTitle, setCriteriaTitle] = useState([]);
  const [criteriaType, setCriteriaType] = useState([]);
  const [comboOptions, setComboOptions] = useState([]);
  const [defaultDeger, setDefaultDeger] = useState([]);
  const [key, setKey] = useState([]);
  const [value, setValue] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({});

  useEffect(() => {
    handleClick();
  }, []);

  useEffect(() => {
    const defaultFormData = {};
    criteriaTitle.forEach((title, index) => {
      if (criteriaType[index] === "Numeric") {
        defaultFormData[title] = "";
      } else if (criteriaType[index] === "Combo") {
        defaultFormData[title] = "Hepsi";
      } else {
        defaultFormData[title] = "";
      }
    });
    setFormData(defaultFormData);
  }, [criteriaTitle, criteriaType]);

  const handleClick = async () => {
    try {
      const response = await axios.post("/criterion", { recNo });

      const criteriaTitleArray = [];
      const criteriaTypeArray = [];
      const optionsArray = [];
      let defaultDegerArray = [];

      let criteriaQuery = "";

      for (let i = 0; i < Object.cdalues(response.data).length; i++) {
        criteriaTitleArray.push(Object.values(response.data[i])[3]);
        criteriaTypeArray.push(Object.values(response.data[i])[4]);
        criteriaQuery = Object.values(response.data[i])[5];
        defaultDegerArray.push(Object.values(response.data[i])[6]);
      }
      setCriteriaTitle(criteriaTitleArray);
      setCriteriaType(criteriaTypeArray);
      setDefaultDeger(defaultDegerArray);

      const response2 = await axios.post("/combo-options", {
        criteriaQuery,
      });

      for (let i = 0; i < Object.values(response2.data).length; i++) {
        optionsArray.push(Object.values(response2.data[i]));
      }

      setComboOptions(optionsArray);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const handleInputChange = (e, title) => {
    const value = e.target.value;
    const newFormData = { ...formData, [title]: value };
    setFormData(newFormData);
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    try {
      const response = await axios.post("/postQuery", {
        queryItem,
        formData,
        defaultDeger,
      });

      if (!response.data || response.data.length === 0) {
        setErrorMessage(
          "Girilen kriterlere uygun bir rapor bulunamadı. Lütfen girdiğiniz değerleri kontrol edin."
        );
        return;
      }

      const columns = Object.keys(response.data[0]);
      setKey(columns);

      const valueArray = [];
      const rows = Object.values(response.data);

      for (let i = 0; i < rows.length; i++) {
        valueArray.push(Object.values(response.data[i]));
      }
      setValue(valueArray);

      setErrorMessage("");
    } catch (error) {
      console.error("Error submitting form", error);
      setErrorMessage("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  const exportToExcel = () => {
    const csvContent =
      key.join(",") + "\n" + value.map((row) => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    const fileName = "exported_table.csv";

    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(blob, fileName);
    } else {
      const link = document.createElement("a");
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", fileName);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

  return (
    <div className="p-4">
      <div>
        <h1 className="text-2xl font-bold mb-4">{reportTitle}</h1>
      </div>

      <form onSubmit={handleSubmit}>
        {criteriaTitle.map((title, index) => (
          <div key={index} className="mb-6">
            <h2 className="text-lg font-semibold mb-2">{title}</h2>

            {criteriaType[index] === "Numeric" ? (
              <div>
                <input
                  type="text"
                  placeholder={`${title}`}
                  className="border rounded-md px-3 py-2 mb-2"
                  onChange={(e) => handleInputChange(e, title)}
                  value={formData[title]}
                />
              </div>
            ) : criteriaType[index] === "Text" ? (
              <input
                type="text"
                placeholder={`${title}`}
                className="border rounded-md px-3 py-2 mb-2"
                onChange={(e) => handleInputChange(e, title)}
                value={formData[title]}
              />
            ) : criteriaType[index] === "Date" ? (
              <input
                type="date"
                className="border rounded-md px-3 py-2 mb-2"
                onChange={(e) => handleInputChange(e, title)}
                value={formData[title]}
              />
            ) : criteriaType[index] === "Combo" ? (
              <select
                className="border rounded-md px-3 py-2 mb-2"
                onChange={(e) => handleInputChange(e, title)}
                value={formData[title]}
              >
                <option>Hepsi</option>
                {comboOptions.map((option, index) => (
                  <option key={index}>{option}</option>
                ))}
              </select>
            ) : null}
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSubmit}
        >
          RAPORLA
        </button>
      </form>

      <div className="mt-4">
        {errorMessage && (
          <div className="text-red-600 font-semibold">{errorMessage}</div>
        )}
        {key.length > 0 && value.length > 0 && (
          <div>
            <button
              onClick={exportToExcel}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Excel'e Aktar
            </button>
            <table className="table-auto mt-4">
              <thead>
                <tr>
                  {key.map((item, index) => (
                    <th
                      key={index}
                      className="px-4 py-2 bg-gray-200 text-gray-800"
                    >
                      {item}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {value.map((innerArray, outerIndex) => (
                  <tr key={outerIndex}>
                    {innerArray.map((item, innerIndex) => (
                      <td key={innerIndex} className="border px-4 py-2">
                        {item}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default ButtonCriterion;
