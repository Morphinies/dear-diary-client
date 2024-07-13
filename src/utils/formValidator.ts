// validator return errors object
export default function formValidator(formData: any, rules: {}) {
  // rules example:  { password: ['length'] }
  // rule values: [ 'required', 'length', 'email' ]
  const errors: any = {};

  for (let [itemKey, itemValue] of Object.entries(formData)) {
    for (let [ruleKey, ruleValue] of Object.entries(rules)) {
      if (itemKey === ruleKey) {
        let errI = 0;
        for (let rule of ruleValue as any) {
          if (errI) break;
          switch (rule) {
            case 'required':
              if (String(itemValue).trim().length === 0) {
                errI++;
                errors[itemKey] = 'Поле не заполнено';
              }
              break;
            case 'length':
              if (String(itemValue).trim().length < 4) {
                errI++;
                errors[itemKey] = 'Минимум 4 символа';
              }
              break;
            default:
              break;
          }
        }
      }
    }
  }

  return Object.keys(errors).length ? errors : undefined;
}
