const domain = '';

const api = {
  flowPathController: {
    addFlowPath() {
      return domain + '/api/flowPath/addFlowPath'
    },
    updateFlowPath() {
      return domain + '/api/flowPath/updateFlowPath'
    },
    closeFlowPath() {
      return domain + '/api/flowPath/closeFlowPath'
    },
    listBySidebarStatus() {
      return domain + '/api/flowPath/listBySidebarStatus'
    },
    caseStatistics() {
      return domain + '/api/flowPath/caseStatistics'
    },
    flowPathHistoryExport() {
      return domain + ' /api/flowPath/flowPathHistoryExport'
    },
    allFlowPath() {
      return domain + '/api/flowPath/allFlowPath'
    },
    pass() {
      return domain + '/api/flowPath/passFlowPath'
    },
    updateDocument() {
      return domain + '/api/flowPath/updateDocument'
    }
  },
  roleController: {
    getRole() {
      return domain + '/api/role/getRole'
    }
  },
  userController: {
    addUser() {
      return domain + '/api/user/addUser'
    },
    updateUser() {
      return domain + '/api/user/updateUser'
    },
    listUsers() {
      return domain + '/api/user/listUsers'
    },
    deleteUser() {
      return domain + '/api/user/deleteUser'
    },
    updatePassword() {
      return domain + '/api/user/updatePassword'
    }
  },
  loginController: {
    login() {
      return domain + '/api/system/login'
    },
    logout() {
      return domain + '/api/system/logout'
    },
    common() {
      return domain + '/api/system/common'
    },
    listGroup() {
      return domain + '/api/system/listGroup'
    },
  },
  uploadFileController: {
    upload() {
      return domain + '/upload/uploadFile'
    },
    download() {
      return domain +'/upload/downloadFile'
    }
  },
  systemController: {
    flowCommon() {
      return domain + '/api/system/flowCommon'
    }
  }

};

export default api
