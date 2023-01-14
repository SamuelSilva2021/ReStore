export function getCookie(key: string) {
  var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
  return b ? b.pop() : "";
}

export function formataMoeda(valor:number){
  return 'R$ ' + (valor/100).toFixed(2);
}