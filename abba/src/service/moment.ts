import moment from 'moment';

export let formatter = (input:string) => {
    return moment(input).format("dddd, MMMM Do YYYY, h:mm:ss a")
}

export let momentUnix = (input:string) => {
    const format = "dddd, MMMM Do YYYY, h:mm:ss a"
    return moment(input,format).unix()
}