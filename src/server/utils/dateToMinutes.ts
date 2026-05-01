export function dateToMinutes(time: Date) {
    const date = new Date(time)

    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();

    return hours * 60 + minutes
};