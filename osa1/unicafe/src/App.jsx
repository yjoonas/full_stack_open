import { useState } from 'react'

const Button = ({clickHandler, title}) => {
    return (
            <button onClick={clickHandler}>
                {title}
            </button>
    )
}
const StatisticLine = ({text, value}) => {
    return (
        <tr>
            <td>
                {text}
            </td>
            <td>
                {value}
            </td>
        </tr>
    )
}

const Statistics = ({feedback}) => {
    const total = Object.values(feedback).reduce((total, feedback) => total + feedback, 0)
    const avg = (feedback.good - feedback.bad) / total;
    const positive = (feedback.good / total) * 100 + '%'
    return total > 0 ?
        (<table>
            <thead>
                <tr>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            {
                Object.entries(feedback).map(([key,value]) => {
                    return <StatisticLine text={key} value={value} key={key}></StatisticLine>
            })
            }
            <StatisticLine text='All' value={total}></StatisticLine>
            <StatisticLine text='Average' value={avg}></StatisticLine>
            <StatisticLine text='Positive' value={positive}></StatisticLine>
            </tbody>
        </table>)
        : (<p>No feedback given</p>)
}
function App() {
  const [feedback, setFeedback] = useState({
      good: 0,
      neutral: 0,
      bad: 0
  })


  const increment = (value) => {
      switch (value) {
          case 'good':
              setFeedback({...feedback, good: feedback.good + 1})
              break
          case 'neutral':
              setFeedback({...feedback, neutral: feedback.neutral + 1})
              break
          case 'bad':
              setFeedback({...feedback, bad: feedback.bad + 1})
              break
      }
  }

  return (
      <div>
          <h2>
              Give feedback
          </h2>
          {
              Object.keys(feedback).map((value) => {
                  return <Button clickHandler={() => increment(value)} title={value} key={value}></Button>
              })
          }
          <h2>
              Statistic
          </h2>
          <Statistics feedback={feedback}></Statistics>
      </div>
  )
}

export default App
