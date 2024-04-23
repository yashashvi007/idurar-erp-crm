const create = async (Model, req, res) => {
  // Creating a new document in the collection
  if (req.route.path.includes("product") && await Model.find({ name: req.body.name })) {
    return res.status(400).json({
      success: false,
      message: `${req.route.path.split('/')[1]} already exists`,
    });
  }
  req.body.removed = false;
  const result = await new Model({
    ...req.body,
  }).save();

  // Returning successfull response
  return res.status(200).json({
    success: true,
    result,
    message: 'Successfully Created the document in Model ',
  });
};

module.exports = create;
