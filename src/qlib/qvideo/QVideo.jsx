import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { generateStyle } from "../../utils/helper";

const QVideo = ({
  videoUrl,
  controls = false,
  autoplay = false,
  loop = false,
  muted = false,
  poster = "",
  preload = "metadata",
  style = {},
  onPlay,
  onPause,
  onEnded,
  isAnimationP,
  animationType,
  animationDuration,
  animationDelay,
  // Style related
  width, height, paddingLeft, paddingTop, paddingRight, paddingBottom,
  marginLeft, marginTop, marginRight, marginBottom,
  positionedLeft, positionedTop, positionedRight, positionedBottom,
  color, bgColor, borderRadius, borderColor, borderWidth, bgUrl, isImageFill,
  borderTLR, borderTRR, borderBLR, borderBRR,
  borderTW, borderTC, borderBW, borderBC, borderLW, borderLC, borderRW, borderRC,
  shadowSpreadRadius, shadowBlurRadius, shadowOffsetX, shadowOffsetY, shadowColor,
  isAbsoluteValue, overflow, zIndex,
  fontSize, fontWeight, textAlign, fontFamily, fontStyle,
  imageFit, decoration, textDirection,
  mainAlignment, crossAlignment,
  tailwaindClasses, boxShadow, foreground,
}) => {
  const videoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // IntersectionObserver to trigger animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.25 }
    );

    const current = videoRef.current;
    if (current) observer.observe(current);

    return () => current && observer.unobserve(current);
  }, []);

  // Animation trigger
  useEffect(() => {
    if (isVisible && isAnimationP === "true" && videoRef.current) {
      videoRef.current.style.animation = `${animationType} ${animationDuration}s ease ${animationDelay}s`;
    }
  }, [isVisible]);

  const containerStyle = {
    ...generateStyle({
      width, height,
      isAbsoluteValue,
      positionedLeft, positionedTop, positionedRight, positionedBottom,
      bgColor, bgUrl, isImageFill, color,
      borderRadius, borderColor, borderWidth,
      borderTLR, borderTRR, borderBLR, borderBRR,
      borderTW, borderTC, borderBW, borderBC,
      borderLW, borderLC, borderRW, borderRC,
      paddingLeft, paddingRight, paddingTop, paddingBottom,
      marginLeft, marginRight, marginTop, marginBottom,
      shadowOffsetX, shadowOffsetY, shadowBlurRadius, shadowSpreadRadius, shadowColor,
      overflow, mainAlignment, crossAlignment,
      zIndex, fontSize, fontWeight, textAlign, fontFamily, fontStyle,
      imageFit, decoration, boxShadow
    }),
    ...(foreground && {
      background: foreground,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    }),
    ...style
  };

  return (
    <video
      ref={videoRef}
      src={videoUrl}
      className={tailwaindClasses}
      controls={controls}
      autoPlay={autoplay}
      loop={loop}
      muted={muted}
      poster={poster}
      preload={preload}
      style={containerStyle}
      onPlay={onPlay}
      onPause={onPause}
      onEnded={onEnded}
    />
  );
};

QVideo.displayName = "QVideo";

export default QVideo;
