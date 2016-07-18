"use strict";
/// <reference path="./../../typings/index.d.ts" />
const request = require("request");
/**
 * 发起http请求
 * @params req->express经过parse后的req对象
 */
function proxyRequest(req, host) {
    return new Promise((resolve, reject) => {
        if (req.method === "GET") {
            let getObj = {
                url: host + req.originalUrl,
            };
            if (req.headers.accessToken) {
                getObj.headers = {
                    "accessToken": req.headers.accessToken,
                };
            }
            request.get(getObj, (err, httpRes, body) => {
                if (err !== null) {
                    reject(err);
                }
                else {
                    resolve(body);
                }
            });
        }
        if (req.method === "POST") {
            let postObj = {
                url: host + req.originalUrl,
                form: req.body,
            };
            if (req.headers.accesstoken) {
                postObj.headers = {
                    "accessToken": req.headers.accesstoken,
                };
            }
            request.post(postObj, (err, httpRes, body) => {
                if (err !== null) {
                    reject(err);
                }
                else {
                    resolve(body);
                }
            });
        }
    });
}
module.exports = proxyRequest;
//# sourceMappingURL=ProxyRequest.js.map