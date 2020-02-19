// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const { pageIndex, pageSize, ...filterParams } = event;
  const { total } = await db.collection('developments')
    .where(filterParams)
    .count();
  const { data } = await db.collection('developments')
    .where(filterParams)
    .skip(pageIndex * pageSize)
    .limit(pageSize)
    .get();

  return {
    total,
    pageIndex,
    pageSize,
    data
  };
}