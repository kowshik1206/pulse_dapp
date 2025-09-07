import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CalendarPicker = ({ selectedDate, onDateSelect, className = '' }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [hoveredDate, setHoveredDate] = useState(null);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date) => {
    const year = date?.getFullYear();
    const month = date?.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay?.getDate();
    const startingDayOfWeek = firstDay?.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days?.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days?.push(new Date(year, month, day));
    }
    
    return days;
  };

  const isWeekend = (date) => {
    if (!date) return false;
    let day = date?.getDay();
    return day === 0 || day === 6; // Sunday or Saturday
  };

  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return date?.toDateString() === today?.toDateString();
  };

  const isSelected = (date) => {
    if (!date || !selectedDate) return false;
    return date?.toDateString() === selectedDate?.toDateString();
  };

  const isPastDate = (date) => {
    if (!date) return false;
    const today = new Date();
    today?.setHours(0, 0, 0, 0);
    return date < today;
  };

  const navigateMonth = (direction) => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth?.setMonth(prev?.getMonth() + direction);
      return newMonth;
    });
  };

  const handleDateClick = (date) => {
    if (date && !isPastDate(date)) {
      onDateSelect(date);
    }
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <div className={`glass rounded-2xl p-6 ${className}`}>
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigateMonth(-1)}
          className="hover:bg-muted/50 hover:glow-primary"
        >
          <Icon name="ChevronLeft" size={20} />
        </Button>
        
        <h3 className="text-lg font-heading font-semibold text-foreground">
          {months?.[currentMonth?.getMonth()]} {currentMonth?.getFullYear()}
        </h3>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigateMonth(1)}
          className="hover:bg-muted/50 hover:glow-primary"
        >
          <Icon name="ChevronRight" size={20} />
        </Button>
      </div>
      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekdays?.map(day => (
          <div key={day} className="text-center py-2">
            <span className="text-xs font-caption font-medium text-muted-foreground">
              {day}
            </span>
          </div>
        ))}
      </div>
      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {days?.map((date, index) => {
          const isDateWeekend = isWeekend(date);
          const isDateToday = isToday(date);
          const isDateSelected = isSelected(date);
          const isDatePast = isPastDate(date);
          const isHovered = hoveredDate && date && hoveredDate?.toDateString() === date?.toDateString();

          return (
            <div key={index} className="aspect-square">
              {date && (
                <button
                  onClick={() => handleDateClick(date)}
                  onMouseEnter={() => setHoveredDate(date)}
                  onMouseLeave={() => setHoveredDate(null)}
                  disabled={isDatePast}
                  className={`
                    w-full h-full rounded-lg text-sm font-medium transition-all duration-200 relative
                    ${isDateSelected 
                      ? 'bg-primary text-primary-foreground glow-primary shadow-neo' 
                      : isDateToday
                        ? 'bg-accent/20 text-accent border border-accent/50'
                        : isDatePast
                          ? 'text-muted-foreground/50 cursor-not-allowed'
                          : isDateWeekend
                            ? 'text-warning hover:bg-warning/10 hover:text-warning' :'text-foreground hover:bg-muted/50 hover:text-foreground'
                    }
                    ${isHovered && !isDateSelected && !isDatePast ? 'scale-110 glow-accent' : ''}
                    ${!isDatePast ? 'hover:scale-105' : ''}
                  `}
                >
                  {date?.getDate()}
                  
                  {/* Weekend Indicator */}
                  {isDateWeekend && !isDateSelected && !isDatePast && (
                    <div className="absolute top-1 right-1 w-1 h-1 bg-warning rounded-full" />
                  )}
                  
                  {/* Today Indicator */}
                  {isDateToday && !isDateSelected && (
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-accent rounded-full pulse-neon" />
                  )}
                </button>
              )}
            </div>
          );
        })}
      </div>
      {/* Legend */}
      <div className="flex items-center justify-center space-x-6 mt-6 pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-accent rounded-full pulse-neon" />
          <span className="text-xs font-caption text-muted-foreground">Today</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-warning rounded-full" />
          <span className="text-xs font-caption text-muted-foreground">Weekend</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-primary rounded-full glow-primary" />
          <span className="text-xs font-caption text-muted-foreground">Selected</span>
        </div>
      </div>
    </div>
  );
};

export default CalendarPicker;