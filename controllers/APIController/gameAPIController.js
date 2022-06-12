/* eslint-disable max-len */
import { userGameHistories, room } from '../../models';
import utils from '../../utils';

class gameAPIController {
  static getRoom = async (req, res) => {
    try {
      return await room.findAll({
        attributes: ['roomId', 'status'],
        order: [['status', 'ASC']],
      }).then((result) => res.status(200).json({ status: 200, message: 'success', result }))
        .catch((error) => res.status(500).json({ error: error.name }));
    } catch {
      return res.status(500).json({ status: 500, message: 'Internal Server Error.' });
    }
  }

  static createRoom = async (req, res) => {
    try {
      const ROOM_CODE = utils.randomizeString(6);
      return await room.create({ roomId: ROOM_CODE })
        .then((result) => res.status(201).json({ status: 201, message: result, ROOM_CODE }))
        .catch((error) => res.status(500).json({ error: error.name }));
    } catch {
      return res.status(500).json({ status: 500, message: 'Internal Server Error.' });
    }
  };

  static enterRoomById = async (req, res) => {
    try {
      const { roomId } = req.params;
      const { username } = req.body;

      return await room.findOne({ where: { roomId } })
        .then((roomData) => {
          const isRequirement1 = !roomData.username1 && roomData.username1 !== username && roomData.username2 !== username;
          const isRequirement2 = !roomData.username2 && roomData.username2 !== username && roomData.username1 !== username;

          // Cek status room dulu, ada space kosong apa gak
          // Kalo ada kosong, populate dulu userId di table room, bikin statusnya waiting
          // Cek sekalian di lawannya, kalo terisi ganti status roomnya jadi full.
          // Kalo kosong ganti status roomnya waiting.
          const STATUS = {
            WAITING: 'waiting',
            FULL: 'full',
          };
          if (roomData.status !== STATUS.FULL) {
            if (isRequirement1) {
              if (roomData.username2) {
                roomData.update({ username1: username, playerOne_status: STATUS.WAITING, status: STATUS.FULL })
                  .then((updated) => res.json({ status: 200, roomInfo: updated.dataValues }))
                  .catch((error) => res.status(500).json({ error: error.name }));
              } else {
                roomData.update({ username1: username, playerOne_status: STATUS.WAITING, status: STATUS.WAITING })
                  .then((updated) => res.json({ status: 200, roomInfo: updated.dataValues }))
                  .catch((error) => res.status(500).json({ error: error.name }));
              }
            } else if (isRequirement2) {
              if (roomData.username1) {
                roomData.update({ username2: username, playerTwo_status: STATUS.WAITING, status: STATUS.FULL })
                  .then((updated) => res.json({ status: 200, roomInfo: updated.dataValues }))
                  .catch((error) => res.status(500).json({ error: error.name }));
              } else {
                roomData.update({ username2: username, playerTwo_status: STATUS.WAITING, status: STATUS.WAITING })
                  .then((updated) => res.json({ status: 200, roomInfo: updated.dataValues }))
                  .catch((error) => res.status(500).json({ error: error.name }));
              }
            }
          } else {
            res.status(400).json({ message: `Room ${roomId} is full.` });
          }
        })
        .catch((error) => res.status(500).json({ error: error.name }));
    } catch {
      return res.status(500).json({ status: 500, message: 'Internal Server Error.' });
    }
  }

  static getGameHistory = async (req, res) => {
    try {
      return await userGameHistories.findAll({
        attributes: ['historyId', 'timestamps', 'player_choice', 'comp_choice', 'result'],
        where: { userId: req.params.id },
        order: [['timestamps', 'DESC']],
      }).then((history) => res.status(200).json({ status: 200, message: 'success', history }))
        .catch((error) => res.status(500).json({ error: error.name }));
    } catch {
      return res.status(500).json({ status: 500, message: 'Internal Server Error.' });
    }
  };

  static postGameHistory = async (req, res) => {
    try {
      const { PlayerChoice, CompChoice, result } = req.body;

      if (PlayerChoice && CompChoice && result) {
        return await userGameHistories.create({
          timestamps: new Date().toISOString(),
          userId: req.params.id,
          player_choice: PlayerChoice,
          comp_choice: CompChoice,
          result,
        })
          .then((history) => res.status(201).json({ status: 201, message: 'New history created', history }))
          .catch((error) => res.status(500).json({ error: error.name }));
      }
      return res.status(400).json({ status: 400, message: 'Invalid Request.' });
    } catch {
      return res.status(500).json({ status: 500, message: 'Internal Server Error.' });
    }
  };

  static deleteGameHistory = async (req, res) => {
    try {
      const { historyId } = req.body;

      return await userGameHistories.destroy({ where: { historyId } })
        .then(() => res.status(200).json({ status: 200, message: `history ${historyId} deleted` }))
        .catch((error) => res.status(500).json({ error: error.name }));
    } catch {
      return res.status(500).json({ status: 500, message: 'Internal Server Error.' });
    }
  };
}

export default gameAPIController;
