const fs=require("fs"),path=require("path");let pw;try{pw=require("playwright")}catch{pw=require("/opt/node22/lib/node_modules/playwright")}
const out=process.argv[2], only=process.argv.slice(3);fs.mkdirSync(out,{recursive:true});
(async()=>{const b=await pw.chromium.launch(),p=await b.newPage();p.on("pageerror",e=>console.error("page error:",e.message));await p.goto("file://"+path.join(__dirname,"../../source/house-v4.html"));
const shot=async(n,o)=>{if(only.length&&!only.some(q=>n.startsWith(q)))return;const t=Date.now();const u=await p.evaluate(o=>{window.horizon(o);return document.getElementById("c").toDataURL()},o);fs.writeFileSync(path.join(out,n),Buffer.from(u.split(",")[1],"base64"));console.log("wrote",n,(Date.now()-t)/1000+"s")};
await shot("h0-today-500m.png",{dist:500,landmark:false,lights:1,title:"Today's flying camera from the treetops, the oak 500 m due north: the bend and the haze hide it completely"});
await shot("h1-far-1100m.png",{dist:1100,title:"Landmark, far (1.1 km): the oak's crown over the horizon in the haze, its party lights twinkling"});
await shot("h2-middle-500m.png",{dist:500,title:"Landmark, middle (500 m): the crown rising out of the far haze"});
await shot("h3-near-220m.png",{dist:220,title:"Landmark, near (220 m): inside the haze, the oak as it is, lights and all"});
await b.close()})();
