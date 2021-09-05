import React from 'react';



function Header({movements}){
  // console.log(movements)
  const totalBalance = movements.reduce((totalBalance, mov) =>totalBalance += mov.category === 'outcome'? -mov.amount : mov.amount, 0);
  const moneyFormatter = Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2
  })
  return(
    <header>
    <div className="NavItemsContainer">
      {/* <h1>Hola, *Nombre*</h1> */}
      <span><h2>Tu Balance: ARS {moneyFormatter.format(totalBalance)}</h2></span>
      {/* <button>
        Log Out
      </button> */}
    </div>
  </header>
  );
}

export default Header;

