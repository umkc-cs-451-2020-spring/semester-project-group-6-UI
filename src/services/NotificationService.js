// @flow

import { Notification } from "../entities/Notification.js";
import notifications from "../SampleData/Notifications.json";
import NotificationRules from "../enums/NotificationRules.js";

export default class NotificationService {

    getNotifications = () => {
        let notificationArr : Array<Notification> = [];

        [...notifications].forEach(function(notification) {
            //handle notifications
            let notify = new Notification();
            notify.id = notification.id;
            notify.transaction = notification.transactionId;
            notify.rule = NotificationRules[notification.rule];
            notificationArr.push(notify);
        });

        return notificationArr;
    }
}