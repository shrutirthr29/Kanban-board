import React, { useEffect, useState } from 'react';
import Header from './Header';
import Column from './Column';
import { fetchData, groupTickets } from '../utils/dataUtils';
import '../styles/KanbanBoard.css';

function KanbanBoard() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState('status');
  const [ordering, setOrdering] = useState('priority');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData(setTickets, setUsers, setIsLoading, setError);
  }, []);

  const groupedTickets = groupTickets(tickets, grouping, ordering);

  if (isLoading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="kanban-board">
      <Header
        grouping={grouping}
        ordering={ordering}
        onGroupingChange={setGrouping}
        onOrderingChange={setOrdering}
      />
      <div className="board">
        {Object.entries(groupedTickets).map(([key, groupTickets]) => (
          <Column
            key={key}
            title={key}
            tickets={groupTickets}
            users={users}
            grouping={grouping}
          />
        ))}
      </div>
    </div>
  );
}

export default KanbanBoard;