import { expect, it } from "vitest";
import { createRequire } from "node:module";
import { runInNewContext } from "node:vm";
const { initScript, socketCloseLine, summary } = createRequire(import.meta.url)("../../../tools/multiplayer/route.cjs");

function fixture() {
  let clock=0;
  class NativeSocket {
    readyState=0; fail=false; listeners=new Map<string, ((e: unknown)=>void)[]>();
    addEventListener(type:string,fn:(e: unknown)=>void){this.listeners.set(type,[...this.listeners.get(type)??[],fn]);}
    emit(type:string,event:unknown={}){if(type==="open")this.readyState=1;if(type==="close")this.readyState=3;for(const fn of this.listeners.get(type)??[])fn(event);}
    send(_data:unknown){if(this.fail)throw Error("not queued");}
    close(){this.emit("close",{code:1000,wasClean:true,reason:""});}
  }
  const window:Record<string,any>={WebSocket:NativeSocket};
  runInNewContext(`(${initScript.toString()})({from:null,to:null})`,{window,URL,Date:{now:()=>clock},requestAnimationFrame:()=>{},setTimeout:()=>{},performance:{now:()=>clock}});
  const socket=new window.WebSocket("wss://relay.example/socket?token=secret-ticket");
  return {socket,record:window.__mpRoute,at:(ms:number)=>{clock=ms;}};
}

it("records per-socket last traffic and flags an exact20s send gap in the actual summary",()=>{
  const f=fixture();f.at(100);f.socket.emit("open");f.at(1000);f.socket.send('{"type":"heartbeat","secret":"private-payload"}');
  f.at(1500);f.socket.emit("message",{data:'{"type":"heartbeat","secret":"private-response"}'});
  f.at(21000);f.socket.emit("close",{code:1006,wasClean:false,reason:""});
  const s=f.record.sockets[0];expect(s).toMatchObject({lastSend:1000,lastReceive:1500,sendGapAtCloseMs:20000,receiveGapAtCloseMs:19500});
  const r={build:{url:"build"},relay:{url:"relay"},bounds:{overallS:480},stages:[],checks:[],sockets:{host:[s],guest:[]},frameRate:[],errors:{host:[],guest:[]},screenshots:[],notes:[]};
  const text=summary(r);expect(text).toContain("host socket #0 closed 1006");expect(text).toContain("[GAP >=20s: send]");expect(text).toContain("last receive 1970-01-01T00:00:01.500Z");
  expect(text).toContain("not proof of relay receipt");expect(JSON.stringify(f.record)+text).not.toMatch(/secret-ticket|private-payload|private-response/);
});

it("does not treat thrown or closing-socket sends as queued traffic",()=>{
  const f=fixture();f.socket.emit("open");f.at(200);f.socket.send('{"type":"heartbeat"}');
  f.at(400);f.socket.fail=true;expect(()=>f.socket.send('{"type":"heartbeat"}')).toThrow("not queued");f.socket.fail=false;
  f.at(600);f.socket.readyState=2;f.socket.send('{"type":"heartbeat"}');f.at(1000);f.socket.emit("close",{code:1005});
  expect(f.record.sockets[0]).toMatchObject({lastSend:200,sendGapAtCloseMs:800,lastReceive:null,receiveGapAtCloseMs:1000});
  expect(socketCloseLine("guest",f.record.sockets[0])).not.toContain("GAP >=20s");
});

it("flags an idle opened socket, preserves historical unknowns, and stays silent for open sockets",()=>{
  const f=fixture();f.at(100);f.socket.emit("open");f.at(20100);f.socket.emit("close",{code:1008});
  expect(socketCloseLine("guest",f.record.sockets[0])).toContain("[GAP >=20s: send, receive]");
  expect(socketCloseLine("host",{id:0,opened:0,closed:99999,code:1006})).toContain("unavailable");
  expect(socketCloseLine("host",{id:0,opened:0,closed:99999,code:1006})).not.toContain("GAP >=20s");
  expect(socketCloseLine("host",{id:0,opened:0,closed:null})).toBeNull();
});
