module laya {
    import Sprite = Laya.Sprite;
    import Stage = Laya.Stage;
    import Browser = Laya.Browser;
    import WebGL = Laya.WebGL;

    export class Sprite_DisplayImage {
        public constructor() {
            Laya.init(640, 1280, WebGL);
            Laya.stage.alignV = Stage.ALIGN_MIDDLE;
            Laya.stage.alignH = Stage.ALIGN_CENTER;

            Laya.stage.scaleMode = "noscale";
            Laya.stage.bgColor = "#000000";

            this.showAPE();
        }

        private showAPE(): void {
            let ape: Sprite = new Sprite();
            Laya.stage.addChild(ape);
            ape.loadImage("../laya/assets/comp/bg.png");
            ape.x = 30;
            ape.y = 30;
        }
    }
}
new laya.Sprite_DisplayImage();