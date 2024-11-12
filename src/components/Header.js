import React, { useState } from 'react';
import '../styles/Header.css';

function Header({ grouping, ordering, onGroupingChange, onOrderingChange }) {
  const [showDisplayMenu, setShowDisplayMenu] = useState(false);

  return (
    <div className="header-strip">
      <div className="header-content">
        <div className="display-section">
          <button onClick={() => setShowDisplayMenu(!showDisplayMenu)} className="display-button">
            <img src="Display.svg" alt="Display" className="display-icon" />
            Display
            <img src="down.svg" alt="Dropdown" className="dropdown-icon" />
          </button>
          {showDisplayMenu && (
            <div className="dropdown-menu">
              <div className="dropdown-item">
                <span>Grouping</span>
                <select value={grouping} onChange={(e) => onGroupingChange(e.target.value)}>
                  <option value="status">Status</option>
                  <option value="user">User</option>
                  <option value="priority">Priority</option>
                </select>
              </div>
              <div className="dropdown-item">
                <span>Ordering</span>
                <select value={ordering} onChange={(e) => onOrderingChange(e.target.value)}>
                  <option value="priority">Priority</option>
                  <option value="title">Title</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;