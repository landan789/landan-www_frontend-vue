import axios from 'axios';

import BACKEND from '@/configs/BACKEND';

let baseUrl = BACKEND.BASE_URL.replace(/\/$/, '');

class AxiosHelper {

  /** 可以批次发送 AJAX 请求的 方法
   * @param {object | Array<object>} request The request of HTTP body
   * @param {boolean} isRecursive 使用同步模式 (递归模式), 也就是一个 AJAX 等待回应后才发下一个请求
   */
  public get(request: any | any[], isRecursive: boolean = false) {
    isRecursive = !!isRecursive;

    if (request instanceof Array) {
      let requests: any[] = request;
      let resJsons: any[] = [];
      if (isRecursive) {
        let nextPromise = (i: number ): any => {
          if (i >= requests.length) {
            return Promise.resolve(resJsons);
          }
          let _url: string = requests[i].url || baseUrl + requests[i].path;
          let _params: any = requests[i].params;
          // _reqInit.cache = 'no-cache';
          // _reqInit.mode = 'cors';
          // _reqInit.credentials = 'include';

          return axios.get(_url, _params).then( (resJson) => {
            resJsons.push(resJson);
            return nextPromise(i + 1);
          });
        };
        return nextPromise(0);
      }

      return Promise.all(requests.map((_request) => {
        let _url: string = _request.url || baseUrl + _request.path;
        let _params: object = _request.params;
        return axios.get(_url, _params);
      }));
    }

    let url: string = request.url || baseUrl + request.path;
    let params: object = request.params;
    return axios.get(url, params);
  }

  /**
   * @param {string} url The URL of API laction
   * @param {object | Array<object>} params The params of HTTP body
   * @param {boolean} isPolling Use polling (recursive) to send the request
   */
  public post(url: string, params: object | object[], isPolling: boolean = false) {
    return;
}

  /**
   * @param {string} url The URL of API laction
   * @param {object | Array<object>} params The params of HTTP body
   * @param {boolean} isPolling Use polling (recursive) to send the request
   */
  public put(url: string, params: object | object[], isPolling: boolean = false) {
    return;
}

  /**
   * @param {string} url The URL of API laction
   * @param {object | Array<object>} params The params of HTTP body
   * @param {boolean} isPolling Use polling (recursive) to send the request
   */
  public delete(url: string, params: object | object[], isPolling: boolean = false) {
      return;
  }
}
export default AxiosHelper;
