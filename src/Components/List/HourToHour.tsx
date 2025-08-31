import { Dispatch, SetStateAction } from "react";

type propsHth = {
  classname?: string,
  setTimer?: Dispatch<SetStateAction<number>>,
  data: {hour: number, minutes: number},
  setData: Dispatch<SetStateAction<{hour: number, minutes: number}>>
}

const HourToHour = ({ classname='', setTimer, data, setData }: propsHth) => {
  const handleChangeTimer = (num:number, type:string) => {
    if (setTimer) {
      if(type === 'hour'){
        const hours = num > 0 ? 
          num < 24 ?
            num * 3600
          : 0 : 0;
        const minutes = data.minutes > 0 ? 
          data.minutes < 60 ?
            data.minutes * 60
          : 0 : 0;
        const time = hours + minutes
        setTimer(time)
      } else if (type === 'minutes') {
        const hours = data.hour > 0 ? 
          data.hour < 24 ?
            data.hour * 3600
          : 0 : 0;
        const minutes = num > 0 ? 
          num < 60 ?
            num * 60
          : 0 : 0;
        const time = hours + minutes
        setTimer(time)
      }
      
    }
  }
  return (
    <div className={`hth-wrapper ${classname}`} >
      <input name='hth' className='hth-input' min={0} max={23} maxLength={2} type='number' placeholder='00' onChange={(e) => {e.target.value !== '' ? setData({hour: parseInt(e.target.value), minutes: data.minutes }) : setData({hour: 0, minutes: data.minutes }); handleChangeTimer(parseInt(e.target.value), 'hour') }}/>
      <p id='hth'>:</p>
      <input name='hth' className='hth-input' min={0} max={59} maxLength={2} type='number' placeholder='00' onChange={(e) => {e.target.value !== '' ? setData({hour: data.hour, minutes: parseInt(e.target.value) }) : setData({hour: data.hour, minutes: 0 }); handleChangeTimer(parseInt(e.target.value), 'minutes') }}/>
    </div>
  )
}
export default HourToHour;