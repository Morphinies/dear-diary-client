type ruleType = 'length4';

export default function verification(
  string: string,
  rules: ruleType[]
): string {
  let err = '';
  for (let rule of rules) {
    switch (rule) {
      case 'length4':
        if (string.length < 4) {
          err = 'Минимум 4 символа';
        }
        break;
      // case 'length6':
      //   if (string.length < 6) {
      //     err = 'Минимум 6 символов';
      //   }
      //   break;
      default:
        break;
    }
    if (err) {
      return err;
    }
  }
  return err;
}
