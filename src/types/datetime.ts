export interface DateTimeRange {
  pickupDateTime: Date;
  dropoffDateTime: Date;
}

export interface DateTimePickerProps {
  onChange?: (dates: DateTimeRange) => void;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
}