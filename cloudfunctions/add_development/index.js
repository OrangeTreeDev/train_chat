const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();

exports.main = async (event, context) => {
  const { text, photoFileIds, trainNumber, departureTime, createAt, updateAt } = event;
  const res = await db.collection('developments').add({
    data: {
      text,
      photoFileIds,
      trainNumber,
      departureTime,
      createAt,
      updateAt,
      comments: []
    },
  });
  return {
    id: res._id
  };
}