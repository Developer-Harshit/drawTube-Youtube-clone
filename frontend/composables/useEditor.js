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
    play(fps = 1000, isPlaying) {
      if (this.interval) clearInterval(this.interval);

      isPlaying.value = true;
      this.idx.value = -1;
      this.interval = setInterval(() => {
        this.idx.value += 1;
        this.fill(this, '#212121');
        this.draw(this.get());
        if (this.idx.value == this.surfaces.length - 1) {
          isPlaying.value = false;
          this.idx.value = 0;
          clearInterval(this.interval);
          console.log('cleared');
        }
      }, fps);
    }
  }
  return Editor;
};
