// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();
const db = cloud.database();
const command = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const { pageIndex, pageSize, refreshTimestamp } = event;
  const filterParams = {};
  // 此次刷新时间之前的创建的帖子
  filterParams.createAt = command.lte(new Date(+refreshTimestamp));
  // 文档记录总数
  const { total } = await db.collection('developments')
    .where(filterParams)
    .count();
  // 分页数据
  const { data } = await db.collection('developments')
    .where(filterParams)
    .orderBy('createAt', 'desc')
    .skip((pageIndex - 1) * pageSize)
    .limit(pageSize)
    .get();

  return {
    total,
    pageIndex,
    pageSize,
    data
  };
}