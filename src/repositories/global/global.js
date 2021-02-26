const showPassword = (type_pass, icon_pass) => {
  return [
    type_pass = type_pass === 'password' ? 'text' : 'password',
    icon_pass = icon_pass === 'cilLockLocked' ? 'cilLockUnlocked' : 'cilLockLocked'
  ]
}
const newPassword = () => {
  let minuculas = "abcdefghijkmnpqrtuvwxyz";
  let mayusculas = "ABCDEFGHJKMNPQRTUVWXYZ";
  let numeros = "2346789";
  let password = "";
  for (var i=0; i<3; i++) {
    password +=minuculas.charAt(Math.floor(Math.random()*minuculas.length));
    password +=mayusculas.charAt(Math.floor(Math.random()*mayusculas.length));
    password +=numeros.charAt(Math.floor(Math.random()*numeros.length));
  }

  return password
}
const diaMasAFecha = () => {
  let fecha_ahora = new Date()
  fecha_ahora.setDate(fecha_ahora.getDate() + 1);
  let fechaDiaMas = new Date(fecha_ahora).toISOString().substr(0, 10)

  return fechaDiaMas
}

export default ({
  showPassword,
  newPassword,
  diaMasAFecha
});