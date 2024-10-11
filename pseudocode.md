DEFINE interface DateTimeRange
      pickupDateTime: Date
      dropoffDateTime: Date

FUNCTION DateTimePicker
  INPUT onChange (optional)
  INPUT minDate (optional)
  INPUT maxDate (optional)
  INPUT className (optional)

  IMPORT DateTime from '../types/DateTime'

  CREATE date range object with pickup and dropoff dates, conforming to DateTimeRange interface

  IF minDate is set
    SET minimum date constraint on date picker

  IF maxDate is set
    SET maximum date constraint on date picker

  IF className is set
    APPLY custom class name to date picker element

  WHEN user selects date range
    CALL onChange function with selected date range object, typed as DateTimeRange

  RETURN date picker element
END FUNCTION