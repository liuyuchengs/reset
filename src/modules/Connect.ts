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
    connect(sql:string){
        let connect = mysql.createConnection(this._options);
        return new Promise<any>((resolve:(value:any)=>void,reject:(value:any)=>void)=>{
            connect.connect();
            connect.query(sql,(err:any,rows:any)=>{
                if(err!==null){
                    reject(err);
                }else{
                    resolve(rows);
                }
            });
            connect.end();
        })
    }
}

export = Connect;