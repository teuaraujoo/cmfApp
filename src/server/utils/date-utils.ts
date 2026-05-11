export class DateUtils {

    static dateToTime(date: Date) {
        const dateSent = new Date(date).toLocaleString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'UTC'
        });

        return dateSent;
    };

    static dateToMinutes(time: Date) {
        const date = new Date(time)

        const hours = date.getUTCHours();
        const minutes = date.getUTCMinutes();

        return hours * 60 + minutes
    };

    static toTimeUtc(time: string) {
        const [hours, minutes] = time.split(':').map(Number);

        return new Date(Date.UTC(1970, 0, 1, hours, minutes, 0));
    };

    static timestampToMinutes(date: Date) {
        const current = new Date(date);

        return current.getHours() * 60 + current.getMinutes();
    }

    static toDateOnlyValue(date: Date) {
        const current = new Date(date);

        return new Date(
            current.getFullYear(),
            current.getMonth(),
            current.getDate()
        ).getTime();
    }
};