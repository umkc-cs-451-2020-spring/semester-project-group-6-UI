// @flow
import "core-js/stable";
import "regenerator-runtime/runtime";

import { axiosInstance } from "../config/axios";

export default class TeamService{
    baseApiEndpoint = `/Values`;

    async getTeamMembers() : Promise<any[]>{
        try{
            let res = await axiosInstance.get(`${this.baseApiEndpoint}`);
            return res.data;
        }
        catch (e){
            console.log("Axios request failed:", e);
        }
    }
}