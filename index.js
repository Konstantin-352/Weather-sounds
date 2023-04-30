var weatherTypes = {
    winter: {
        background: 'assets/winter-bg.jpg',
        audio: 'assets/sounds/winter.mp3'
    },
    summer: {
        background: 'assets/summer-bg.jpg',
        audio: 'assets/sounds/summer.mp3'
    },
    rainy: {
        background: 'assets/rainy-bg.jpg',
        audio: 'assets/sounds/rain.mp3'
    },
};
var WeatherSound = /** @class */ (function () {
    function WeatherSound() {
        this.currentBtn = null;
        this.currentType = null;
        this.btnClass = '.btn';
        this.volumeId = 'volume';
        this.audioEl = new Audio();
        this.audioEl.loop = true;
        this.init();
    }
    WeatherSound.prototype.init = function () {
        var _this = this;
        var buttons = document.querySelectorAll(this.btnClass);
        buttons.forEach(function (btn) {
            btn.addEventListener('click', function () { return _this.handleClickBtn(btn); });
        });
        var volumeRange = document.getElementById(this.volumeId);
        volumeRange === null || volumeRange === void 0 ? void 0 : volumeRange.addEventListener('change', function () { return _this.handleChangeVolume(volumeRange); });
    };
    WeatherSound.prototype.handleChangeVolume = function (el) {
        this.audioEl.volume = parseFloat(el.value);
        console.log(parseFloat(el.value));
    };
    WeatherSound.prototype.handleClickBtn = function (btn) {
        var _a;
        var btnType = btn.dataset.type;
        if (!btnType) {
            return;
        }
        if (this.currentType !== btnType) {
            (_a = this.currentBtn) === null || _a === void 0 ? void 0 : _a.classList.remove('btn--pause');
            this.currentBtn = btn;
            this.currentType = btnType;
            this.audioEl.src = weatherTypes[btnType].audio;
            this.audioEl.play();
            btn.classList.add('btn--pause');
            document.body.style.backgroundImage = "url('".concat(weatherTypes[btnType].background, "')");
        }
        else {
            if (btn.classList.contains('btn--pause')) {
                btn.classList.remove('btn--pause');
                this.audioEl.pause();
            }
            else {
                btn.classList.add('btn--pause');
                this.audioEl.play();
            }
        }
    };
    return WeatherSound;
}());
document.addEventListener('DOMContentLoaded', function () {
    new WeatherSound();
});
