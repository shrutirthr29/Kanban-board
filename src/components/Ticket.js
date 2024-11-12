import React from 'react';
import { statusIcons, priorityIcons } from '../utils/icons';
import { getPriorityLabel } from '../utils/dataUtils';
import '../styles/Ticket.css';

function Ticket({ ticket, user, grouping }) {
  return (
    <div className="ticket">
      <div className="ticket-header">
        <div className="ticket-id-section">
          <img src="3 dot menu.svg" alt="Menu" className="menu-icon" />
          <span className="ticket-id">{ticket.id}</span>
        </div>
        {grouping !== 'user' && (
          <img src={user?.avatar || ''} alt="User avatar" className="user-avatar" />
        )}
      </div>
      <div className="ticket-title">
        {grouping !== 'status' && (
          <img src={statusIcons[ticket.status]} alt={ticket.status} className="status-icon" />
        )}
        <span>{ticket.title}</span>
      </div>
      <div className="ticket-footer">
        <div className="tags">
          {grouping !== 'priority' && (
            <img src={priorityIcons[getPriorityLabel(ticket.priority)]} alt="Priority" className="priority-icon" />
          )}
          {ticket.tag.map((t) => (
            <span key={t} className="tag">
              <span className="dot">●</span>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Ticket;