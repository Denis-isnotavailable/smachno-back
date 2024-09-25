export const subtractionDates = (date: string) => {
 const currentDate = new Date();
 const differenceInMilliseconds = currentDate.getTime() - new Date(date).getTime();
 const differenceInSeconds = differenceInMilliseconds / 1000;
 const differenceInMinutes = differenceInMilliseconds / (1000 * 60);
 const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);
 const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

 if (differenceInHours > 24) {
  return false;
 }

 return true;
};
