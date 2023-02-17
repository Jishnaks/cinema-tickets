export default class  Validation{
   validationCheck(ticketNumber,Numberoftickets) {
   
     if (!Number.isInteger(ticketNumber)) {
       throw new TypeError('Ticket Number must be an integer');
     }
     if (!Number.isInteger(Numberoftickets)) {
      throw new TypeError('Number of tickets must be an integer');
    }
   }

   validationCheckforAccountId(accountId) {
      if (!Number.isInteger(accountId)) {
        throw new TypeError('accountId must be an integer');
      }
 }
}