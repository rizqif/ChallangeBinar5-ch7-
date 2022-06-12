import fetch from 'node-fetch';

class gameController {
  static play = (req, res) => res.render('playgame', { title: 'PLAY GAME', username: req.cookies.username });

  static singlePlayer = (req, res) => res.render('rockpaperscissor', { title: 'VS COM', username: req.cookies.username });

  static getRoom = async (req, res) => {
    await fetch(`http://${process.env.URL}/api/v1/game/room`, { method: 'GET', headers: { 'Content-Type': 'application/json', Authorization: `${req.cookies.access_token}` } })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          return res.render('room', { title: 'Game Room', username: req.cookies.username, rooms: data.result });
        }
        return res.render('room', { title: 'Game Room', username: req.cookies.username });
      })
      .catch((e) => console.log(e));
  };

  static enterRoomById = async (req, res) => {
    await fetch(`http://${process.env.URL}/api/v1/game/room/${req.params.roomId}`, { method: 'PATCH', body: JSON.stringify(req.cookies), headers: { 'Content-Type': 'application/json', Authorization: `${req.cookies.access_token}` } })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          console.log(data);
        }
        console.log(data);
      })
      .catch((e) => console.log(e));
  }

  static getGameHistory = async (req, res) => {
    await fetch(`http://${process.env.URL}/api/v1/game/history/${req.decoded.userId}`, { method: 'GET', headers: { 'Content-Type': 'application/json', Authorization: `${req.cookies.access_token}` } })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          return res.render('game_history', { title: 'Game History', username: req.cookies.username, history: data.history });
        }
        return res.render('game_history', { title: 'Game History', username: req.cookies.username, history: '' });
      })
      .catch((e) => console.log(e));
  };

  static postGameHistory = async (req, res) => {
    await fetch(`http://${process.env.URL}/api/v1/game/history/${req.decoded.userId}`, { method: 'POST', body: JSON.stringify(req.body), headers: { 'Content-Type': 'application/json', Authorization: `${req.cookies.access_token}` } })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 201) {
          return res.redirect('/game');
        }
        return res.redirect('/');
      })
      .catch((e) => console.log(e));
  };

  static deleteGameHistory = async (req, res) => {
    await fetch(`http://${process.env.URL}/api/v1/game/history/${req.decoded.userId}`, { method: 'DELETE', body: JSON.stringify(req.body), headers: { 'Content-Type': 'application/json', Authorization: `${req.cookies.access_token}` } })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          return res.redirect('/game/history');
        }
        return res.redirect('/game');
      })
      .catch((e) => console.log(e));
  };
}

export default gameController;
