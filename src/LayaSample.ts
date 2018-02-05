module laya {
    import Sprite = Laya.Sprite;
    import Stage = Laya.Stage;
    import Browser = Laya.Browser;
    import WebGL = Laya.WebGL;
    import Texture = Laya.Texture;
    import Handler = Laya.Handler;
    import Rectangle = Laya.Rectangle;

    class BaseObject {
        public constructor() {
            Laya.init(640, 1280, WebGL);
            Laya.stage.alignV = Stage.ALIGN_MIDDLE;
            Laya.stage.alignH = Stage.ALIGN_CENTER;

            Laya.stage.scaleMode = "showall";
            Laya.stage.bgColor = "#232628";
        }
    }

    export class Sprite_DisplayImage extends BaseObject {
        public constructor() {
            super();
            this.showAPEBySprite();
            this.showAPEByTexture();
        }

        private showAPEBySprite(): void {
            let ape: Sprite = new Sprite();
            Laya.stage.addChild(ape);
            ape.loadImage("../laya/res/avatar.png");
        }

        private showAPEByTexture(): void {
            Laya.loader.load("../laya/res/avatar.png", Handler.create(this, (): void=>{
                let ape: Sprite = new Sprite();
                let texture: Texture = Laya.loader.getRes("../laya/res/avatar.png");
                ape.graphics.drawTexture(texture, 0, 0);
                Laya.stage.addChild(ape);
                ape.pos(200, 0);

            }));
        }
    }

    export class Sprite_DisplayContainer extends BaseObject {
        private _apeContainer: Sprite;

        constructor() {
            super();
            this.createAPEs();
        }

        private createAPEs(): void {
            this._apeContainer = new Sprite();
            Laya.stage.addChild(this._apeContainer);

            let layoutRadius: number = 150;
            let radianUnit: number = Math.PI / 2;

            for (let i: number = 0; i < 4; ++i) {
                let ape: Sprite = new Sprite();
                ape.loadImage("../laya/res/avatar.png");
                ape.pivot(55, 72);

                ape.pos(Math.cos(radianUnit * i) * layoutRadius, Math.sin(radianUnit * i) * layoutRadius);

                this._apeContainer.addChild(ape);
            }

            this._apeContainer.pos(Laya.stage.width / 2, Laya.stage.height / 2);

            Laya.timer.frameLoop(1, this, this.onFrameLoop);
        }

        private onFrameLoop(event: Event): void {
            this._apeContainer.rotation += 3;
        }
    } 

    export class Sprite_Scale extends BaseObject {
        private _deltaRadius: number = 0;
        private _ape: Sprite;
        constructor() {
            super();
            this._ape = new Sprite();
            this._ape.loadImage("../laya/res/avatar.png");
            this._ape.pivot(55, 72).pos(Laya.stage.width / 2, Laya.stage.height / 2);
            Laya.stage.addChild(this._ape);
            Laya.timer.frameLoop(1, this, this.onFrameLoop);
        }

        private onFrameLoop(event: Event): void {
            this._ape.rotation += 1;

            this._deltaRadius += 0.02;
            let scaleVale: number = Math.sin(this._deltaRadius);
            this._ape.scale(scaleVale, scaleVale);
        }
    }

    export class Sprite_Mask extends BaseObject {
        private _bg2: Sprite = new Sprite();
        private _mask: Sprite = new Sprite();

        constructor() {
            super();
            let bg: Sprite = new Sprite();
            bg.loadImage("../laya/res/background.jpg");
            Laya.stage.addChild(bg);

            this._bg2 = new Sprite();
            this._bg2.loadImage("../laya/res/background.jpg");
            Laya.stage.addChild(this._bg2);
            this._bg2.scale(2, 2);

            this._mask = new Sprite();
            this._mask.loadImage("../laya/res/avatar.png", 0, 0, 0, 0, Handler.create(this, (): void=>{
                console.log("mask size: " + this._mask.width + "-" + this._mask.height);
                this._mask.pivot(this._mask.width / 2, this._mask.height / 2);
            }));
            // Laya.stage.addChild(this._mask);

            
            this._bg2.mask = this._mask;

            Laya.stage.on("mousemove", this, this.onMouseMove);
        }

        private onMouseMove(): void {
            this._bg2.x = -Laya.stage.mouseX;
            this._bg2.y = -Laya.stage.mouseY;

            this._mask.x = Laya.stage.mouseX;
            this._mask.y = Laya.stage.mouseY;
        }
    }
}
new laya.Sprite_Mask();