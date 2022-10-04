import { useState, useEffect, useCallback, startTransition } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { PrevButton, NextButton } from "./EmblaCarouselButtons";
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'

export default function EmblaCarousel({ children }) {
    const wheelGestures = WheelGesturesPlugin()
    const [viewportRef, embla] = useEmblaCarousel({
        containScroll: "keepSnaps",
        dragFree: true, 
        loop: true,
        align: 'start',
        }, [wheelGestures]);
        const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
        const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
        
        const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
        const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);
        const onSelect = useCallback(() => {
        if (!embla) return;
        setPrevBtnEnabled(embla.canScrollPrev());
        setNextBtnEnabled(embla.canScrollNext());
        }, [embla]);
    
        useEffect(() => {
            if (!embla) return;
            embla.on("select", onSelect);
            onSelect();
        }, [embla, onSelect]);
        
        return (
            <div className="embla pb-10">
            <div className="embla__viewport" ref={viewportRef}>
            <div className="embla__container">
                {children}
                </div>
            </div>
        <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
        <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
    </div>
    )
}
