class ErrorHandler {
  static handle500Error(res, error) {
    res.status(500).json({ message: error.message });
  }

  static handle400(res, error) {
    res.status(400).json({ error: error.message });
  }

  static handle404(res, error) {
    res.status(404).json({ error: error.message });
  }
}
module.exports = ErrorHandler;
