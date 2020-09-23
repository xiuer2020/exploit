class Cache {
  init(variable, valid, invalid, flag = "") {
    // 更新数据函数
    let cache = JSON.parse(window.localStorage.getItem(`${variable}${flag}`));
    // 获取缓存数据,并换成对象形式 缓存多条减少网络请求
    if (cache && cache.expires > Date.now()) {
      // 数据同步
      valid();
    } else {
      invalid();
    }
  }
  parse(variable, flag = "") {
    return JSON.parse(window.localStorage.getItem(`${variable}${flag}`)).data;
  }
}
export default new Cache();
