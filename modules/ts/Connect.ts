/// <reference path="./../../typings/index.d.ts" />
import mysql = require("mysql");

/**
 * Connect
 */
class Connect {
    /**
     *  连接对象
     */
    private _options : mysql.IConnectionConfig;
    public get options() : mysql.IConnectionConfig {
        return this._options;
    }
    public set options(v : mysql.IConnectionConfig) {
        this._options = v;
    }
    
    /**
     *  构建连接对象
     */
    constructor() {
        this._options = {
            user:"root",
            password:"888888",
            database:"uokang",
        }
    }

    /**
     *  建立连接
     */
    connect(sql:string,callback:(err:mysql.IError,rows:any,files:any)=>void){
        let connect = mysql.createConnection(this._options);
        connect.connect();
        connect.query(sql,callback);
    }

}

export = Connect;