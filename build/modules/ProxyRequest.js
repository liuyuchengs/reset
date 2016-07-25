"use strict";
/// <reference path="./../../typings/index.d.ts" />
const requests = require("request");
/**
 * @module
 */
/**
 * 发起http请求
 * @param {any} req - 经过express parse后的req对象
 * @param {string} host - 需要发起http请求的url host
 */
function request(req, host) {
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
            requests.get(getObj, (err, httpRes, body) => {
                if (err !== null) {
                    reject(err);
                }
                else {
                    resolve(body);
                }
            });
        }
        if (req.method === "POST") {
            if (req.body.isMulter) {
                let obj = {
                    url: host + req.originalUrl,
                    headers: {
                        "accessToken": req.headers.accesstoken,
                    },
                    formData: req.body.formData,
                };
                requests.post(obj, (err, httpRes, body) => {
                    if (err !== null) {
                        reject(err);
                    }
                    else {
                        resolve(body);
                    }
                });
            }
            else {
                let postObj = {
                    url: host + req.originalUrl,
                    form: req.body,
                };
                if (req.headers.accesstoken) {
                    postObj.headers = {
                        "accessToken": req.headers.accesstoken,
                    };
                }
                requests.post(postObj, (err, httpRes, body) => {
                    if (err !== null) {
                        reject(err);
                    }
                    else {
                        resolve(body);
                    }
                });
            }
        }
    });
}
exports.request = request;
//# sourceMappingURL=ProxyRequest.js.map