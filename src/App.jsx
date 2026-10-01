import './App.css'
import { useState } from 'react'

function App() {
  const [counts ,setCounts] = useState([0,0,0]) // 

  const onIncrement = (index) => {
    setCounts(prevCounts =>
      prevCounts.map((count, i) => //map 새로운 배열을 리턴
        i === index ? count + 1 : count // 제제**
      )
    )
  }

  const total = counts.reduce((sum, current) => sum + current, 0)

  return (
    <div>
      <h1>총합 : {total}</h1>
      {
        // map 메서드로 counts 배열을 순회하며 Counter 컴포넌트 렌더링
        counts.map((count, index) => (
          <Counter
            // key는 React에서 항목을 식별하고 렌더링할 때 필요하지만, 
            // Counter 컴포넌트에는 전달되지 않음
            key={index} // index를 key로 사용 (실제 앱에서는 고유한 id 사용 권장)
            //key 이거 안좋은 방법 ** primary key를 넣는게 제일 좋다(DB key)**
            count={count}
            onIncrement={() => { onIncrement(index) }}
          />
        ))
      }
    </div>
    
    
  )
}

function Counter({count,onIncrement}) {

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button 
        onClick={ onIncrement }>
          증가
      </button>
    </div>
  )
}

export default App