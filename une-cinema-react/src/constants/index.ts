export enum SEAT_STATUS {
  AVAILABLE = 'AVAILABLE',
  SELECTED = 'SELECTED',
  OCCUPIED = 'OCCUPIED',
}

export enum BookingActionType {
  SELECT = 'SELECT',
  DESELECT = 'DESELECT',
  INITIALISE = 'INITIALISE',
}

export const API_HOST = process.env.REACT_APP_API_HOST || ''
