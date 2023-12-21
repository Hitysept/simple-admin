import service from "./service";

const request = (url:string, options:any = {}) => {
    let method = options.method || 'get';
    let params = options.params || {};

    return new Promise((resolve, reject) => {
        service.request({url, method,params}).then(res => {
            if (res && res.data) {
              resolve(res.data);
            }else{
              res.data = res;
              resolve(res.data);
            }
          }).catch(err => {
            reject(err);
          });
      });
  };
request.get = (url:string, params:any)=>{
    return new Promise((resolve, reject) => {
        service.get(url, params).then(res => {
            if (res && res.data) {
                resolve(res.data);
            }else{
              resolve(res);
            }
            }).catch(err => {
                reject(err);
            });
    });
}
request.post = (url:string, params:any)=>{
    return new Promise((resolve, reject) => {
        service.post(url, params).then(res => {
            if (res && res.data) {
              resolve(res.data);
            }else{
              resolve(res);
            }
          }).catch(err => {
            reject(err);
          });
      });
}

export default request;


 
