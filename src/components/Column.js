import React from 'react';
import Ticket from './Ticket';
import { statusIcons, priorityIcons } from '../utils/icons';
import '../styles/Column.css';

function Column({ title, tickets, users, grouping }) {
  const icon = grouping === 'priority' ? priorityIcons[title] : statusIcons[title] || statusIcons['Todo'];
  const user = grouping === 'user' ? users.find(u => u.id === title) : null;

  return (
    <div className="column">
      <div className="column-header">
        <div className="header-left">
          {grouping === 'user' ? (
            <>
              <img 
                src={user?.avatar} 
                alt="User avatar" 
                className="user-avatar" 
              />
              <span className="title">
                {user?.name || 'Unknown'}
              </span>
            </>
          ) : (
            <>
              <img src={icon} alt={title} className="status-icon" />
              <span className="title">
                {title}
              </span>
            </>
          )}
          <span className="count">{tickets.length}</span>
        </div>
        <div className="header-actions">
          <img src="/add.svg" alt="Add" className="action-icon" />
          <img src="/3 dot menu.svg" alt="More" className="action-icon" />
        </div>
      </div>
      {tickets.map((ticket) => (
        <Ticket key={ticket.id} ticket={ticket} user={users.find(u => u.id === ticket.userId)} grouping={grouping} />
      ))}
    </div>
  );
}

export default Column;