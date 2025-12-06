import { Sun, Cloud, CloudRain, CloudSun, Moon, CloudDrizzle, Wind, Sunset } from 'lucide-react';
import { motion } from 'motion/react';

interface WeatherIconProps {
  icon: string;
  size?: number;
  className?: string;
}

export function WeatherIcon({ icon, size = 32, className = '' }: WeatherIconProps) {
  const iconProps = {
    size,
    className: `${className} text-white`,
    strokeWidth: 1.5,
  };

  const iconMap: Record<string, JSX.Element> = {
    sun: <Sun {...iconProps} />,
    moon: <Moon {...iconProps} />,
    cloud: <Cloud {...iconProps} />,
    'cloud-sun': <CloudSun {...iconProps} />,
    'cloud-rain': <CloudRain {...iconProps} />,
    'cloud-drizzle': <CloudDrizzle {...iconProps} />,
    wind: <Wind {...iconProps} />,
    sunset: <Sunset {...iconProps} />,
  };

  const iconElement = iconMap[icon] || <Sun {...iconProps} />;

  // Animation variants for different weather types
  const animations: Record<string, any> = {
    sun: {
      animate: {
        rotate: [0, 360],
      },
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: 'linear',
      },
    },
    cloud: {
      animate: {
        y: [0, -5, 0],
      },
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
    'cloud-sun': {
      animate: {
        y: [0, -3, 0],
      },
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
    'cloud-rain': {
      animate: {
        y: [0, 2, 0],
      },
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  const animationProps = animations[icon] || {};

  return (
    <motion.div
      {...animationProps}
      whileHover={{ scale: 1.1 }}
      transition={{ ...animationProps.transition, scale: { duration: 0.2 } }}
    >
      {iconElement}
    </motion.div>
  );
}
