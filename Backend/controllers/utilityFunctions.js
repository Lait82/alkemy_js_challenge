export const _isDataInputValid = (...arrValues)=>{
  return((arrValues.every((val) =>val)) ? true : false);
}
