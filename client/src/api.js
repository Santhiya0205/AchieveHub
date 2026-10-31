const BASE=import.meta.env.VITE_API_URL||"http://localhost:5000/api";
export const token=()=>localStorage.getItem("ah_token");
export const saveSession=(t,u)=>{localStorage.setItem("ah_token",t);localStorage.setItem("ah_user",JSON.stringify(u));};
export const clearSession=()=>{localStorage.removeItem("ah_token");localStorage.removeItem("ah_user");};
export const savedUser=()=>{try{return JSON.parse(localStorage.getItem("ah_user")||"null")}catch{return null}};
export async function api(path,opts={}){const headers={"Content-Type":"application/json",...(opts.headers||{})};if(token())headers.Authorization=`Bearer ${token()}`;const r=await fetch(BASE+path,{...opts,headers});const d=await r.json().catch(()=>({}));if(!r.ok)throw Error(d.message||"Request failed");return d;}
