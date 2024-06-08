var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ unit: "IFN666" });
});

router.get("/api/city", async (req, res) => {
  try {
    const cities = await req.db.from("city").select("name", "district");
    res.json({ error: false, cities });
  } catch (error) {
    res.json({ error: true, message: error });
  }
});
module.exports = router;

router.get("/api/city/:CountryCode", async (req, res) => {
  try {
    const cities = await req.db
                  .from("city")
                  .select("name", "district")
                  .where("CountryCode", req.params.CountryCode);
    res.json({ error: false, cities });
  } catch (error) {
    res.json({ error: true, message: error });
  }
});