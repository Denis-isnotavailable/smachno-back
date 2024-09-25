// import { IChangeArrayOrder, SendEmailDto } from '../../intrefaces/mailer.interface';
// export const changeArrayOrder = (arr: SendEmailDto) => {
//  return arr.cartProducts.reduce((acc, curr) => {
//   const existing = acc.find(item => item.name === curr.product.name);
//   if (existing) {
//    existing.amount += curr.amount;
//    if (curr.purpose === 'Для себе') {
//     existing.forMe += curr.amount;
//    } else if (curr.purpose === 'Для ЗСУ') {
//     existing.forArmy += curr.amount;
//    } else if (curr.purpose === 'На виріст') {
//     existing.forGrow += curr.amount;
//    }
//   } else {
//    acc.push({
//     name: curr.product.name,
//     packaging: curr.product.packaging,
//     price: curr.price,
//     amount: curr.amount,
//     forMe: curr.purpose === 'Для себе' ? curr.amount : 0,
//     forArmy: curr.purpose === 'Для ЗСУ' ? curr.amount : 0,
//     forGrow: curr.purpose === 'На виріст' ? curr.amount : 0,
//    });
//   }
//   return acc;
//  }, []);
// };
