export const fetchData = async (setTickets, setUsers, setIsLoading, setError) => {
    try {
      setIsLoading(true);
      const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setTickets(data.tickets);
      setUsers(data.users);
      setError(null);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };
  
  export const groupTickets = (tickets, grouping, ordering) => {
    if (!tickets.length) return {};
  
    let grouped = {};
  
    switch (grouping) {
      case 'status':
        grouped = tickets.reduce((acc, ticket) => {
          (acc[ticket.status] = acc[ticket.status] || []).push(ticket);
          return acc;
        }, {});
        break;
      case 'user':
        grouped = tickets.reduce((acc, ticket) => {
          (acc[ticket.userId] = acc[ticket.userId] || []).push(ticket);
          return acc;
        }, {});
        break;
      case 'priority':
        ['Urgent', 'High', 'Medium', 'Low', 'No priority'].forEach((priority) => {
          grouped[priority] = tickets.filter((ticket) => getPriorityLabel(ticket.priority) === priority);
        });
        break;
    }
  
    Object.keys(grouped).forEach((key) => {
      grouped[key].sort((a, b) => {
        if (ordering === 'priority') return b.priority - a.priority;
        return a.title.localeCompare(b.title);
      });
    });
  
    return grouped;
  };
  
  export const getPriorityLabel = (priority) => {
    switch (priority) {
      case 4: return 'Urgent';
      case 3: return 'High';
      case 2: return 'Medium';
      case 1: return 'Low';
      case 0: return 'No priority';
      default: return 'No priority';
    }
  };