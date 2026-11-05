// Prepared lighting harness dependency: fingerprint.cjs
function firstDifference(a,b,path='$'){
  if(Object.is(a,b))return null;
  if(a===null||b===null||typeof a!=='object'||typeof b!=='object')return {field:path,expected:a,actual:b};
  if(Array.isArray(a)!==Array.isArray(b))return {field:path,expected:a,actual:b};
  if(Array.isArray(a)&&a.length!==b.length)return {field:path+'.length',expected:a.length,actual:b.length};
  const keys=[...new Set([...Object.keys(a),...Object.keys(b)])];
  for(const key of keys){const d=firstDifference(a[key],b[key],path+(Array.isArray(a)?'['+key+']':'.'+key));if(d)return d;}
  return null;
}
function createStability(k){
  if(!Number.isInteger(k)||k<2)throw Error('At least two held renders required');
  let count=0,serial;
  return {step(snapshot){const next=JSON.stringify(snapshot);count=next===serial?count+1:1;serial=next;return {stable:count>=k,count,k};}};
}
module.exports={firstDifference,createStability};
