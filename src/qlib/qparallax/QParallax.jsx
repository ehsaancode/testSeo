import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const QParallax = ({
  width,
  bgUrl,
  onClick = "",
  action = "",
  navigation = "",
  tailwaindClasses = "",
  children,
  type = "vertical",
}) => {
  const navigate = useNavigate();
  const parallaxRef = useRef(null);
  const backgroundRef = useRef(null);

  const [baseHeight, setBaseHeight] = useState(600);
  const [finalHeight, setFinalHeight] = useState(600);

  // Extract height from Tailwind class like h-[700px]
 useEffect(() => {
  // Match only `h-[...]` (not min-h or max-h)
  const match = tailwaindClasses.match(/(?:^|\s)h-\[(\d+(?:\.\d+)?)px\](?=\s|$)/);

  if (match) {
    const parsed = parseFloat(match[1]);
    setBaseHeight(parsed);
    setFinalHeight(parsed);

    // Remove only the matched `h-[...]` part
    const cleaned = tailwaindClasses.replace(/(?:^|\s)h-\[\d+(?:\.\d+)?px\](?=\s|$)/, "").trim();
    // Optionally: update the state or variable holding cleaned class
  }
}, [tailwaindClasses]);


  const handleClick = () => {
    if (onClick === "Yes" && action === "Navigate to" && navigation) {
      navigate(`/${navigation}`);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current || !backgroundRef.current) return;

      const rect = parallaxRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top >= windowHeight || rect.bottom <= 0) {
        backgroundRef.current.style.transform = `translateY(0px)`;
        return;
      }

      const progress = Math.max(0, Math.min((windowHeight - rect.top) / (windowHeight + rect.height), 1));
      const rawOffset = (progress - 0.5) * 120;

      // Clamp transform offset to avoid excessive movement
      const offsetBackground = Math.max(-60, Math.min(rawOffset, 60));

      backgroundRef.current.style.transform = `translateY(${offsetBackground}px)`;

      setFinalHeight(baseHeight); // Keep fixed height
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [type, baseHeight]);

  const containerStyle = {
    position: "relative",
    width: width || "100%",
    height: `${finalHeight}px`,
    overflow: "hidden",
    transition: "height 0.2s ease-out",
  };

  const backgroundStyle = {
    height: "calc(100% + 120px)", // Make background taller to prevent gaps
    backgroundImage: bgUrl ? `url(${bgUrl})` : "",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    transition: "transform 0.2s ease-out",
    willChange: "transform",
  };



  return (
    <div
      ref={parallaxRef}
      onClick={onClick === "Yes" ? handleClick : undefined}
      style={containerStyle}
     // className={`${ tailwaindClasses.replace(/(?:^|\s)h-\[\d+(?:\.\d+)?px\](?=\s|$)/, "").trim()}`}
      className={`${ tailwaindClasses}`}
    >

      {
      bgUrl && <div ref={backgroundRef} className="absolute -top-[60px] left-0 w-full z-[1]" style={backgroundStyle} ></div>
      }
      <div  className="relative z-[2]">{children}</div>
    </div>
  );
};

QParallax.propTypes = {
  bgUrl: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClick: PropTypes.string,
  action: PropTypes.string,
  navigation: PropTypes.string,
  tailwaindClasses: PropTypes.string,
  children: PropTypes.node,
  type: PropTypes.oneOf(["horizontal", "vertical"]),
};
QParallax.displayName = "QParallax";
export default QParallax;






