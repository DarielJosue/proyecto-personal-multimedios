import { Component, DestroyRef, ElementRef, afterNextRender, inject, viewChild } from '@angular/core';

@Component({
  selector: 'app-background-3d',
  imports: [],
  templateUrl: './background-3d.html',
  styleUrl: './background-3d.css',
})
export class Background3d {
  private readonly destroyRef = inject(DestroyRef);
  private readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvasEl');

  private frameId = 0;
  private renderer: any;
  private scene: any;
  private resizeObs?: ResizeObserver;
  private readonly cleanups: Array<() => void> = [];

  constructor() {
    afterNextRender(() => void this.init());
    this.destroyRef.onDestroy(() => this.dispose());
  }

  private async init(): Promise<void> {
    const THREE = await import('three');
    const canvas = this.canvasRef().nativeElement;
    const width = canvas.clientWidth || 1;
    const height = canvas.clientHeight || 1;

    const scene = new THREE.Scene();
    this.scene = scene;
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height, false);
    this.renderer = renderer;

    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const key = new THREE.DirectionalLight(0xbfe6ff, 1.1);
    key.position.set(4, 6, 8);
    scene.add(key);
    const accent = new THREE.PointLight(0x05c5fa, 0.6, 60);
    accent.position.set(-6, -3, 4);
    scene.add(accent);

    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    const TAU = Math.PI * 2;
    const fills = [0x43596e, 0x5d7891, 0x76797a, 0x3a4d61];
    const edgeColor = 0x9fd8ff;

    const glass = (geo: any) => {
      const group = new THREE.Group();
      group.add(
        new THREE.Mesh(
          geo,
          new THREE.MeshStandardMaterial({
            color: fills[Math.floor(Math.random() * fills.length)],
            transparent: true,
            opacity: 0.34,
            roughness: 0.15,
            metalness: 0.25,
          }),
        ),
        new THREE.LineSegments(
          new THREE.EdgesGeometry(geo, 18),
          new THREE.LineBasicMaterial({ color: edgeColor, transparent: true, opacity: 0.55 }),
        ),
      );
      return group;
    };

    const gearGeo = (teeth: number, rOut: number, rIn: number, rHole: number, depth: number) => {
      const shape = new THREE.Shape();
      const seg = teeth * 2;
      for (let i = 0; i <= seg; i++) {
        const r = i % 2 === 0 ? rOut : rIn;
        const a = (i / seg) * TAU;
        const x = Math.cos(a) * r;
        const y = Math.sin(a) * r;
        if (i === 0) shape.moveTo(x, y);
        else shape.lineTo(x, y);
      }
      const hole = new THREE.Path();
      hole.absarc(0, 0, rHole, 0, TAU, true);
      shape.holes.push(hole);
      const geo = new THREE.ExtrudeGeometry(shape, {
        depth,
        bevelEnabled: true,
        bevelThickness: 0.04,
        bevelSize: 0.04,
        bevelSegments: 1,
        steps: 1,
      });
      geo.center();
      return geo;
    };

    const bulb = () => {
      const group = new THREE.Group();
      const glassBulb = glass(new THREE.SphereGeometry(0.5, 18, 14));
      const base = glass(new THREE.CylinderGeometry(0.2, 0.28, 0.32, 14));
      base.position.y = -0.62;
      group.add(glassBulb, base);
      return group;
    };

    const items: any[] = [];
    const place = (obj: any, scale: number) => {
      obj.scale.setScalar(scale);
      obj.position.set(rand(-6, 6), rand(-3.2, 3.2), rand(-4, 1.5));
      obj.rotation.set(rand(0, TAU), rand(0, TAU), rand(0, TAU));
      obj.userData.idx = items.length;
      scene.add(obj);
      items.push({
        obj,
        scale,
        rx: rand(-0.004, 0.004),
        ry: rand(-0.005, 0.005),
        baseY: obj.position.y,
        amp: rand(0.12, 0.4),
        speed: rand(0.2, 0.6),
        phase: rand(0, TAU),
        boost: 0,
      });
    };

    for (let i = 0; i < 5; i++) place(glass(new THREE.BoxGeometry(1, 1, 1)), rand(0.5, 1.1));
    for (let i = 0; i < 3; i++) place(glass(gearGeo(10, 0.7, 0.52, 0.24, 0.22)), rand(0.7, 1.2));
    for (let i = 0; i < 2; i++) place(bulb(), rand(0.7, 1.1));
    for (let i = 0; i < 3; i++) place(glass(new THREE.OctahedronGeometry(0.7)), rand(0.5, 1));

    const resize = () => {
      const w = canvas.clientWidth || 1;
      const h = canvas.clientHeight || 1;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };
    this.resizeObs = new ResizeObserver(resize);
    this.resizeObs.observe(canvas);

    // Interacción: proyecta un rayo desde el puntero y mueve la figura tocada.
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let pointerInside = false;

    const toNdc = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      return pointer.x >= -1 && pointer.x <= 1 && pointer.y >= -1 && pointer.y <= 1;
    };

    const pick = () => {
      raycaster.setFromCamera(pointer, camera);
      for (const hit of raycaster.intersectObjects(scene.children, true)) {
        let o: any = hit.object;
        while (o && o.userData.idx === undefined) o = o.parent;
        if (o) return o.userData.idx as number;
      }
      return -1;
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      renderer.render(scene, camera);
      return;
    }

    const clock = new THREE.Timer();
    const tick = () => {
      this.frameId = requestAnimationFrame(tick);
      const t = clock.getElapsed();
      const hover = pointerInside ? pick() : -1;
      for (let i = 0; i < items.length; i++) {
        const it = items[i];
        if (i === hover) it.boost = Math.max(it.boost, 1);
        it.boost *= 0.93;
        const k = 1 + it.boost * 4;
        it.obj.rotation.x += it.rx * k;
        it.obj.rotation.y += it.ry * k;
        it.obj.position.y = it.baseY + Math.sin(t * it.speed + it.phase) * it.amp;
        it.obj.scale.setScalar(it.scale * (1 + Math.min(it.boost, 1.5) * 0.13));
      }
      renderer.render(scene, camera);
    };
    tick();

    const onMove = (e: PointerEvent) => {
      pointerInside = toNdc(e);
    };
    const onDown = (e: PointerEvent) => {
      if (!toNdc(e)) return;
      const idx = pick();
      if (idx >= 0) items[idx].boost = Math.min(items[idx].boost + 2.2, 4.5);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    this.cleanups.push(() => window.removeEventListener('pointermove', onMove));
    this.cleanups.push(() => window.removeEventListener('pointerdown', onDown));

    const onVisibility = () => {
      cancelAnimationFrame(this.frameId);
      if (!document.hidden) tick();
    };
    document.addEventListener('visibilitychange', onVisibility);
    this.cleanups.push(() => document.removeEventListener('visibilitychange', onVisibility));
  }

  private dispose(): void {
    cancelAnimationFrame(this.frameId);
    this.resizeObs?.disconnect();
    for (const c of this.cleanups) c();
    this.scene?.traverse((o: any) => {
      o.geometry?.dispose?.();
      const m = o.material;
      if (Array.isArray(m)) m.forEach((x: any) => x.dispose?.());
      else m?.dispose?.();
    });
    this.renderer?.dispose?.();
  }
}
