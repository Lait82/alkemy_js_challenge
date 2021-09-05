import axios from 'axios';
import React, { useState } from 'react';

function InputMovForm(){
  const url = 'http://localhost:4000/movements';
  const [data, setData] = useState({
    reason:'',
    amount:'',
    creationDate:'',
    category:"outcome"
  })
  async function submit(e){
    e.preventDefault();
    console.log(e);

    console.log({
      reason: data.reason,
      category: data.category ?? 'outcome',
      creation_date: Date.parse(data.creationDate.toString()),
      amount: parseFloat(data.amount),
      // default info
      currency: "ARS",
      id_user: 1
    })

    const res = await axios.post(url,{
      reason: data.reason,
      category: data.category,
      creation_date: Date.parse(data.creationDate),
      amount: parseFloat(data.amount),
      // default info
      currency: "ARS",
      id_user: 1
    });
    console.log(res.data)
  }

  function handle(e){
    console.log('DEBUGGIG', e.target.id);
    const newData = {...data};
    newData[e.target.id] = e.target.value
    setData(newData);
    console.log(newData)
  }


  return(
    <div className="InputsContainer">
      <form onSubmit={(e)=>submit(e)}>
        <span className="SingleInput"><label>Reason:</label><input onChange={(e) => handle(e)} id="reason" value={data.reason} type="text" /></span>
        <span className="SingleInput"><label>Amount:</label><input onChange={(e) => handle(e)} id="amount" value={data.amount}type="text" /></span>
        <span className="SingleInput"><label>Date:</label><input onChange={(e) => handle(e)} id="creationDate" value={data.creationDate}type="datetime-local" /></span>
        <span className="SingleInput"><label>Category:</label>
          <select onChange={(e) => handle(e)} id="category" value={data.category}>
            <option value="outcome">Outcome</option>
            <option value="income">Income</option>
          </select> 
        </span>
        <input type="submit" value="Agregar" />
      </form>
    </div>
  );
}

export default InputMovForm;

