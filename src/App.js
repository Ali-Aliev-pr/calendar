import { useState } from "react";
import { useRef } from "react";


function App() {

  let monthSelect = useRef();
  let getYear = useRef();

  const defaultProps = {
    days: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    years: [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022],
    date: new Date()
  }

  const monthData = [
    [undefined, undefined, new Date(), new Date(), new Date(), new Date(), new Date()],
    [new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date()],
    [new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date()],
    [new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date()],
    [new Date(), new Date(), new Date(), new Date(), undefined, undefined, undefined ]
  ];

  const [localDate, setLocalDate] = useState({
    date: defaultProps.date,
    currentDate: new Date(),
    selectedDate: null
  });

  function handlePrevMonthButtonClick() {
    let date = new Date(localDate.date.getFullYear(), localDate.date.getMonth() - 1)

    setLocalDate({
      date: date,
      currentDate: localDate.currentDate,
      selectedDate: localDate.selectedDate
    })
  }

  function handleNextMonthButtonClick() {
    let date = new Date(localDate.date.getFullYear(), localDate.date.getMonth() + 1)

    setLocalDate({
      date: date,
      currentDate: localDate.currentDate,
      selectedDate: localDate.selectedDate
    })
  }

  function handleSelectChange() {

    const month = monthSelect.value
    const year = getYear.value
    // console.log(year, month)

    const date = new Date(year, month)
    // console.log(date)

    setLocalDate({
      date: localDate.date,
      currentDate: localDate.currentDate,
      selectedDate: date
    })
  }

  function handleDayClick(date) {
    // console.log(date)
    setLocalDate({
      date: localDate.date,
      currentDate: localDate.currentDate,
      selectedDate: date
    })
  }


  console.log(localDate)

  return (
    <div className="father">
      <div className="calendar">
        <header>
          <button onClick={() => {handlePrevMonthButtonClick()}}>{'<'}</button>

          <select ref={element => monthSelect = element} onChange={() => {handleSelectChange()}}>
            {defaultProps.months.map((i, id) => {
              return (
                <option key={i} value={id}>{i}</option>
              )
            })}
          </select>

          <select ref={element => getYear = element} onChange={() => {handleSelectChange()}}>
            {defaultProps.years.map((i) => {
              return (
                <option key={i} value={i}>{i}</option>
              )
            })}
          </select>

          <button onClick={() => {handleNextMonthButtonClick()}}>{'>'}</button>
        </header>

        <table>

          <thead>
            <tr>
              {defaultProps.days.map((i) => {
                return (
                  <th key={i}>{i}</th>
                )
              })}
            </tr>
          </thead>

          <tbody>
            {monthData.map((week, index) => {
              return (
                <tr key={index} className='week'>
                  {week.map((date, i) => {
                    return (
                      date ? 
                        <td 
                          className="day" 
                          key={i}
                          onClick={() => {handleDayClick(date)}}
                          >
                            {date.getDate()}
                        </td> 
                      : 
                        <td key={i}/>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>

        </table>

      </div>
    </div>
  );
}

export default App;
