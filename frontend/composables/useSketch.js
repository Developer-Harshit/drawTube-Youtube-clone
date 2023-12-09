export const useSketch = () => {
  function createSketch(parentid, wRatio = 50, hRatio = 50) {
    const cnv = document.createElement('canvas');
    cnv.width = wRatio;
    cnv.height = hRatio;
    const cnvParent = document.getElementById(parentid);
    cnvParent.appendChild(cnv);
    return cnv;
  }
  function clearCanvas(cnv, ctx) {
    return () => {
      ctx.clearRect(0, 0, cnv.width, cnv.height);
    };
  }

  return { createSketch, clearCanvas };
};
