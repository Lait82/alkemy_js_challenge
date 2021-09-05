import React,{useState} from 'react';
import EditMovContainer from './editMovContainer';


const _convertToDate = (param) =>{
  const date = new Date(Number(param));
  const daysDifference = new Date(new Date() - date).getDate();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const hour = date.getHours();
  const minutes = date.getMinutes() <10 ? date.getMinutes().toString().padStart(2,'0') : date.getMinutes();
  
  if(daysDifference <= 10){
    return(daysDifference === 1 ? `${daysDifference} day ago`: `${daysDifference} days ago`);
  }
  return(`${day}/${month}/${year.toString().slice(-2)}  ${hour}:${minutes}`)
}
// const _toggleEditMov = () => {
// }

const _normalizeMoney = (param) =>{
  return new Intl.NumberFormat(navigator.locale, {
    style:'currency',
    currency:'ARS',
    currencyDisplay:'symbol'
  }).format(param);
}
function SingleMov({creation_date, reason, amount, category, loading, idMov}){
  // console.log(creation_date, amount, reason, category, loading);
  const [isEditMovOpen, setisEditMovOpen] = useState(false);

  const collapsedStr = isEditMovOpen ? '--Collapsed': '';
  return(
    <div className = {`SingleMovContainer${collapsedStr}`} >
      <div className = {`SingleMovement${collapsedStr}`} onClick={()=>{setisEditMovOpen(!isEditMovOpen)}}>
        <span>{loading ? 'loading' : _convertToDate(creation_date)}</span> {/* Date */}
        <span>$ {loading ? 'loading' : _normalizeMoney(amount)}</span>
        <span>{loading ? 'loading' : reason}</span>
        <span className ={`MovType--${category}`}>{loading ? 'loading' : category}</span>
      </div>


      <EditMovContainer
        amount={amount}
        classStr = {`EditMov${collapsedStr}`}
        creationDate={creation_date}
        idMov={idMov}
        reason={reason}
      />
      {/* <div className= {`EditMov${collapsedStr}`}>
        <form>
          <span><label>date:</label> <input type="date" value={creation_date}/></span>
          <span><label>amount:</label> <input type="text" value={amount}/></span>
          <span><label>reason: </label><input type="text" value={reason}/></span>
          <input type="submit" value="actualizar"/>
        </form>
      </div> */}
    </div>
  
  )

}

export default SingleMov;

