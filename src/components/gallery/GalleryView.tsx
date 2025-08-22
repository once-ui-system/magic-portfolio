"use client";

import { useMemo, useState, useEffect, useCallback, useRef } from "react";
import Masonry from "react-masonry-css";
import { Media } from "@once-ui-system/core";
import styles from "./Gallery.module.scss";

import { gallery } from "@/resources";

type GalleryImage = {
  src: string;
  alt: string;
  title?: string;
  year?: string;
};

type ImageWithDimensions = GalleryImage & {
  aspectRatio: string;
  orientation: 'portrait' | 'landscape' | 'square';
};

interface MasonryGridProps {
  images?: GalleryImage[];
  columns?: {
    default: number;
    1100: number;
    900: number;
    600: number;
    400: number;
  };
  loadingText?: string;
}

interface LazyImageProps {
  image: GalleryImage;
  index: number;
  imageData: ImageWithDimensions | undefined;
  error: string | undefined;
  isLoading: boolean;
  onLoadDimensions: (image: GalleryImage) => void;
  onOpenModal: (image: ImageWithDimensions, index: number) => void;
  onRetry: (image: GalleryImage) => void;
}

// The Fisher-Yates shuffle algorithm | Mix up the photos so they show in different order each time - keeps things fresh!
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Figure out how big each image is so we can display them properly
// basically funtion to get image dimensions and calc. aspect ratio 
function getImageDimensions(src: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = reject;
    img.src = src;
  });
}

// Smart image classification - is it tall, wide, or square? to determine orientation
function calculateAspectRatio(width: number, height: number) {
  const ratio = width / height;
  
  // Determine orientation
  let orientation: 'portrait' | 'landscape' | 'square';
  if (Math.abs(ratio - 1) < 0.1) {
    orientation = 'square';
  } else if (ratio > 1) {
    orientation = 'landscape';
  } else {
    orientation = 'portrait';
  }

  // Calculate CSS aspect ratio - use common ratios when possible for cleaner display
  let aspectRatio: string;
  if (orientation === 'square') {
    aspectRatio = '1 / 1';
  } else if (orientation === 'landscape') {
    // Common landscape ratios - recognize the popular ones
    if (ratio >= 1.7 && ratio <= 1.8) {
      aspectRatio = '16 / 9';
    } else if (ratio >= 1.4 && ratio <= 1.5) {
      aspectRatio = '3 / 2';
    } else if (ratio >= 1.3 && ratio <= 1.35) {
      aspectRatio = '4 / 3';
    } else {
      aspectRatio = `${width} / ${height}`;
    }
  } else {
    // Portrait ratios - same deal but flipped
    if (ratio >= 0.55 && ratio <= 0.6) {
      aspectRatio = '9 / 16';
    } else if (ratio >= 0.65 && ratio <= 0.7) {
      aspectRatio = '2 / 3';
    } else if (ratio >= 0.74 && ratio <= 0.76) {
      aspectRatio = '3 / 4';
    } else {
      aspectRatio = `${width} / ${height}`;
    }
  }

  return { orientation, aspectRatio };
}

// Lazy Image Component | Each image loads itself when you scroll to it - saves bandwidth and makes things snappy
function LazyImage({ 
  image, 
  index, 
  imageData, 
  error, 
  isLoading, 
  onLoadDimensions, 
  onOpenModal, 
  onRetry 
}: LazyImageProps) {
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (!imageData && !error && !isLoading) {
            onLoadDimensions(image);
          }
          observer.disconnect(); // Job done, no need to keep watching
        }
      },
      { threshold: 0.1, rootMargin: '100px' } // Start loading a bit before the image comes into view
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [image, imageData, error, isLoading, onLoadDimensions]);

  const handleClick = () => {
    if (imageData && !error) {
      onOpenModal(imageData, index);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      ref={imgRef}
      className={styles.imageWrapper}
      onClick={handleClick}
      onKeyDown={handleKeyPress}
      tabIndex={imageData && !error ? 0 : -1}
      role="button"
      aria-label={`View ${image.alt} in gallery`}
      style={{ 
        cursor: imageData && !error ? 'pointer' : 'default',
        opacity: isVisible ? 1 : 0.7,
        transition: 'opacity 0.3s ease, transform 0.1s ease',
        outline: 'none'
      }}
    >
      {isVisible ? (
        <>
          {imageData && !error ? (
            <Media
              priority={index < 6}
              sizes="(max-width: 560px) 100vw, 50vw"
              radius="m"
              aspectRatio={imageData.aspectRatio}
              src={imageData.src}
              alt={imageData.alt}
              className={styles.gridItem}
            />
          ) : error ? (
            <div 
              style={{
                aspectRatio: '16 / 9',
                backgroundColor: 'var(--red-50, #fef2f2)',
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--red-500, #ef4444)',
                fontSize: '0.875rem',
                padding: '16px',
                textAlign: 'center',
                gap: '8px',
                border: '1px solid var(--red-200, #fecaca)'
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <span>Failed to load</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRetry(image);
                }}
                style={{
                  background: 'var(--red-500, #ef4444)',
                  color: 'white',
                  border: 'none',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  cursor: 'pointer'
                }}
              >
                Retry
              </button>
            </div>
          ) : (
            <div 
              style={{
                aspectRatio: '16 / 9',
                backgroundColor: 'var(--neutral-100, #f5f5f5)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--neutral-400, #a3a3a3)',
                fontSize: '0.875rem',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{
                width: '24px',
                height: '24px',
                border: '2px solid var(--neutral-200, #e5e5e5)',
                borderTop: '2px solid var(--neutral-400, #a3a3a3)',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
              <style jsx>{`
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}</style>
            </div>
          )}
        </>
      ) : (
        <div 
          style={{
            aspectRatio: '16 / 9',
            backgroundColor: 'var(--neutral-50, #fafafa)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--neutral-300, #d4d4d4)',
            fontSize: '0.75rem'
          }}
        >
          ·
        </div>
      )}
    </div>
  );
}

export default function MasonryGrid({ 
  images = gallery.images as GalleryImage[], 
  columns,
  loadingText = "Loading gallery..."
}: MasonryGridProps = {}) {
  const [selectedImage, setSelectedImage] = useState<ImageWithDimensions | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  
  // Lazy loading states - keeping track of what's loading and what failed
  const [imageData, setImageData] = useState<Map<string, ImageWithDimensions>>(new Map());
  const [loadingImages, setLoadingImages] = useState<Set<string>>(new Set());
  const [errors, setErrors] = useState<Map<string, string>>(new Map());
  const [retryCount, setRetryCount] = useState<Map<string, number>>(new Map());

  // Focus management - keep track of where focus was before opening modal
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Enhanced touch handling for mobile UX - all the gestures and feedback
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [modalScale, setModalScale] = useState(1);
  const [modalOpacity, setModalOpacity] = useState(1);
  const [showMobileHint, setShowMobileHint] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device and window size changes
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768 || 'ontouchstart' in window;
      setIsMobile(mobile);
    };
    
    // Initial check
    checkMobile();
    
    // Listen for window resize
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Check if user is on mobile and show hint on first modal open
  useEffect(() => {
    const hasSeenHint = localStorage.getItem('gallery-mobile-hint-seen');
    
    if (selectedImage && isMobile && !hasSeenHint) {
      const timer = setTimeout(() => {
        setShowMobileHint(true);
        localStorage.setItem('gallery-mobile-hint-seen', 'true');
        
        // Auto-hide hint after 4 seconds - don't want to annoy people
        setTimeout(() => {
          setShowMobileHint(false);
        }, 4000);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [selectedImage, isMobile]);

  const breakpointColumnsObj = columns || {
    default: 3,
    1100: 3,
    900: 2,
    600: 2,
    400: 2,
  };

  // Memoize shuffled images - only shuffle when the images actually change
  const shuffledImages = useMemo(() => {
    return shuffleArray(images);
  }, [images]);

  // Individual image dimension loader - does the heavy lifting of measuring images
  const loadImageDimensions = useCallback(async (image: GalleryImage) => {
    if (imageData.has(image.src) || loadingImages.has(image.src)) return;

    setLoadingImages(prev => new Set(prev).add(image.src));

    try {
      const { width, height } = await getImageDimensions(image.src);
      const { orientation, aspectRatio } = calculateAspectRatio(width, height);
      
      const processedImage: ImageWithDimensions = {
        ...image,
        orientation,
        aspectRatio,
      };

      setImageData(prev => new Map(prev).set(image.src, processedImage));
      // Clear any previous errors - fresh start!
      setErrors(prev => {
        const newErrors = new Map(prev);
        newErrors.delete(image.src);
        return newErrors;
      });
      setRetryCount(prev => {
        const newRetries = new Map(prev);
        newRetries.delete(image.src);
        return newRetries;
      });
    } catch (error) {
      const currentRetries = retryCount.get(image.src) || 0;
      
      if (currentRetries < 3) {
        // Retry up to 3 times with exponential backoff - sometimes networks are flaky
        setRetryCount(prev => new Map(prev).set(image.src, currentRetries + 1));
        setTimeout(() => loadImageDimensions(image), 1000 * Math.pow(2, currentRetries));
      } else {
        console.warn(`Failed to load dimensions for ${image.src}:`, error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        setErrors(prev => new Map(prev).set(image.src, errorMessage));
        
        // Still create fallback data for modal functionality - don't let one bad image break everything
        const fallbackImage: ImageWithDimensions = {
          ...image,
          orientation: 'landscape' as const,
          aspectRatio: '16 / 9',
        };
        setImageData(prev => new Map(prev).set(image.src, fallbackImage));
      }
    } finally {
      setLoadingImages(prev => {
        const newSet = new Set(prev);
        newSet.delete(image.src);
        return newSet;
      });
    }
  }, [imageData, loadingImages, retryCount]);

  // Retry function - give failed images another chance
  const retryImage = useCallback((image: GalleryImage) => {
    setErrors(prev => {
      const newErrors = new Map(prev);
      newErrors.delete(image.src);
      return newErrors;
    });
    setRetryCount(prev => {
      const newRetries = new Map(prev);
      newRetries.delete(image.src);
      return newRetries;
    });
    loadImageDimensions(image);
  }, [loadImageDimensions]);

  // Initialize loading state - quick setup
  useEffect(() => {
    setLoading(false);
  }, []);

  const openModal = (image: ImageWithDimensions, index: number) => {
    previousFocusRef.current = document.activeElement as HTMLElement;
    setSelectedImage(image);
    setSelectedIndex(index);
    
    // Focus the modal after a short delay - accessibility is important!
    setTimeout(() => {
      modalRef.current?.focus();
    }, 100);
  };

  const closeModal = () => {
    setSelectedImage(null);
    // Return focus to previously focused element - good UX practice
    previousFocusRef.current?.focus();
  };

  const nextImage = () => {
    const nextIndex = (selectedIndex + 1) % shuffledImages.length;
    const nextImageData = imageData.get(shuffledImages[nextIndex].src);
    if (nextImageData) {
      setSelectedImage(nextImageData);
      setSelectedIndex(nextIndex);
    }
  };

  const prevImage = () => {
    const prevIndex = (selectedIndex - 1 + shuffledImages.length) % shuffledImages.length;
    const prevImageData = imageData.get(shuffledImages[prevIndex].src);
    if (prevImageData) {
      setSelectedImage(prevImageData);
      setSelectedIndex(prevIndex);
    }
  };

  // Enhanced touch handlers for swipe navigation and pull-to-close - mobile magic!
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.targetTouches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
    setTouchEnd(null);
    setIsDragging(false);
    setDragOffset({ x: 0, y: 0 });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.targetTouches[0];
    setTouchEnd({ x: touch.clientX, y: touch.clientY });
    
    if (!touchStart) return;
    
    const deltaX = touch.clientX - touchStart.x;
    const deltaY = touch.clientY - touchStart.y;
    
    // Only start dragging if movement is significant - avoid accidental drags
    if (!isDragging && (Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10)) {
      setIsDragging(true);
    }
    
    if (isDragging) {
      // For pull-to-close: check if dragging down
      if (deltaY > 0) {
        setDragOffset({ x: deltaX * 0.3, y: deltaY * 0.5 });
        
        // Adjust modal scale and opacity based on drag distance - visual feedback is key
        const dragRatio = Math.min(deltaY / 200, 1);
        setModalScale(1 - dragRatio * 0.3);
        setModalOpacity(1 - dragRatio * 0.7);
      } else {
        // Reset when dragging up - don't close when scrolling content
        setDragOffset({ x: deltaX * 0.3, y: 0 });
        setModalScale(1);
        setModalOpacity(1);
      }
    }
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      // Reset states - clean up after ourselves
      setIsDragging(false);
      setDragOffset({ x: 0, y: 0 });
      setModalScale(1);
      setModalOpacity(1);
      return;
    }
    
    const deltaX = touchStart.x - touchEnd.x;
    const deltaY = touchStart.y - touchEnd.y;
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);
    
    // Pull-to-close: if dragged down more than 100px, close modal
    if (deltaY < -100 && absY > absX) {
      closeModal();
      return;
    }
    
    // Horizontal swipe for navigation (only if horizontal movement is dominant)
    if (absX > absY && absX > 50) {
      const isLeftSwipe = deltaX > 0;
      const isRightSwipe = deltaX < 0;

      if (isLeftSwipe) {
        nextImage();
      } else if (isRightSwipe) {
        prevImage();
      }
    }
    
    // Reset drag states with animation - smooth return to normal
    setIsDragging(false);
    setDragOffset({ x: 0, y: 0 });
    setModalScale(1);
    setModalOpacity(1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  };

  // Add global key event listener - keyboard navigation for power users
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (selectedImage && e.key === 'Escape') {
        closeModal();
      }
      if (selectedImage && e.key === 'ArrowRight') {
        nextImage();
      }
      if (selectedImage && e.key === 'ArrowLeft') {
        prevImage();
      }
    };

    if (selectedImage) {
      document.addEventListener('keydown', handleGlobalKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [selectedImage, selectedIndex, shuffledImages, imageData]);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '200px',
        color: 'var(--neutral-500, #737373)',
        fontSize: '1.1rem',
        gap: '16px'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '3px solid var(--neutral-200, #e5e5e5)',
          borderTop: '3px solid var(--neutral-500, #737373)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        {loadingText}
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={styles.masonryGrid}
        columnClassName={styles.masonryGridColumn}
      >
        {shuffledImages.map((image, index) => (
          <LazyImage
            key={`${image.src}-${index}`}
            image={image}
            index={index}
            imageData={imageData.get(image.src)}
            error={errors.get(image.src)}
            isLoading={loadingImages.has(image.src)}
            onLoadDimensions={loadImageDimensions}
            onOpenModal={openModal}
            onRetry={retryImage}
          />
        ))}
      </Masonry>

      {/* Enhanced Modal/Lightbox - where the magic happens */}
      {selectedImage && (
        <div
          ref={modalRef}
          className={styles.modal}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="dialog"
          aria-modal="true"
          aria-labelledby={selectedImage.title ? "modal-title" : undefined}
          aria-describedby="modal-description"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            animation: 'fadeIn 0.3s ease-out',
            padding: '20px',
            boxSizing: 'border-box',
            outline: 'none'
          }}
        >
          {/* Background overlay with subtle pattern - adds some visual depth */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)',
              pointerEvents: 'none',
            }}
          />

          {/* Image counter - shows which photo you're looking at */}
          <div
            style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              background: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(10px)',
              padding: '8px 12px',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: 'clamp(12px, 3vw, 14px)',
              fontWeight: '500',
              zIndex: 1001,
              userSelect: 'none',
              minHeight: '32px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {selectedIndex + 1} / {shuffledImages.length}
          </div>

          {/* Mobile pull indicator - visual feedback when dragging to close */}
          {isDragging && dragOffset.y > 20 && (
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background: 'rgba(0, 0, 0, 0.8)',
                backdropFilter: 'blur(10px)',
                padding: '12px 20px',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: 'white',
                fontSize: '14px',
                fontWeight: '500',
                zIndex: 1002,
                userSelect: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                pointerEvents: 'none',
                animation: 'fadeIn 0.2s ease',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 13l3 3 7-7"></path>
              </svg>
              Pull to close
            </div>
          )}

          {/* Mobile usage hint - teach users about touch gestures on first visit */}
          {showMobileHint && (
            <div
              style={{
                position: 'absolute',
                bottom: 'clamp(80px, 15vh, 120px)',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(0, 0, 0, 0.9)',
                backdropFilter: 'blur(12px)',
                padding: '16px 20px',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: 'white',
                fontSize: '13px',
                fontWeight: '500',
                zIndex: 1003,
                userSelect: 'none',
                maxWidth: 'calc(100vw - 40px)',
                textAlign: 'center',
                animation: 'fadeIn 0.3s ease, slideUp 0.3s ease',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
              }}
            >
              <div style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>
                Touch Tips
              </div>
              <div style={{ lineHeight: '1.4', opacity: 0.9 }}>
                Swipe left/right to navigate • Pull down to close
              </div>
              <button
                onClick={() => setShowMobileHint(false)}
                style={{
                  marginTop: '12px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: 'none',
                  color: 'white',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                }}
              >
                Got it
              </button>
            </div>
          )}

          {/* Swipe direction indicator - shows which way you're swiping */}
          {isDragging && Math.abs(dragOffset.x) > 30 && Math.abs(dragOffset.x) > Math.abs(dragOffset.y) && (
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: dragOffset.x > 0 ? '25%' : '75%',
                transform: 'translate(-50%, -50%)',
                background: 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(8px)',
                padding: '8px 12px',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: 'white',
                fontSize: '12px',
                fontWeight: '500',
                zIndex: 1002,
                userSelect: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                pointerEvents: 'none',
                animation: 'fadeIn 0.15s ease',
                opacity: Math.min(Math.abs(dragOffset.x) / 80, 1),
              }}
            >
              <svg 
                width="14" 
                height="14" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                style={{
                  transform: dragOffset.x > 0 ? 'rotate(180deg)' : 'none'
                }}
              >
                <polyline points="9,18 15,12 9,6"></polyline>
              </svg>
              {dragOffset.x > 0 ? 'Previous' : 'Next'}
            </div>
          )}

          {/* Close button - big enough for easy tapping on mobile */}
          <button
            onClick={closeModal}
            className={styles.closeButton}
            aria-label="Close gallery"
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              fontSize: '18px',
              padding: '14px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '44px',
              minHeight: '44px',
              width: '44px',
              height: '44px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
              zIndex: 1001,
              border: 'none',
              borderRadius: '50%',
              background: 'rgba(0, 0, 0, 0.6)',
              color: 'white',
              backdropFilter: 'blur(10px)',
              // Touch feedback - make it feel responsive
              userSelect: 'none',
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <div 
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              animation: isDragging ? 'none' : 'slideUp 0.4s ease-out',
              transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) scale(${modalScale})`,
              opacity: modalOpacity,
              transition: isDragging ? 'none' : 'transform 0.3s ease, opacity 0.3s ease',
              touchAction: 'none', // Prevent default touch behaviors
              userSelect: 'none',
            }}
          >
            {/* Main image container - where the photo lives */}
            <div
              style={{
                position: 'relative',
                borderRadius: 'clamp(8px, 2vw, 16px)',
                overflow: 'hidden',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                padding: 'clamp(4px, 1vw, 8px)',
                maxWidth: '100%',
                maxHeight: 'calc(100vh - clamp(120px, 20vh, 200px))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                // Dynamic margin based on mobile/desktop - give more breathing room on larger screens
                margin: isMobile ? '0 clamp(16px, 4vw, 32px)' : '0 clamp(60px, 15vw, 100px)',
              }}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                style={{
                  maxWidth: isMobile 
                    ? 'calc(100vw - clamp(32px, 8vw, 64px))' 
                    : 'calc(100vw - clamp(120px, 30vw, 200px))',
                  maxHeight: 'calc(100vh - clamp(120px, 20vh, 200px))',
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain',
                  borderRadius: 'clamp(6px, 1.5vw, 12px)',
                  display: 'block',
                  // Prevent image selection on mobile - no accidental text selection
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  pointerEvents: 'none',
                }}
              />
              
              {/* Subtle shimmer effect while image loads - just a nice touch */}
              <div
                style={{
                  position: 'absolute',
                  top: 'clamp(4px, 1vw, 8px)',
                  left: 'clamp(4px, 1vw, 8px)',
                  right: 'clamp(4px, 1vw, 8px)',
                  bottom: 'clamp(4px, 1vw, 8px)',
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
                  borderRadius: 'clamp(6px, 1.5vw, 12px)',
                  animation: 'shimmer 2s infinite',
                  pointerEvents: 'none',
                  zIndex: -1,
                }}
              />
            </div>
            
            {/* Photo title and year - context for what you're looking at */}
            {(selectedImage.title || selectedImage.year) && (
              <div 
                id="modal-description"
                style={{
                  marginTop: 'clamp(12px, 3vh, 20px)',
                  textAlign: 'center',
                  color: 'white',
                  background: 'rgba(0, 0, 0, 0.6)',
                  backdropFilter: 'blur(10px)',
                  padding: 'clamp(12px, 3vw, 16px) clamp(16px, 4vw, 24px)',
                  borderRadius: 'clamp(8px, 2vw, 12px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  maxWidth: 'calc(100vw - clamp(32px, 8vw, 80px))',
                  boxSizing: 'border-box',
                  margin: 'clamp(12px, 3vh, 20px) auto 0',
                }}
              >
                {selectedImage.title && (
                  <h3 
                    id="modal-title"
                    style={{ 
                      margin: '0 0 8px 0', 
                      fontSize: 'clamp(1rem, 4vw, 1.5rem)',
                      fontWeight: '600',
                      color: 'rgba(255, 255, 255, 0.95)',
                      letterSpacing: '-0.025em',
                      lineHeight: '1.3',
                    }}
                  >
                    {selectedImage.title}
                  </h3>
                )}
                {selectedImage.year && (
                  <p style={{ 
                    margin: 0, 
                    opacity: 0.7,
                    fontSize: 'clamp(0.8rem, 3vw, 0.95rem)',
                    color: 'rgba(255, 255, 255, 0.7)',
                  }}>
                    {selectedImage.year}
                  </p>
                )}
              </div>
            )}

            {/* Navigation arrows - only show on desktop since mobile uses swipes */}
            {!isMobile && (
              <>
                <button
                  onClick={prevImage}
                  aria-label="Previous image"
                  style={{
                    position: 'absolute',
                    left: 'clamp(8px, 3vw, 24px)',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(0, 0, 0, 0.6)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    fontSize: '20px',
                    padding: '0',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: '48px',
                    minHeight: '48px',
                    width: 'clamp(48px, 10vw, 64px)',
                    height: 'clamp(48px, 10vw, 64px)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                    zIndex: 1001,
                    // Touch optimization - make sure buttons work well on mobile
                    userSelect: 'none',
                    WebkitTapHighlightColor: 'transparent',
                    touchAction: 'manipulation',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                    e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 0, 0, 0.6)';
                    e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="15,18 9,12 15,6"></polyline>
                  </svg>
                </button>
                
                <button
                  onClick={nextImage}
                  aria-label="Next image"
                  style={{
                    position: 'absolute',
                    right: 'clamp(8px, 3vw, 24px)',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(0, 0, 0, 0.6)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    fontSize: '20px',
                    padding: '0',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: '48px',
                    minHeight: '48px',
                    width: 'clamp(48px, 10vw, 64px)',
                    height: 'clamp(48px, 10vw, 64px)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                    zIndex: 1001,
                    // Touch optimization - smooth interactions on all devices
                    userSelect: 'none',
                    WebkitTapHighlightColor: 'transparent',
                    touchAction: 'manipulation',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                    e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 0, 0, 0.6)';
                    e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="9,18 15,12 9,6"></polyline>
                  </svg>
                </button>
              </>
            )}
                        </div>
              
                        {/* CSS animations for smooth transitions */}
                        <style jsx>{`
                          @keyframes fadeIn {
                            from { opacity: 0; }
                            to { opacity: 1; }
                          }
                          
                          @keyframes slideUp {
                            from { 
                              opacity: 0; 
                              transform: translateY(30px) scale(0.95); 
                            }
                            to { 
                              opacity: 1; 
                              transform: translateY(0) scale(1); 
                            }
                          }
                          
                          @keyframes shimmer {
                            0% { transform: translateX(-100%); }
                            100% { transform: translateX(100%); }
                          }
                        `}</style>
                      </div>
                    )}
                  </>
                );
              }
