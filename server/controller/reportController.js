const dbOperation = require("../dbFiles/dbOperation");

exports.getTreeView = async (req, res) => {
  try {
    const treeView = await dbOperation.getTreeView();
    res.json(treeView);
  } catch (error) {
    //Handle any errors that occur duringthe process
    res.status(500).json({ error: error.message });
  }
};

exports.postRecNo = async (req, res) => {
  try {
    const { recNo } = req.body;
    await exports.getCriterion(req, res, recNo);
  } catch (error) {
    console.error("Error :", error);
  }
};

exports.getCriterion = async (req, res, recNo) => {
  try {
    //Retrieve criterion data from the database
    const criterion = await dbOperation.getCriterion(recNo);
    res.json(criterion);
  } catch (error) {
    //Handle any errors that occur duruing the process
    res.status(500).json({ error: error.message });
  }
};

exports.postQuery = async (req, res) => {
  try {
    const { queryItem, formData, defaultDeger } = req.body;
    const formDataValues = Object.values(formData);
    await exports.getFiltredReport(
      req,
      res,
      queryItem,
      formDataValues,
      defaultDeger
    ); // Fonksiyonu doğrudan çağır
  } catch (error) {
    console.error("Error ", error);
  }
};

exports.getFiltredReport = async (
  req,
  res,
  queryItem,
  formDataValues,
  defaultDeger
) => {
  try {
    const params = {}; // Parametreleri saklayacak boş bir obje oluştur
    // formDataValues içindeki her bir değeri params objesine ekleyin
    formDataValues.forEach((value, index) => {
      if (value === "Hepsi" || value === "Giriniz" || value === "") {
        value = defaultDeger[index];
      }
      params[`prm${index + 1}`] = value;
    });

    const result = await dbOperation.executeQuery(queryItem, params); // dbOperations.js'deki executeQuery fonksiyonunu kullanarak sorguyu çalıştır
    res.json(result); // Sonucu istemciye gönder
  } catch (error) {
    console.error("Error fetching filtered report:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.postOptions = async (req, res) => {
  try {
    const { criteriaQuery } = req.body;

    await exports.getOptions(req, res, criteriaQuery);
  } catch (error) {
    console.error("Error :", error);
  }
};

exports.getOptions = async (req, res, criteriaQuery) => {
  try {
    //Retrieve combobox options from the database
    const options = await dbOperation.getOptions(criteriaQuery);
    res.json(options);
  } catch (error) {
    console.error("Error :", error);
  }
};
