import promptSync from 'prompt-sync';
const prompt = promptSync();
import SeatReservationService from './src/thirdparty/seatbooking/SeatReservationService.js';
import TicketPaymentService from './src/thirdparty/paymentgateway/TicketPaymentService.js';
import Validation from './Validation.js';

let seatReservationService = new SeatReservationService()
let ticketPaymentService = new TicketPaymentService()
let validation = new Validation()

const structDatas = [
    { 'Ticket Type': 'INFANT', Price: '£0' },
    { 'Ticket Type': 'CHILD', Price: '£10' },
    { 'Ticket Type': 'ADULT', Price: '£20' }
];
var numberofTicketsArray = [0, 0, 0];
var ticketNumber, numberofTickets, countinue, totalCount;
var countinue = 'n';


console.log("Ticket Services")
console.table(structDatas);
var accountId = prompt('Please enter the accountId ');
try {
    validation.validationCheckforAccountId(parseInt(accountId))
    do {
        ticketNumber = prompt('Please Enter the ticket number ');
        numberofTickets = prompt('Please Enter the number of tickets  ');

        totalCount = parseInt(numberofTicketsArray[ticketNumber]) + parseInt(numberofTickets);
        var total = parseInt(numberofTicketsArray.reduce((a, b) => a + b)) + parseInt(numberofTickets);

        try {
            validation.validationCheck(parseInt(ticketNumber), parseInt(numberofTickets));



            if (total <= 20 && !(numberofTicketsArray[2] == 0 && ticketNumber != 2)) {
                numberofTicketsArray[ticketNumber] = totalCount;

            } else if (numberofTicketsArray[2] == 0 && (ticketNumber != 2)) {
                console.log("Child and Infant tickets cannot be purchased without purchasing an Adult ticket")
            }
            else {
                console.log("20 tickets are allowed per person")
            }
        } catch (err) {
            console.log(err.message)
        }
        countinue = prompt('Do you want to countinue (y/n) ');

    } while (countinue == 'y')
    var finalTickets = numberofTicketsArray.map(function (num, index) {
        return {
            'Ticket Type': structDatas[index]?.['Ticket Type'],
            'Number of Tickets': num
        }
    })
    console.table("Ticket Details")

    console.table(finalTickets)
    var purchase = prompt("Do you want to continue with your purchase?(y/n) ");
    if (purchase == 'y') {


        try {
            seatReservationService.reserveSeat(parseInt(accountId), parseInt(numberofTicketsArray.reduce((a, b) => a + b)));
        } catch (err) {
            console.log(err.message)
        }
        try {
            var totalAmount = numberofTicketsArray[1] * 10 + numberofTicketsArray[1] * 20;
            ticketPaymentService.makePayment(parseInt(accountId), parseInt(totalAmount));

        } catch (err) {
            console.log(err.message)
        }

    }
}
catch (err) {
    console.log(err.message)
}
