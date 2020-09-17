export class WaveFileInspector {
  private view: DataView;

  constructor(view: DataView) {
    this.view = view;
  }

  is16bitLPCM = () => {
    return this.view.getUint16(20, true) === 1;
  };

  isMonoral = () => {
    return this.view.getUint16(22, true) === 1;
  };

  getSampleRate = () => {
    return this.view.getUint32(24, true);
  };

  getDataSize = () => {
    const offset = 44;
    const filesize = this.view.getUint32(4, true) + 8;
    return filesize - offset;
  };
}
