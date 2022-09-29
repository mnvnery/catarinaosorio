import { IoMdArrowDropright, IoMdArrowDropleft } from 'react-icons/io'

export const PrevButton = ({ enabled, onClick }) => (
    <button
        className="embla__button embla__button--prev"
        onClick={onClick}
        disabled={!enabled}
    >
        <svg className="embla__button__svg" fill='none' viewBox="0 0 100 100">
        <path d="M71 3L29 52.5L71 96.5" stroke="rgb(254 215 170)" stroke-width="2" />
        </svg>
    </button>
    );

    export const NextButton = ({ enabled, onClick }) => (
    <button
        className="embla__button embla__button--next"
        onClick={onClick}
        disabled={!enabled}
    >
        <svg className="embla__button__svg" fill='none' viewBox="0 0 100 100">
        <path d="M29 96.5L71 47L29 3" stroke="rgb(254 215 170)" stroke-width="2" />
        </svg>
    </button>
);