const paymentHandling = async (req, res) => {
  try {
    await paymentHandling(req.body);
    res.status(200).send({ message: "ok" });
  } catch (error) {
    res.status(500).send({ message: "internal server error" });
  }
};

const paymentUnfinish = async (req, res) => {
  try {
    res.status(200).send({ message: "ok" });
  } catch (error) {
    res.status(500).send({ message: "internal server error" });
  }
};

module.exports = {
  paymentHandling,
  paymentUnfinish,
};
