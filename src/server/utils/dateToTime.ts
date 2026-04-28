export function dateToTime(date: Date) {
    const dateSent = new Date(date).toLocaleString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'UTC'
    });

    return dateSent;
};
