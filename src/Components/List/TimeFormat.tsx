const TimeFormat = (num:number) => {
    let minutes = num.toString();
    let seconds = num.toString();
    const hours = num / 3600 > 0 ? 
      num / 3600 > 9 ? 
      `${parseInt((num/3600).toString())}` :
      `0${parseInt((num/3600).toString())}` : 
      '00';
    while(parseInt(minutes) >= 3600) minutes = (parseInt(minutes) - 3600).toString();
    minutes = parseInt(minutes) / 60 > 0 ? 
      parseInt(minutes) / 60 > 9 ?  
      `${parseInt((parseInt(minutes)/60).toString())}` :
      `0${parseInt((parseInt(minutes)/60).toString())}` : 
      '00';
    while(parseInt(seconds) >= 60) seconds = (parseInt(seconds) - 60).toString();
    seconds = parseInt(seconds) > 0 ? 
      parseInt(seconds) > 9 ?  
      `${parseInt((parseInt(seconds)).toString())}` :
      `0${parseInt((parseInt(seconds)).toString())}` : 
      '00';
    const format = hours + ':' + minutes + ':' + seconds;
    return format;
}

export default TimeFormat;