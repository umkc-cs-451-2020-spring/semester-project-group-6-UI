// @flow
import NotificationRules from "../enums/NotificationRules.js";

export class Notification{
     id : number = 0;
     transaction : number = 0;
     rule: NotificationRules = {};
     open: boolean = false;
}
export default Notification;