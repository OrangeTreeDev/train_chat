// 云函数入口文件
const cloud = require('wx-server-sdk');
const puppeteer = require('puppeteer');

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const { number, departure, destination } = event;
  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ]
  });
  const page = await browser.newPage();
  // await page.goto('https://trains.ctrip.com/trainbooking/TrainSchedule/' + number);
  // const rowHandles = await page.$$eval('table.tb_gray tbody tr');
  // console.log(rowHandles);
  // const stationPromises = rowHandles.map(async (rowHandle) => {
  //   const station = await rowHandle.$$eval('td', (nodes) => {
  //     const name = nodes[2].getElementsByTagName('a')[0].innerText;
  //     const getInTime = nodes[3].innerText;
  //     const departureTime = nodes[4].innerText;
  //     return {
  //       name,
  //       getInTime,
  //       departureTime
  //     };
  //   });
  //   return station;
  // });
  // const stations = await Promise.all(stationPromises);
  // console.log(stations);
}