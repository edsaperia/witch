export interface GroundWarmTarget { id: string; x: number; y: number }
export const nearestGroundTargets = (targets: readonly GroundWarmTarget[], from: GroundWarmTarget) =>
  targets.filter(t => t.id !== from.id).slice().sort((a, b) => Math.hypot(a.x - from.x, a.y - from.y) - Math.hypot(b.x - from.x, b.y - from.y) || a.id.localeCompare(b.id));
export interface GroundWarmJob<T> { done: Promise<T | null>; stop(): void }
export interface GroundWarmProgram { ready(): boolean; dispose(): void }
export interface GroundWarmLocation { world:number; island:string; scope?:string }
/** Async replies cannot submit GPU work. Only an eligible tick can submit or poll, one target at a time. */
export class GroundWarm<T> {
  private generation = 0;
  private context = '';
  private completed = new Set<string>();
  private job: GroundWarmJob<T> | null = null;
  private prepared: { id: string; data: T } | null = null;
  private active: { id: string; program: GroundWarmProgram } | null = null;
  private retained: {id:string;program:GroundWarmProgram}[] = [];
  private location: GroundWarmLocation | undefined;
  private disposed = false;
  constructor(private eligible: () => boolean, private prepare: (id: string) => GroundWarmJob<T>, private compile: (data: T) => GroundWarmProgram | null, private limit = 8) {}
  get status() { return {preparing:!!this.job, prepared:!!this.prepared, active:!!this.active, retained:this.retained.length}; }
  pause(): void { this.generation++; this.job?.stop(); this.job = null; this.prepared = null; }
  reset(context: string, location?: GroundWarmLocation): void {
    if (context === this.context) return;
    const destination=location&&this.location&&location.world===this.location.world&&location.scope===this.location.scope&&location.island!==this.location.island?location.island:null;
    this.location=location;
    this.pause();
    if(this.active?.id!==destination){this.active?.program.dispose();this.active=null;}
    // Pin only the newly arrived island's ready program, so teardown cannot delete its
    // last renderer reference before the real arrival material acquires that same key.
    const keep=this.retained.filter(p=>p.id===destination);
    for (const p of this.retained) if(!keep.includes(p))p.program.dispose();
    this.retained=keep;this.completed.clear();for(const p of keep)this.completed.add(p.id);this.context=context;
  }
  tick(context: string, targets: readonly string[], location?: GroundWarmLocation): void {
    if (this.disposed) return;
    this.reset(context,location);
    if (!this.eligible()) { this.pause(); return; }
    if (this.active) {
      if (!this.eligible() || !this.active.program.ready()) return;
      this.completed.add(this.active.id); this.retained.push(this.active); this.active = null;
      if (this.retained.length >= this.limit) return;
    }
    if (this.retained.length >= this.limit || this.job) return;
    if (this.prepared) {
      const {id, data} = this.prepared; this.prepared = null;
      if (!targets.includes(id) || !this.eligible()) return;
      const program = this.compile(data);
      if (program) this.active = {id, program}; else this.completed.add(id);
      return;
    }
    const id = targets.find(id => !this.completed.has(id));
    if (!id || !this.eligible()) return;
    const generation = this.generation, job = this.job = this.prepare(id);
    void job.done.then(data => {
      if (this.disposed || generation !== this.generation || this.job !== job) return;
      this.job = null;
      if (!this.eligible()) { this.pause(); return; }
      if (data) this.prepared = {id, data}; else this.completed.add(id);
    }).catch(() => { if (this.job === job) { this.job = null; this.completed.add(id); } });
  }
  dispose(): void { this.reset(this.context + ':disposed'); this.disposed = true; }
}
