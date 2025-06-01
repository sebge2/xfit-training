import style from './Chronometer.module.scss';
import {Duration} from "../../../../model/wod/activity/duration.ts";

const number = [
    [1, 1, 1, 0, 1, 1, 1], // 0
    [0, 0, 1, 0, 0, 1, 0], // 1
    [1, 0, 1, 1, 1, 0, 1], // 2
    [1, 0, 1, 1, 0, 1, 1], // 3
    [0, 1, 1, 1, 0, 1, 0], // 4
    [1, 1, 0, 1, 0, 1, 1], // 5
    [1, 1, 0, 1, 1, 1, 1], // 6
    [1, 0, 1, 0, 0, 1, 0], // 7
    [1, 1, 1, 1, 1, 1, 1], // 8
    [1, 1, 1, 1, 0, 1, 1]  // 9
];

const opacities: { [key: string]: string } = {};

function display(a: string, n: number) {
    const elements = number[n];

    for (let i = 0; i < elements.length; i++) {
        const elementId = `${a + (i + 1)}`;

        opacities[elementId] = (elements[i] === 0)
            ? '0.125'
            : '1';
    }
}

function format(value: number): number[] {
    return `${value <= 9 ? '0' : ''}${value}`.split('').map(char => +char);
}

export default function Chronometer({duration, scale = 1}: {
    duration: Duration,
    scale?: number
}) {
    const formattedHours = format(duration?.hours || 0);
    const formattedMinutes = format(duration?.minutes || 0);
    const formattedSeconds = format(duration?.seconds || 0);

    display('a', formattedHours[0]);
    display('b', formattedHours[1]);
    display('c', formattedMinutes[0]);
    display('d', formattedMinutes[1]);
    display('e', formattedSeconds[0]);
    display('f', formattedSeconds[1]);

    return (
        // https://www.sitepoint.com/community/t/digital-clock-numbers/364485/6
        // https://codepen.io/tameraydin/pen/kMYdrx
        <svg className={style.chronometer} viewBox='0 36 122 36' xmlns='http://www.w3.org/2000/svg'
             style={{scale: scale}}>
            <g id='seconds'>
                <g>
                    <path style={{opacity: opacities['f7']}}
                          d='M106,69l3-3h6l3,3c0,0-1,1-3,1h-6C107,70,106,69,106,69z'/>
                    <path style={{opacity: opacities['f6']}}
                          d='M119,55l-3,2v8l3,3c0,0,1-1,1-3v-7C120,56,119,55,119,55z'/>
                    <path style={{opacity: opacities['f5']}}
                          d='M105,55l3,2v8l-3,3c0,0-1-1-1-3v-7C104,56,105,55,105,55z'/>
                    <polygon style={{opacity: opacities['f4']}} points='109,52 115,52 118,54 115,56 109,56 106,54'/>
                    <path style={{opacity: opacities['f3']}}
                          d='M119,40l-3,3v8l3,2c0,0,1-1,1-3v-7C120,41,119,40,119,40z'/>
                    <path style={{opacity: opacities['f2']}}
                          d='M105,40l3,3v8l-3,2c0,0-1-1-1-3v-7C104,41,105,40,105,40z'/>
                    <path style={{opacity: opacities['f1']}}
                          d='M106,39l3,3h6l3-3c0,0-1-1-3-1h-6C107,38,106,39,106,39z'/>
                </g>
                <g>
                    <path style={{opacity: opacities['e7']}} d='M88,69l3-3h6l3,3c0,0-1,1-3,1h-6C89,70,88,69,88,69z'/>
                    <path style={{opacity: opacities['e6']}}
                          d='M101,55l-3,2v8l3,3c0,0,1-1,1-3v-7C102,56,101,55,101,55z'/>
                    <path style={{opacity: opacities['e5']}} d='M87,55l3,2v8l-3,3c0,0-1-1-1-3v-7C86,56,87,55,87,55z'/>
                    <polygon style={{opacity: opacities['e4']}} points='91,52 97,52 100,54 97,56 91,56 88,54'/>
                    <path style={{opacity: opacities['e3']}}
                          d='M101,40l-3,3v8l3,2c0,0,1-1,1-3v-7C102,41,101,40,101,40z'/>
                    <path style={{opacity: opacities['e2']}} d='M87,40l3,3v8l-3,2c0,0-1-1-1-3v-7C86,41,87,40,87,40z'/>
                    <path style={{opacity: opacities['e1']}} d='M88,39l3,3h6l3-3c0,0-1-1-3-1h-6C89,38,88,39,88,39z'/>
                </g>
            </g>
            <g id='minutes'>
                <g>
                    <path style={{opacity: opacities['d7']}} d='M64,69l3-3h6l3,3c0,0-1,1-3,1h-6C65,70,64,69,64,69z'/>
                    <path style={{opacity: opacities['d6']}} d='M77,55l-3,2v8l3,3c0,0,1-1,1-3v-7C78,56,77,55,77,55z'/>
                    <path style={{opacity: opacities['d5']}} d='M63,55l3,2v8l-3,3c0,0-1-1-1-3v-7C62,56,63,55,63,55z'/>
                    <polygon style={{opacity: opacities['d4']}} points='67,52 73,52 76,54 73,56 67,56 64,54'/>
                    <path style={{opacity: opacities['d3']}} d='M77,40l-3,3v8l3,2c0,0,1-1,1-3v-7C78,41,77,40,77,40z'/>
                    <path style={{opacity: opacities['d2']}} d='M63,40l3,3v8l-3,2c0,0-1-1-1-3v-7C62,41,63,40,63,40z'/>
                    <path style={{opacity: opacities['d1']}} d='M64,39l3,3h6l3-3c0,0-1-1-3-1h-6C65,38,64,39,64,39z'/>
                </g>
                <g>
                    <path style={{opacity: opacities['c7']}} d='M46,69l3-3h6l3,3c0,0-1,1-3,1h-6C47,70,46,69,46,69z'/>
                    <path style={{opacity: opacities['c6']}} d='M59,55l-3,2v8l3,3c0,0,1-1,1-3v-7C60,56,59,55,59,55z'/>
                    <path style={{opacity: opacities['c5']}} d='M45,55l3,2v8l-3,3c0,0-1-1-1-3v-7C44,56,45,55,45,55z'/>
                    <polygon style={{opacity: opacities['c4']}} points='49,52 55,52 58,54 55,56 49,56 46,54'/>
                    <path style={{opacity: opacities['c3']}} d='M59,40l-3,3v8l3,2c0,0,1-1,1-3v-7C60,41,59,40,59,40z'/>
                    <path style={{opacity: opacities['c2']}} d='M45,40l3,3v8l-3,2c0,0-1-1-1-3v-7C44,41,45,40,45,40z'/>
                    <path style={{opacity: opacities['c1']}} d='M46,39l3,3h6l3-3c0,0-1-1-3-1h-6C47,38,46,39,46,39z'/>
                </g>
            </g>
            <g id='hours'>
                <g>
                    <path style={{opacity: opacities['b7']}} d='M22,69l3-3h6l3,3c0,0-1,1-3,1h-6C23,70,22,69,22,69z'/>
                    <path style={{opacity: opacities['b6']}} d='M35,55l-3,2v8l3,3c0,0,1-1,1-3v-7C36,56,35,55,35,55z'/>
                    <path style={{opacity: opacities['b5']}} d='M21,55l3,2v8l-3,3c0,0-1-1-1-3v-7C20,56,21,55,21,55z'/>
                    <polygon style={{opacity: opacities['b4']}} points='25,52 31,52 34,54 31,56 25,56 22,54'/>
                    <path style={{opacity: opacities['b3']}} d='M35,40l-3,3v8l3,2c0,0,1-1,1-3v-7C36,41,35,40,35,40z'/>
                    <path style={{opacity: opacities['b2']}} d='M21,40l3,3v8l-3,2c0,0-1-1-1-3v-7C20,41,21,40,21,40z'/>
                    <path style={{opacity: opacities['b1']}} d='M22,39l3,3h6l3-3c0,0-1-1-3-1h-6C23,38,22,39,22,39z'/>
                </g>
                <g>
                    <path style={{opacity: opacities['a7']}} d='M4,69l3-3h6l3,3c0,0-1,1-3,1h-6C5,70,4,69,4,69z'/>
                    <path style={{opacity: opacities['a6']}} d='M17,55l-3,2v8l3,3c0,0,1-1,1-3v-7C18,56,17,55,17,55z'/>
                    <path style={{opacity: opacities['a5']}} d='M3,55l3,2v8l-3,3c0,0-1-1-1-3v-7C2,56,3,55,3,55z'/>
                    <polygon style={{opacity: opacities['a4']}} points='7,52 13,52 16,54 13,56 7,56 4,54'/>
                    <path style={{opacity: opacities['a3']}} d='M17,40l-3,3v8l3,2c0,0,1-1,1-3v-7C18,41,17,40,17,40z'/>
                    <path style={{opacity: opacities['a2']}} d='M3,40l3,3v8l-3,2c0,0-1-1-1-3v-7C2,41,3,40,3,40z'/>
                    <path style={{opacity: opacities['a1']}} d='M4,39l3,3h6l3-3c0,0-1-1-3-1h-6C5,38,4,39,4,39z'/>
                </g>
            </g>
            <g id='dots'>
                <g>
                    <circle cx='82' cy='50' r='2'/>
                    <circle cx='82' cy='58' r='2'/>
                </g>
                <g>
                    <circle cx='40' cy='50' r='2'/>
                    <circle cx='40' cy='58' r='2'/>
                </g>
            </g>
        </svg>
    );
}