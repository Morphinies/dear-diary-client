const jsonEqual = (item1: any, item2: any) => {
  return JSON.stringify(item1) === JSON.stringify(item2);
};

export default jsonEqual;
