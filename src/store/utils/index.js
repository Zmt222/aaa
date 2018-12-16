const methods = {
  getPrivilegeByCode(privilegeCode) {
    const flag = this.userInfo.privileges.find((item) => {
      return item.privilegecode === privilegeCode
    });
    return !!flag
  },
  formatDate(data) {
    if (Object.prototype.toString.call(data) === '[object Object]') {
      let newData = Object.assign({}, data);
      Object.keys(newData).forEach(item => {
        if (Object.prototype.toString.call(newData[item]) === '[object Date]') {
          newData[item] = [newData[item].getFullYear(), newData[item].getMonth() + 1, newData[item].getDate()].map(item => {
            if (item < 10) {
              return '0' + item
            } else {
              return '' + item
            }
          }).join('-');
        }
      });
      return newData
    } else {
      return data
    }
  }
};

export default methods
