// @flow
import NotificationRules from "../enums/NotificationRules.js";

export class Notification{
     id : number = 0;
     transactionId : number = 0;
     rule: NotificationRules = {};
     //rule : string = "";
}
export default Notification;