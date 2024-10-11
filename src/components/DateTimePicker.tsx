import React, { useState, useCallback } from 'react';
import DatePicker from 'react-datepicker';
import { DateTimePickerProps } from '../types/datetime';
import { addDays, isBefore, isAfter, format } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";

/** 
  users should be able to
  select a date and time range 
  (pickup and dropoff) within a given range.
 *
 */
const DateTimePicker: React.FC<DateTimePickerProps> = ({
  onChange,
  minDate = new Date(),
  maxDate = addDays(new Date(), 90),
  className = '',
}) => {
  const [pickupDateTime, setPickupDateTime] = useState<Date>(new Date());
  const [dropoffDateTime, setDropoffDateTime] = useState<Date>(addDays(new Date(), 1));
  const [error, setError] = useState<string>('');


  // Handler for when the user changes the pickup date and time.
   
  const handlePickupChange = useCallback((date: Date) => {
    if (isAfter(date, dropoffDateTime)) {
      setDropoffDateTime(addDays(date, 1));
    }
    setPickupDateTime(date);
    setError('');

    onChange?.({
      pickupDateTime: date,
      dropoffDateTime: isAfter(date, dropoffDateTime) ? addDays(date, 1) : dropoffDateTime,
    });
  }, [dropoffDateTime, onChange]);

  
  /**Handler for when the user changes the dropoff date and time.
  * if drop-off = or before pickup, present error 
  * 
  */
  const handleDropoffChange = useCallback((date: Date) => {
    if (isBefore(date, pickupDateTime)) {
      setError('Drop-off time must be after pickup time');
      return;
    }
    setDropoffDateTime(date);
    setError('');

    onChange?.({
      pickupDateTime,
      dropoffDateTime: date,
    });
  }, [pickupDateTime, onChange]);

  
   // Format a date and time in a readable format.
  
  const formatDateTime = (date: Date) => {
    return format(date, 'EEE, MMM d, yyyy h:mm aa');
  };

  return (
    <div className={`datetime-picker-container ${className}`}>
      <div className="datetime-picker-section">
        <label className="datetime-picker-label">
          Pickup Date & Time
        </label>
        <DatePicker
          selected={pickupDateTime}
          onChange={handlePickupChange}
          showTimeSelect
          dateFormat="MMMM d, yyyy h:mm aa"
          className="datetime-picker-input"
          minDate={minDate}
          maxDate={maxDate}
          timeIntervals={30}
        />
      </div>

      <div className="datetime-picker-section">
        <label className="datetime-picker-label">
          Drop-off Date & Time
        </label>
        <DatePicker
          selected={dropoffDateTime}
          onChange={handleDropoffChange}
          showTimeSelect
          dateFormat="MMMM d, yyyy h:mm aa"
          className="datetime-picker-input"
          minDate={pickupDateTime}
          maxDate={maxDate}
          timeIntervals={30}
        />
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="datetime-summary">
        <div className="datetime-summary-text">
          <span>Pickup:</span>
          <span>{formatDateTime(pickupDateTime)}</span>
        </div>
        <div className="datetime-summary-text">
          <span>Drop-off:</span>
          <span>{formatDateTime(dropoffDateTime)}</span>
        </div>
      </div>
    </div>
  );
};

export default DateTimePicker;