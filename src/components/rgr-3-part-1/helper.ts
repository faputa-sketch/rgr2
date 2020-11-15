import InputData from '../../input-data';

export const isExistVariant = (variant: number): boolean =>
  variant < InputData.rgr3.length && variant >= 0;
