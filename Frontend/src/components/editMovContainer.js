import React,{useState} from 'react'
import axios from 'axios'

function EditMovContainer({amount, idMov, reason, classStr}){
  const url = `http://localhost:4000/movements/${idMov}`;
  const [data, setData] = useState({
    reason: reason,
    amount: amount,
    creationDate: ''
  })

  async function submit(e){
    e.preventDefault();
    

    console.log({
      reason: data.reason,
      creation_date: new Date(data.creationDate).getTime(),
      amount: parseFloat(data.amount),
    })

    const res = await axios.put(url,{
      reason: data.reason,
      amount: parseFloat(data.amount),
      creation_date: new Date(data.creationDate).getTime().toString(),
    });
    console.log(res.data)
    
  }


  function handle(e){
    const newData = {...data};
    newData[e.target.id] = e.target.value
    setData(newData);
    console.log(newData)
  }


  return(
    <div className={classStr}>
      <form onSubmit={(e) => submit(e)}>
        <span><label>date:</label> <input onChange={(e) => handle(e)} id="creationDate" type="datetime-local" /></span>
        <span><label>amount:</label> <input onChange={(e) => handle(e)} id="amount" value={data.amount}type="text" /></span>
        <span><label>reason: </label><input onChange={(e) => handle(e)} id="reason" value={data.reason} type="text" /></span>
        <input type="submit" value="actualizar"/>
      </form>
    </div>
  )
}

export default EditMovContainer