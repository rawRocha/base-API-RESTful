class HomeController {
  Index(req, res) {
    res.json({
      tudoCerto: true,
    });
  }
}

export default new HomeController();
