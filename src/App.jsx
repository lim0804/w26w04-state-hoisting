import './App.css'
import { useState } from 'react'

const INITIAL_COUNTS = Array.from({length : 3}, () => ({
  id: crypto.randomUUID(),
  value: 0
}))

function App() {
  const [counts ,setCounts] = useState(INITIAL_COUNTS) // 

  const onIncrement = (id) => {
    setCounts(prevCounts =>
      prevCounts.map(item => //map 새로운 배열을 리턴
        item.id === id ? { ...item, value: item.value +1} : item
      ) // 이전에는 count +1 : count 로 값을 올렸는데
       // 이제는 item이 객체다 보니 그 안에 value만 가져와 값을 
       //올려야 하는데 그방법이 value: item.value + 1 
       // 그리고 map만 쓰면 바깥배열만 만드는 거고 안쪽객체가 비어버림  
       //그래서 ...item으로 안쪽 객체까지 배열 복사를 해줌//!!
    )
  }

  const total = counts.reduce((sum, current) => sum + current.value, 0)

  const onAddCounts = () => {
    setCounts(prevCounts => [...prevCounts,{id: crypto.randomUUID(),value:0}])
  } // id도 새로 만들어줘야 하니까 새로 카운터를 만들때 {id , value}

 const onRemoveCounter = (id) => {
  setCounts(prevCounts => prevCounts.filter(item => item.id !== id))
 } // item 에서 해당 id랑 item.id랑 쭉 검사해서 같으면 flase니까 제끼고

  return (
    <div>
      <h1>총합 : {total}</h1>
      <button onClick={onAddCounts}>
        카운터 추가
      </button>
      {
        // map 메서드로 counts 배열을 순회하며 Counter 컴포넌트 렌더링
        counts.map((item) => (
          <Counter
            // key는 React에서 항목을 식별하고 렌더링할 때 필요하지만, 
            // Counter 컴포넌트에는 전달되지 않음
            key= {item.id} // index를 key로 사용 {index} (실제 앱에서는 고유한 id 사용 권장)
                                      //그래서 id를 자동으로 생성해서 집어 넣음 {crypto.randomUUID()}
                                      //는데 새로 만들때 이제 랜덤 UUID 를 추가해서 집어 넣으니까 변경 << -- 최종
            //key 이거 안좋은 방법 ** primary key를 넣는게 제일 좋다(DB key)**
            count={item.value}
            onIncrement = {() => { onIncrement(item.id) }}
            onRemove = {() =>  { onRemoveCounter(item.id)}}
          />
        ))
      }
    </div>
    
    
  )
}

function Counter({count, onIncrement, onRemove }) {

  const [bgColor, setBgColor] = useState(
          () => '#' + Math.floor(Math.random()*16777215)
            .toString(16)
            .padStart(6, '0')
  )

  //Lazy initialization을 사용x -> 컴포넌트가 렌더링될 때마다
  // Math.random() 이 실행


  return (
    <div style={{ backgroundColor: bgColor }}>
      <h1>Counter: {count}</h1>
      <button onClick={onIncrement}>
        증가
      </button>
      <button onClick={onRemove}>
        제거
      </button>
    </div>
  )
}

export default App