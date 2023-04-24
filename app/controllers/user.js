const index = async (req, res, next) => {
  return res.send({
    test: 'user'
  });
};

module.exports = {
  index
};
