import moment from "moment";

export class Helper {
    public static formatDate(date: Date) {
        if (!date) return null;
        return moment(date).format('DD/MM/YYYY HH:mm:ss');
    }
}

