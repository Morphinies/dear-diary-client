const jsonEqual = (item1, item2) => {
  return JSON.stringify(item1) === JSON.stringify(item2);
};

export default jsonEqual;
