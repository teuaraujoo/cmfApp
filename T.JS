const time = "08:00"
const time1 = "07:00"
const [hours, minutes] = time.split(':').map(Number);
const [hours1, minutes1] = time1.split(':').map(Number);

const data = new Date(Date.UTC(1970, 0, 1, hours, minutes, 0));
const data1 = new Date(Date.UTC(1970, 0, 1, hours1, minutes1, 0));

console.log(data1 >= data)