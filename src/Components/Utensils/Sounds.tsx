var volume = 0;

export function setSoundVolume(vol: number) {
    volume = vol;
}

export function useGlobalSounds(){
    const click = new Audio('nightdrawr__click.mp3');
    const click_lower = new Audio('troube_bop-sound-effect-button.mp3');
    const click_small = new Audio('menuOver.mp3');
    const hover = new Audio('fachii_button-hover.mp3');
    const timer = new Audio('timer.mp3');
    click.volume = volume;
    click_lower.volume = volume;
    click_small.volume = volume;
    hover.volume = volume;
    timer.volume = volume;
    
    const playClicked = () => {click.play()}
    const playHovered = () => {hover.play()}
    const playTimer = () => {timer.play()}
    const playClickedLower = () => {click_lower.play();}
    const playSmall = () => {click_small.play();}

    return { 
        playClicked, 
        playHovered, 
        playTimer, 
        playClickedLower, 
        playSmall 
    };
}
