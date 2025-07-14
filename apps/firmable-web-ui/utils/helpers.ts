// utils/helpers.ts

//for testing vitest
export const processRequest = (request:any) => {
  console.log("request", request);
};


export const formatABN = (abn: string): string => {
  // Assuming ABN is 11 digits, format as XX XXX XXX XXX
  if (abn.length === 11) {
    return `${abn.substring(0, 2)} ${abn.substring(2, 5)} ${abn.substring(
      5,
      8
    )} ${abn.substring(8, 11)}`;
  }
  return abn;
};

export const getEmployeeSize = (count: number): string => {
  if (count <= 10) return 'Micro';
  if (count <= 50) return 'Small';
  if (count <= 200) return 'Medium';
  if (count <= 1000) return 'Large';
  return 'Enterprise';
};

export const revenueBandToValue = (band: string): number => {
  switch (band) {
    case '0-1M':
      return 1;
    case '1M-5M':
      return 2;
    case '5M-10M':
      return 3;
    case '10M-50M':
      return 4;
    case '50M+':
      return 5;
    default:
      return 0;
  }
};

export const getEmployeeCountRange = (value: number): [number, number] => {
  switch (value) {
    case 1:
      return [1, 10];
    case 2:
      return [11, 50];
    case 3:
      return [51, 200];
    case 4:
      return [201, 1000];
    case 5:
      return [1001, Infinity];
    default:
      return [0, Infinity]; // Should not happen with current range
  }
};