const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const [ year, month, day, hours, minutes, seconds ] =
        [ date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds() ];

    return `${hours}:${minutes}:${seconds} ${day}-${month}-${year}`;
};

export default formatDate;
