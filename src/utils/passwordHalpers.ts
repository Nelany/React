export const handlePasswordChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  setPasswordCriteria: React.Dispatch<React.SetStateAction<number>>
) => {
  const password = event.target.value;
  let criteriaCount = 0;

  if (/(?=.*[a-z])/.test(password)) criteriaCount++;
  if (/(?=.*[A-Z])/.test(password)) criteriaCount++;
  if (/(?=.*\d)/.test(password)) criteriaCount++;
  if (/(?=.*[@$!%*?&^#])/.test(password)) criteriaCount++;

  setPasswordCriteria(criteriaCount);
};

export const getPasswordStrengthColor = (passwordCriteria: number) => {
  switch (passwordCriteria) {
    case 1:
      return 'orange';
    case 2:
      return 'yellow-orange';
    case 3:
      return 'dark-yellow';
    case 4:
      return 'green';
    case 0:
      return 'red';
    default:
      return 'transparent';
  }
};
