var express = require('express');
var router = express.Router();

const create = require("../controllers/user/create");
const pdf = require('../controllers/user/pdfGenerate');
const update = require('../controllers/user/update');
const deleteUser = require('../controllers/user/delete');

router.post('/', async function _create(req, res) {
  const data = await create(req.body);
  return res.status(201).json({
    statusText: "SUCCESS",
    message: "request executed successfully",
    data: data
  });
});

router.get('/download-pdf', async function _pdf(req, res) {
  const data = await pdf();
  res.setHeader('Content-Disposition', 'attachment; filename="users.pdf"');
  res.setHeader('Content-Type', 'application/pdf');

  res.send(data);
});

router.delete('/:id', async function _deleteUser(req, res, next) {
  try {
    const data = await deleteUser(req.params.id);
    return res.status(200).json({
      statusText: "SUCCESS",
      message: "category deleted successfully",
      data: data
    });
  } catch (error) {
    next(error)
  }
});

router.patch('/:id', async function _update(req, res, next) {
  try {
    const data = await update(req.params.id, req.body);
    return res.status(200).json({
      statusText: "SUCCESS",
      message: "user update successfully",
      data: data
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;