type TWeatherTypeName = 'winter' | 'summer' | 'rainy';
interface IWeatherType {
    background: string
    audio: string
}

type TWeatherTypes = {
    [name in TWeatherTypeName]: IWeatherType;
};

interface IWeatherSound {
    audioEl: HTMLAudioElement
    currentBtn: HTMLButtonElement | null
    currentType: TWeatherTypeName | null
    handleClickBtn: (btn: HTMLButtonElement) => void
    handleChangeVolume: (el: HTMLInputElement) => void
    init: () => void
}

const weatherTypes: TWeatherTypes = {
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
}

class WeatherSound implements IWeatherSound {
    audioEl: HTMLAudioElement;
    currentBtn: HTMLButtonElement | null = null;
    currentType: TWeatherTypeName | null = null;
    btnClass = '.btn'
    volumeId = 'volume'

    constructor() {
        this.audioEl = new Audio();
        this.audioEl.loop = true;
        this.init();
    }

    init(): void {
        const buttons = document.querySelectorAll<HTMLButtonElement>(this.btnClass)
        buttons.forEach(btn => {
            btn.addEventListener('click', () => this.handleClickBtn(btn))
        });

        const volumeRange = document.getElementById(this.volumeId) as HTMLInputElement;
        volumeRange?.addEventListener('change', () => this.handleChangeVolume(volumeRange));
    }

    handleChangeVolume(el: HTMLInputElement): void {
        this.audioEl.volume = parseFloat(el.value);
        console.log(parseFloat(el.value));
    }

    handleClickBtn(btn: HTMLButtonElement): void {
        const btnType = btn.dataset.type as TWeatherTypeName;

        if(!btnType) {
            return;
        }

        if(this.currentType !== btnType) {
            this.currentBtn?.classList.remove('btn--pause');
            this.currentBtn = btn;
            this.currentType = btnType;
            this.audioEl.src = weatherTypes[btnType].audio;
            this.audioEl.play();
            btn.classList.add('btn--pause');
            document.body.style.backgroundImage = `url('${weatherTypes[btnType].background}')`;
        } else {
            if(btn.classList.contains('btn--pause')) {
                btn.classList.remove('btn--pause');
                this.audioEl.pause();
            } else {
                btn.classList.add('btn--pause');
                this.audioEl.play();
            }
        }

    }
}

document.addEventListener('DOMContentLoaded', function () {
    new WeatherSound();
})