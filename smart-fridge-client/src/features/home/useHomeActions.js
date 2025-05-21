export const useHomeActions = (navigation) => {
  const userName = 'Rawan';
  const handlePress = (action) => {
    switch (action) {
      case 'Random Meal':
        navigation.navigate('ChooseMeal');
        break;
      case 'Check Items':
        navigation.navigate('Items');
        break;
      case 'Custom Meal':
        navigation.navigate('ChooseCustomizedMeal');
        break;
