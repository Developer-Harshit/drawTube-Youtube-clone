export const useEditor = () => {
  const Canvas = useCanvas();
  class Editor extends Canvas {
    constructor() {
      super();
      this.current = null;
      this.surfaces = [];
    }
    init(w, h, pid, size) {
      super.init(w, h, pid);
      this.surfaces.push(this.createSurface(size));
      this.fill(this.get());
    }
    drawOnion() {
      this.ctx.save();

      this.draw(this.get());
      this.ctx.globalAlpha = 0.2;
      this.draw(this.surfaces[this.idx.value - 1]);
      this.ctx.restore();
    }

    get() {
      return this.surfaces[this.idx.value];
    }
    play(fps = 12, isPlaying) {
      if (this.interval) clearInterval(this.interval);
      const frameTimeMS = 1000 / fps;
      isPlaying.value = true;
      this.idx.value = 0;
      this.interval = setInterval(() => {
        this.fill(this, "#212121");
        this.draw(this.get());
        this.idx.value += 1;
        if (this.idx.value == this.surfaces.length || !isPlaying.value) {
          isPlaying.value = false;
          this.idx.value = 0;
          clearInterval(this.interval);
          //console.log('cleared');
        }
      }, frameTimeMS);
    }
  }
  return Editor;
};
