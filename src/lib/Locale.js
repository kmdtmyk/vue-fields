const japanese = {
  thisMonth: '今月',
  thisYear: '今年',
  today: '今日',
  clear: 'クリア',
  dayNames: [
    '日',
    '月',
    '火',
    '水',
    '木',
    '金',
    '土',
  ],
  monthNames: [
    '',
    '1月',
    '2月',
    '3月',
    '4月',
    '5月',
    '6月',
    '7月',
    '8月',
    '9月',
    '10月',
    '11月',
    '12月',
  ],
}

const english = {
  thisMonth: 'This month',
  thisYear: 'This year',
  today: 'Today',
  clear: 'Clear',
  dayNames: [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
  ],
  monthNames: [
    '',
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
}

export default class{

  static get(){
    if(navigator.language === 'ja'){
      return japanese
    }else{
      return english
    }
  }

}
