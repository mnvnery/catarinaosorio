import { IoMdArrowDropright, IoMdArrowDropleft } from 'react-icons/io'

export const PrevButton = ({ enabled, onClick }) => (
    <button
        className="embla__button left-1 md:left-4"
        onClick={onClick}
        disabled={!enabled}
    >
        <svg className="embla__button__svg" fill='none' viewBox="0 0 100 100">
        <path d="M71 3L29 52.5L71 96.5" stroke="rgb(253 186 116)" strokeWidth="2" />
        </svg>
    </button>
    );

    export const NextButton = ({ enabled, onClick }) => (
    <button
        className="embla__button right-2"
        onClick={onClick}
        disabled={!enabled}
    >
        <svg className="embla__button__svg" fill='none' viewBox="0 0 100 100">
        <path d="M29 96.5L71 47L29 3" stroke="rgb(253 186 116)" strokeWidth="2" />
        </svg>
    </button>
);