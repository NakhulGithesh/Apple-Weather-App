import { TimeOfDay } from '../types/weather';

export const getTimeOfDay = (): TimeOfDay => {
  const hour = new Date().getHours();
  
  if (hour >= 5 && hour < 7) return 'earlyMorning';
  if (hour >= 7 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 20) return 'evening';
  return 'night';
};

export const gradients: Record<TimeOfDay, { gradient: string; overlay: string }> = {
  earlyMorning: {
    gradient: 'linear-gradient(180deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
    overlay: 'rgba(0, 0, 0, 0.15)',
  },
  morning: {
    gradient: 'linear-gradient(180deg, #4facfe 0%, #00f2fe 100%)',
    overlay: 'rgba(255, 255, 255, 0.1)',
  },
  afternoon: {
    gradient: 'linear-gradient(180deg, #fa709a 0%, #fee140 100%)',
    overlay: 'rgba(255, 255, 255, 0.05)',
  },
  evening: {
    gradient: 'linear-gradient(180deg, #ff6b6b 0%, #feca57 50%, #ff9ff3 100%)',
    overlay: 'rgba(0, 0, 0, 0.1)',
  },
  night: {
    gradient: 'linear-gradient(180deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
    overlay: 'rgba(0, 0, 0, 0.3)',
  },
};

export const getBackgroundGradient = (timeOfDay: TimeOfDay, condition?: string) => {
  // Weather-based overrides
  if (condition) {
    const lowerCondition = condition.toLowerCase();
    
    // Rainy weather - dark and moody
    if (lowerCondition.includes('rain') || lowerCondition === 'rainy') {
      return {
        gradient: 'linear-gradient(180deg, #1a1a2e 0%, #2c3e50 50%, #34495e 100%)',
        overlay: 'rgba(0, 0, 0, 0.4)',
      };
    }
    
    // Partly Cloudy - whitish grey
    if (lowerCondition.includes('partly cloudy')) {
      return {
        gradient: 'linear-gradient(180deg, #bdc3c7 0%, #dfe6e9 50%, #ecf0f1 100%)',
        overlay: 'rgba(255, 255, 255, 0.2)',
      };
    }
    
    // Cloudy/Mostly Cloudy - darker grey
    if (lowerCondition.includes('cloudy')) {
      return {
        gradient: 'linear-gradient(180deg, #7f8c8d 0%, #95a5a6 50%, #bdc3c7 100%)',
        overlay: 'rgba(0, 0, 0, 0.15)',
      };
    }
  }
  
  return gradients[timeOfDay];
};