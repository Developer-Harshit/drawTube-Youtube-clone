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
      this.draw = false;

      this.surfaces = [];
      this.current = this;
      this.ease = 0.6;
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

    createCanvas(w, h, pid) {
      this.wRatio = w;
      this.hRatio = h;
      const surf = this.createSurface(innerWidth, pid);
      this.cnv = surf.cnv;

      this.ctx = surf.ctx;

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
    clearSurface() {
      this.current.ctx.clearRect(
        0,
        0,
        this.current.cnv.width,
        this.current.cnv.height
      );
    }

    drawCurrent() {
      this.ctx.drawImage(
        this.current.cnv,
        this.imgOptions.dx,
        this.imgOptions.dy,
        this.imgOptions.dw,
        this.imgOptions.dh
      );
    }
    getLocalMouse() {
      const maxX = this.imgOptions.dx + this.imgOptions.dw;
      const maxY = this.imgOptions.dy + this.imgOptions.dh;
      return {
        x: remap(
          this.mouse.x,
          this.imgOptions.dx,
          maxX,
          0,
          this.current.cnv.width
        ),
        y: remap(
          this.mouse.y,
          this.imgOptions.dy,
          maxY,
          0,
          this.current.cnv.height
        ),
        px: remap(
          this.mouse.px,
          this.imgOptions.dx,
          maxX,
          0,
          this.current.cnv.width
        ),
        py: remap(
          this.mouse.py,
          this.imgOptions.dy,
          maxY,
          0,
          this.current.cnv.height
        )
      };
    }
    addEvents() {
      addEventListener('resize', () => {
        this.resize(this.cnv, innerWidth);
      });
      addEventListener('mousedown', (e) => {
        this.updateMouse(e.clientX, e.clientY, 1);
        this.draw = true;
      });
      addEventListener('touchstart', (e) => {
        this.draw = true;
        const touch = e.touches[0] || e.changedTouches[0];
        this.updateMouse(touch.clientX, touch.clientY, 1);
      });
      addEventListener('mouseup', () => (this.draw = false));
      addEventListener('touchend', () => (this.draw = false));
      addEventListener('keydown', () => (this.draw = true));
      addEventListener('keyup', () => (this.draw = false));
      addEventListener('keypress', (e) => {
        this.paneSurface(e.key);
        this.zoomSurface(e.key);
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
    createSurface(size, pid = false) {
      const cnv = document.createElement('canvas');

      this.resize(cnv, size);
      if (!pid) return { cnv, ctx: cnv.getContext('2d') };
      const cnvParent = document.getElementById(pid);
      if (cnvParent) cnvParent.appendChild(cnv);
      return { cnv, ctx: cnv.getContext('2d') };
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
    fillSurf(surf, colorVal = '#ffffff') {
      surf.ctx.fillStyle = colorVal;
      surf.ctx.fillRect(0, 0, surf.cnv.width, surf.cnv.height);
    }
    drawLine() {
      if (!this.draw) return;
      const ctx = this.current.ctx;

      var mouse = this.getLocalMouse();

      ctx.strokeStyle = 'red';
      ctx.beginPath();
      ctx.moveTo(mouse.px, mouse.py);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.stroke();
      ctx.closePath();
    }

    resize(cnv, size) {
      cnv.width = this.wRatio * size;
      cnv.height = this.hRatio * size;
    }
  }
  return Canvas;
};
