export const useCanvas = () => {
  function remap(val, t0, tf, s0, sf) {
    return ((val - t0) * (sf - s0)) / (tf - t0) - s0;
  }
  function remap2(val, tf, sf) {
    return (val * sf) / tf;
  }
  class Canvas {
    constructor() {
      this.mouse = { x: 0, y: 0, px: 0, py: 0 };
      this.isdrawing = false;

      this.ease = 0.4;
    }
    paneEvent(e) {
      const val = e.target.dataset.val;
      this.paneSurface(val);
    }
    zoomEvent(e) {
      const val = e.target.dataset.val;
      this.zoomSurface(val);
    }
    zoomSurface(val) {
      let speed = 3;
      if (val == val.toUpperCase()) {
        speed = 10;
      }
      val = val.toLowerCase();
      if (val == 'q') {
        this.controls.bw += speed * this.wRatio;
        this.controls.bh += speed * this.hRatio;
      }
      if (val == 'e') {
        this.controls.bw -= speed * this.wRatio;
        this.controls.bh -= speed * this.hRatio;
      }
      this.imgOptions.dx = this.controls.cx - this.controls.bw / 2;
      this.imgOptions.dy = this.controls.cy - this.controls.bh / 2;
      this.imgOptions.dw = this.controls.bw;
      this.imgOptions.dh = this.controls.bh;
    }

    paneSurface(val) {
      let speed = 8;
      if (val == val.toUpperCase()) {
        speed = 15;
      }
      val = val.toLowerCase();
      if (val == 'w') this.controls.cy -= speed;

      if (val == 'a') this.controls.cx -= speed;

      if (val == 's') this.controls.cy += speed;

      if (val == 'd') this.controls.cx += speed;

      this.imgOptions.dx = this.controls.cx - this.controls.bw / 2;
      this.imgOptions.dy = this.controls.cy - this.controls.bh / 2;
    }
    resetControls() {
      this.controls = {
        cx: this.cnv.width / 2,
        cy: this.cnv.height / 2,
        bw: this.cnv.width,
        bh: this.cnv.height
      };
      this.imgOptions = {
        dx: 0,
        dy: 0,
        dw: this.cnv.width,
        dh: this.cnv.height
      };
    }
    init(w, h, pid) {
      this.wRatio = w;
      this.hRatio = h;
      const surf = this.createSurface(
        Math.min(innerHeight, innerWidth) * 0.8,
        pid
      );
      this.cnv = surf.cnv;

      this.ctx = surf.ctx;
      this.resetControls();
    }
    clearSurface() {
      this.get().ctx.clearRect(
        0,
        0,
        this.get().cnv.width,
        this.get().cnv.height
      );
    }
    draw(surf) {
      this.ctx.drawImage(
        surf.cnv,
        this.imgOptions.dx,
        this.imgOptions.dy,
        this.imgOptions.dw,
        this.imgOptions.dh
      );
    }

    getLocalMouse() {
      const maxX = this.imgOptions.dx + this.imgOptions.dw;
      const maxY = this.imgOptions.dy + this.imgOptions.dh;
      const otherCnv = this.get().cnv;
      return {
        x: remap(this.mouse.x, this.imgOptions.dx, maxX, 0, otherCnv.width),
        y: remap(this.mouse.y, this.imgOptions.dy, maxY, 0, otherCnv.height),
        px: remap(this.mouse.px, this.imgOptions.dx, maxX, 0, otherCnv.width),
        py: remap(this.mouse.py, this.imgOptions.dy, maxY, 0, otherCnv.height)
      };
    }
    enableDraw() {
      this.isdrawing = true;
      this.get().ctx.beginPath();
    }
    disableDraw() {
      this.isdrawing = false;

      this.get().ctx.closePath();
    }
    addKeyBind() {
      addEventListener('keyup', (e) => {
        if (e.key == 'r') this.disableDraw();
      });
      addEventListener('keypress', (e) => {
        this.paneSurface(e.key);
        this.zoomSurface(e.key);
      });
      addEventListener('keydown', (e) => {
        if (e.key == 'r') this.enableDraw();
      });
    }
    removeKeyBind() {
      removeEventListener('keyup', Window);
      removeEventListener('keypress', Window);
      removeEventListener('keydown', Window);
    }
    addEvents() {
      addEventListener('resize', () => {
        this.resize(this.cnv, Math.min(innerHeight, innerWidth) * 0.8);
      });
      this.addKeyBind();
      addEventListener('mousedown', (e) => {
        this.updateMouse(e.clientX, e.clientY, 1);

        this.enableDraw();
      });
      addEventListener('touchstart', (e) => {
        this.enableDraw();
        const touch = e.touches[0] || e.changedTouches[0];
        this.updateMouse(touch.clientX, touch.clientY, 1);
      });

      addEventListener('mouseup', () => {
        this.disableDraw();
      });
      addEventListener('touchend', () => {
        this.disableDraw();
      });

      this.cnv.addEventListener('mousemove', (e) => {
        this.updateMouse(e.clientX, e.clientY);

        this.drawLine();
      });
      addEventListener('touchmove', (e) => {
        const touch = e.touches[0] || e.changedTouches[0];
        this.updateMouse(touch.clientX, touch.clientY);
        this.drawLine();
      });
    }
    createSurface(size, cnvParent = false) {
      const cnv = document.createElement('canvas');
      const ctx = cnv.getContext('2d');
      this.resize(cnv, size);
      this.fill({ cnv, ctx });
      if (!cnvParent) return { cnv, ctx };
      else cnvParent.appendChild(cnv);
      return { cnv, ctx };
    }
    updateMouse(cx, cy, eFac = this.ease) {
      const rect = this.cnv.getBoundingClientRect();
      const targetX = cx - rect.left;
      const targetY = cy - rect.top;
      this.mouse.px = this.mouse.x;
      this.mouse.py = this.mouse.y;
      this.mouse.x += (targetX - this.mouse.x) * eFac;
      this.mouse.y += (targetY - this.mouse.y) * eFac;
    }
    fill(surf, colorVal = '#ffffff') {
      surf.ctx.fillStyle = colorVal;
      surf.ctx.fillRect(0, 0, surf.cnv.width, surf.cnv.height);
    }
    get() {
      return this.current;
    }
    drawLine() {
      if (!this.isdrawing) return;

      const ctx = this.get().ctx;
      var mouse = this.getLocalMouse();

      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = 'red';

      ctx.moveTo(mouse.px, mouse.py);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.stroke();
    }

    resize(cnv, size, wR = this.wRatio, hR = this.hRatio) {
      cnv.width = wR * size;
      cnv.height = hR * size;
    }
  }
  return Canvas;
};
