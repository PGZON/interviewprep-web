// Cursor tracking utility
export const initCursor = () => {
  // Only run on devices with fine pointer (desktop)
  if (window.matchMedia('(pointer: fine)').matches) {
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let cursorDotX = 0;
    let cursorDotY = 0;
    let animationId;

    // Update mouse position
    const updateMouse = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // Animate cursor elements
    const animateCursor = () => {
      // Smooth cursor following
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;
      
      // Faster dot following
      cursorDotX += (mouseX - cursorDotX) * 0.2;
      cursorDotY += (mouseY - cursorDotY) * 0.2;

      // Update CSS custom properties
      document.documentElement.style.setProperty('--cursor-x', cursorX + 'px');
      document.documentElement.style.setProperty('--cursor-y', cursorY + 'px');
      document.documentElement.style.setProperty('--cursor-dot-x', cursorDotX + 'px');
      document.documentElement.style.setProperty('--cursor-dot-y', cursorDotY + 'px');

      animationId = requestAnimationFrame(animateCursor);
    };

    // Handle click effects
    const handleMouseDown = () => {
      if (document.body.classList.contains('landing-page')) {
        document.body.classList.add('cursor-click');
      }
    };

    const handleMouseUp = () => {
      if (document.body.classList.contains('landing-page')) {
        document.body.classList.remove('cursor-click');
      }
    };

    // Event listeners
    document.addEventListener('mousemove', updateMouse);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    
    // Start animation
    animateCursor();

    // Handle hover effects for interactive elements
    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll('a, button, .cursor-pointer');
      
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
          if (document.body.classList.contains('landing-page')) {
            document.body.classList.add('cursor-hover');
          }
        });
        
        el.addEventListener('mouseleave', () => {
          if (document.body.classList.contains('landing-page')) {
            document.body.classList.remove('cursor-hover');
          }
        });
      });
    };

    // Initial setup
    addHoverListeners();

    // Re-add listeners when new elements are added
    const observer = new MutationObserver(() => {
      addHoverListeners();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Cleanup function
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      document.removeEventListener('mousemove', updateMouse);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.classList.remove('cursor-hover', 'cursor-click');
      observer.disconnect();
      
      // Clear CSS custom properties
      document.documentElement.style.removeProperty('--cursor-x');
      document.documentElement.style.removeProperty('--cursor-y');
      document.documentElement.style.removeProperty('--cursor-dot-x');
      document.documentElement.style.removeProperty('--cursor-dot-y');
    };
  }
  
  // Return empty cleanup function for non-desktop devices
  return () => {};
};

// Cleanup function
export const destroyCursor = () => {
  document.body.classList.remove('cursor-hover', 'cursor-click', 'landing-page');
  
  // Clear CSS custom properties
  document.documentElement.style.removeProperty('--cursor-x');
  document.documentElement.style.removeProperty('--cursor-y');
  document.documentElement.style.removeProperty('--cursor-dot-x');
  document.documentElement.style.removeProperty('--cursor-dot-y');
};
