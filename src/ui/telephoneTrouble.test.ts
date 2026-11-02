import { afterEach, expect, it, vi } from "vitest";
import { telephoneTrouble } from "./telephone";

afterEach(() => vi.unstubAllGlobals());
class Element {
  id = ""; textContent = ""; style = {}; value = 0; isConnected = false;
  children: Element[] = []; attrs: Record<string,string> = {};
  constructor(public tag: string, all: Element[]) { all.push(this); }
  setAttribute(k:string,v:string) { this.attrs[k]=v; }
  addEventListener() {}
  append(...kids:Element[]) { this.children.push(...kids); for (const k of kids) k.isConnected=true; }
  replaceChildren(...kids:Element[]) { this.children=kids; }
  remove() { this.isConnected=false; }
  querySelector(tag:string): Element | null { return this.children.find(c=>c.tag===tag) ?? null; }
}
it("shows one phone-width countdown, updates it, clears on recovery, and leaves a dismissible loss notice", () => {
  const all:Element[]=[], body=new Element("body",all);
  const find=(id:string)=>all.find(e=>e.id===id&&e.isConnected)??null;
  vi.stubGlobal("document",{body,createElement:(tag:string)=>new Element(tag,all),getElementById:find});
  telephoneTrouble(true,20000);
  const root=find("telephone-trouble")!, bar=root.querySelector("progress")!;
  expect(root.style).toMatchObject({width:"min(320px,90vw)",pointerEvents:"none"});
  expect(root.children[0].textContent).toBe("Attempting to reconnect…");
  expect(bar.value).toBe(20000); expect(bar.attrs.max).toBe("20000");
  telephoneTrouble(true,10000); expect(bar.value).toBe(10000);
  expect(all.filter(e=>e.id==="telephone-trouble")).toHaveLength(1);
  telephoneTrouble(false); expect(find("telephone-trouble")).toBeNull();
  telephoneTrouble(true,1); telephoneTrouble(true,0);
  expect(find("telephone-trouble")).toBeNull();
  expect(find("telephone-notice")!.children[0].textContent).toBe("Connection lost");
});
