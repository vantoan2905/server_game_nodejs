import React from 'react';
import styled from 'styled-components';
import { FaUser, FaTable, FaFileInvoice, FaVrCardboard, FaLanguage, FaFileAlt } from 'react-icons/fa';

const SidebarContainer = styled.div`
  width: 250px;
  background-color: #f8f9fa;
  padding: 20px;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #e9ecef;
  }

  svg {
    margin-right: 10px;
  }
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <h2>Argon Dashboard 2 Laravel</h2>
      <MenuItem><FaUser /> Profile</MenuItem>
      <MenuItem><FaTable /> User Management</MenuItem>
      <MenuItem><FaFileInvoice /> Tables</MenuItem>
      <MenuItem><FaFileAlt /> Billing</MenuItem>
      <MenuItem><FaVrCardboard /> Virtual Reality</MenuItem>
      <MenuItem><FaLanguage /> RTL</MenuItem>
    </SidebarContainer>
  );
};

export default Sidebar;
