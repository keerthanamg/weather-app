class TicketManager {
    constructor() {
      this.listeners = [];
    }
  
    buyTicket(customer) {
      // Process to buy ticket
      console.log(`Ticket bought by ${customer}`);
      this.emit('buy', customer);
    }
  
    emit(eventName, data) {
      this.listeners.forEach(listener => {
        if (listener.event === eventName) {
          try {
            listener.callback(data);
          } catch (error) {
            console.error(`Error processing '${eventName}' event:`, error);
          }
        }
      });
    }
  
    addListener(event, callback) {
      this.listeners.push({ event, callback });
    }
  
    removeListener(event, callback) {
      this.listeners = this.listeners.filter(listener => {
        return !(listener.event === event && listener.callback === callback);
      });
    }
  }
  
  // Create an instance of TicketManager
  const ticketManager = new TicketManager();
  
  // Event listener for the 'buy' event
  const buyListener = (customer) => {
    console.log(`Thank you, ${customer}, for buying a ticket!`);
  };
  
  // Add the 'buy' event listener
  ticketManager.addListener('buy', buyListener);
  
  // Buy a ticket
  ticketManager.buyTicket('John Doe');
  
  // Remove the 'buy' event listener
  ticketManager.removeListener('buy', buyListener);
  
  // Buy another ticket (no listener should be triggered)
  ticketManager.buyTicket('Jane Smith');
  