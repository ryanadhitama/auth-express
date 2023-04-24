const index = async (req, res, next) => {
  return res.status(200).json({
    success: true,
    data: req.user
  });
};

module.exports = {
  index
};
