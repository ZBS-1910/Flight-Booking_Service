function compareTime(timeString1, timeString2){
    const datetime1 = new Date(`1970-01-01T${timeString1}`);
    const datetime2 = new Date(`1970-01-01T${timeString2}`);
    
    return datetime1.getTime() > datetime2.getTime();
}

module.exports
= {
    compareTime,
};