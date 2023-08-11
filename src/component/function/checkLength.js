function check(bruh, length){
    let checked = bruh
    if(checked.length > length){
  
      const bruh = checked.slice(0, length)
      const final = bruh + "..."   
      
      return final
    }
    return checked
  }

export default check