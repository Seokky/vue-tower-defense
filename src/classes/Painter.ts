class Painter {
  #ctx = null as CanvasRenderingContext2D | null;

  private get context() {
    if (!this.#ctx) {
      throw new Error('GIVE ME FUCKING CONTEXT');
    }

    return this.#ctx;
  }

  public init(ctx: CanvasRenderingContext2D) {
    this.#ctx = ctx;
  }

  public setShadow(
    offsetX: number,
    offsetY: number,
    blur: number,
    color: string,
  ) {
    this.context.shadowOffsetX = offsetX;
    this.context.shadowOffsetY = offsetY;
    this.context.shadowBlur = blur;
    this.context.shadowColor = color;
  }

  public fillCircle(
    x: number,
    y: number,
    radius: number,
    color: string,
  ) {
    this.context.fillStyle = color;
    this.context.beginPath();
    this.context.arc(x, y, radius, 0, 2 * Math.PI);
    this.context.fill();
    this.resetShadow();
  }

  public fillRect(
    x: number,
    y: number,
    w: number,
    h: number,
    color: string,
  ) {
    this.context.fillStyle = color;
    this.context.fillRect(x, y, w, h);
    this.resetShadow();
  }

  private resetShadow() {
    this.context.shadowOffsetX = 0;
    this.context.shadowOffsetY = 0;
    this.context.shadowBlur = 0;
  }
}

const painter = new Painter();

export { painter };
