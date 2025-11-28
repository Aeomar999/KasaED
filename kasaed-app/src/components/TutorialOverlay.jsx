import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, Check } from 'lucide-react';
import './ChatTutorial.css'; // Reusing the same CSS

const TutorialOverlay = ({ steps, onComplete, onSkip }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const [arrowStyle, setArrowStyle] = useState({});
    const [arrowClass, setArrowClass] = useState('');
    const [spotlightStyle, setSpotlightStyle] = useState({});
    const hasScrolledRef = useRef(false);

    // Reset scroll tracking when step changes
    useEffect(() => {
        hasScrolledRef.current = false;
    }, [currentStep]);

    useEffect(() => {
        const updatePosition = () => {
            const step = steps[currentStep];
            if (step.position === 'center') {
                setPosition({ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' });
                setArrowStyle({});
                setArrowClass('');
                return;
            }

            const element = document.querySelector(step.target);
            if (element) {
                // Auto-scroll to element if not already done for this step
                if (!hasScrolledRef.current) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    hasScrolledRef.current = true;
                }

                const rect = element.getBoundingClientRect();
                const viewportWidth = window.innerWidth;
                const viewportHeight = window.innerHeight;

                // Responsive width: max 350px, but shrink on small screens
                const tooltipWidth = Math.min(350, viewportWidth - 40);
                const tooltipHeight = 200; // Approximate height
                const margin = 20; // Margin from screen edge
                const gap = 15; // Gap between target and tooltip

                let top = 0;
                let left = 0;
                let arrowCls = '';
                let arrowSty = {};

                // Helper to calculate position
                const calculatePos = (pos) => {
                    let t = 0, l = 0, cls = '';
                    switch (pos) {
                        case 'top':
                            t = rect.top - tooltipHeight - gap;
                            l = rect.left + rect.width / 2 - tooltipWidth / 2;
                            cls = 'bottom';
                            break;
                        case 'bottom':
                            t = rect.bottom + gap;
                            l = rect.left + rect.width / 2 - tooltipWidth / 2;
                            cls = 'top';
                            break;
                        case 'left':
                            t = rect.top + rect.height / 2 - tooltipHeight / 2;
                            l = rect.left - tooltipWidth - gap;
                            cls = 'right';
                            break;
                        case 'right':
                            t = rect.top + rect.height / 2 - tooltipHeight / 2;
                            l = rect.right + gap;
                            cls = 'left';
                            break;
                        case 'bottom-left':
                            t = rect.bottom + gap;
                            l = rect.left + rect.width / 2 - tooltipWidth + 40;
                            cls = 'top';
                            break;
                        case 'top-right':
                            t = rect.top - tooltipHeight - gap;
                            l = rect.left + rect.width / 2 - 40;
                            cls = 'bottom';
                            break;
                        default: // fallback to bottom
                            t = rect.bottom + gap;
                            l = rect.left;
                            cls = 'top';
                    }
                    return { t, l, cls };
                };

                // Smart positioning: Check if preferred position fits, else flip
                let preferredPos = step.position || 'bottom';
                let { t, l, cls } = calculatePos(preferredPos);

                // Check bounds for flipping
                let fits = true;
                if (preferredPos === 'top' && t < margin) fits = false;
                if (preferredPos === 'bottom' && t + tooltipHeight > viewportHeight - margin) fits = false;
                if (preferredPos === 'left' && l < margin) fits = false;
                if (preferredPos === 'right' && l + tooltipWidth > viewportWidth - margin) fits = false;

                if (!fits) {
                    // Try flipping
                    let newPos = preferredPos;
                    if (preferredPos === 'top') newPos = 'bottom';
                    else if (preferredPos === 'bottom') newPos = 'top';
                    else if (preferredPos === 'left') newPos = 'right';
                    else if (preferredPos === 'right') newPos = 'left';

                    // Recalculate with new position
                    const flipped = calculatePos(newPos);

                    // Check if flipped fits better (or at least valid)
                    let flippedFits = true;
                    if (newPos === 'top' && flipped.t < margin) flippedFits = false;
                    if (newPos === 'bottom' && flipped.t + tooltipHeight > viewportHeight - margin) flippedFits = false;
                    if (newPos === 'left' && flipped.l < margin) flippedFits = false;
                    if (newPos === 'right' && flipped.l + tooltipWidth > viewportWidth - margin) flippedFits = false;

                    if (flippedFits) {
                        t = flipped.t;
                        l = flipped.l;
                        cls = flipped.cls;
                    }
                }

                // Final clamping to viewport (safety net)
                if (l < margin) l = margin;
                if (l + tooltipWidth > viewportWidth - margin) {
                    l = viewportWidth - tooltipWidth - margin;
                }

                if (t < margin) t = margin;
                if (t + tooltipHeight > viewportHeight - margin) {
                    t = viewportHeight - tooltipHeight - margin;
                }

                top = t;
                left = l;
                arrowCls = cls;

                // Calculate arrow position relative to tooltip
                const targetCenterX = rect.left + rect.width / 2;
                const targetCenterY = rect.top + rect.height / 2;

                if (arrowCls === 'top' || arrowCls === 'bottom') {
                    let arrowLeft = targetCenterX - left;
                    const arrowMargin = 20;
                    if (arrowLeft < arrowMargin) arrowLeft = arrowMargin;
                    if (arrowLeft > tooltipWidth - arrowMargin) arrowLeft = tooltipWidth - arrowMargin;

                    arrowSty = { left: `${arrowLeft}px`, transform: 'translateX(-50%)' };
                } else {
                    let arrowTop = targetCenterY - top;
                    const arrowMargin = 20;
                    if (arrowTop < arrowMargin) arrowTop = arrowMargin;
                    if (arrowTop > tooltipHeight - arrowMargin) arrowTop = tooltipHeight - arrowMargin;

                    arrowSty = { top: `${arrowTop}px`, transform: 'translateY(-50%)' };
                }

                setPosition({ top: `${top}px`, left: `${left}px`, width: `${tooltipWidth}px` });
                setArrowClass(arrowCls);
                setArrowStyle(arrowSty);

                // Set spotlight position to highlight target element
                setSpotlightStyle({
                    top: `${rect.top - 4}px`,
                    left: `${rect.left - 4}px`,
                    width: `${rect.width + 8}px`,
                    height: `${rect.height + 8}px`
                });
            }
        };

        updatePosition();

        // Poll for position updates to handle animations (like modal entrance)
        const intervalId = setInterval(updatePosition, 50); // Check every 50ms

        // Stop polling after 1 second (animations should be done)
        const timeoutId = setTimeout(() => {
            clearInterval(intervalId);
        }, 1000);

        window.addEventListener('resize', updatePosition);

        return () => {
            window.removeEventListener('resize', updatePosition);
            clearInterval(intervalId);
            clearTimeout(timeoutId);
        };
    }, [currentStep, steps]);

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            onComplete();
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    return createPortal(
        <div className="tutorial-overlay">
            {/* Spotlight highlight on target element */}
            {steps[currentStep].position !== 'center' && (
                <motion.div
                    className="tutorial-spotlight"
                    style={spotlightStyle}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4 }}
                />
            )}

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    className="tutorial-tooltip glass-panel"
                    style={position}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                >
                    <button className="tutorial-close" onClick={onSkip} aria-label="Skip tutorial">
                        <X size={16} />
                    </button>

                    <div className="tutorial-content">
                        <h3>{steps[currentStep].title}</h3>
                        <p>{steps[currentStep].content}</p>
                    </div>

                    <div className="tutorial-footer">
                        <div className="tutorial-dots">
                            {steps.map((_, index) => (
                                <span
                                    key={index}
                                    className={`dot ${index === currentStep ? 'active' : ''}`}
                                />
                            ))}
                        </div>

                        <div className="tutorial-actions">
                            {currentStep > 0 && (
                                <button className="btn-icon-only small" onClick={handlePrev}>
                                    <ChevronLeft size={20} />
                                </button>
                            )}
                            <button className="btn btn-primary small" onClick={handleNext}>
                                {currentStep === steps.length - 1 ? (
                                    <>Finish <Check size={16} /></>
                                ) : (
                                    <>Next <ChevronRight size={16} /></>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Arrow pointer */}
                    {steps[currentStep].position !== 'center' && (
                        <div
                            className={`tooltip-arrow ${arrowClass}`}
                            style={arrowStyle}
                        />
                    )}
                </motion.div>
            </AnimatePresence>
        </div>,
        document.body
    );
};

export default TutorialOverlay;
