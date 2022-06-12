class Controller {
  static index = (req, res) => {
    if (req.cookies.username) return res.render('index', { title: 'Home', login: true, username: req.cookies.username });
    return res.render('index', { title: 'Home', login: false, username: '' });
  };

  static pageNotFound = (req, res) => {
    if (req.cookies.username) {
      return res.status(404).render('404', { title: '404', login: true, username: req.cookies.username });
    }
    return res.status(404).render('404', { title: '404', login: false, username: '' });
  }
}

export default Controller;
