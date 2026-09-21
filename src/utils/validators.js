export  const isGoodPassword = value => {
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}/;
    return regex.test(value)
    // si la palabra que llega del value cumple con las condiciones del regex returna un true
    // caso contrario devuleve un false
    //condiciones: 
    // -tener entre 6 y 12 caracteres
    // - debe tener almenos un numero
    // - debe tener almenos una letraminuscula y otra mayuscula
}