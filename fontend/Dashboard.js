import React from 'react';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #ffffff;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Card = styled.div`
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const SalesOverview = styled.div`
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const SalesByCountry = styled.div`
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
`;

const Dashboard = () => {
  return (
    <DashboardContainer>
      <Header>
        <Card>
          <h3>Today's Money</h3>
          <p>$53,000</p>
        </Card>
        <Card>
          <h3>Today's Users</h3>
          <p>2,300</p>
        </Card>
        <Card>
          <h3>New Clients</h3>
          <p>+3,462</p>
        </Card>
        <Card>
          <h3>Sales</h3>
          <p>$103,430</p>
        </Card>
      </Header>
      <SalesOverview>
        <h3>Sales Overview</h3>
        <p>Graph would go here...</p>
      </SalesOverview>
      <SalesByCountry>
        <h3>Sales by Country</h3>
        <ul>
          <li>United States: $230,900</li>
          <li>Germany: $440,000</li>
          <li>Great Britain: $190,700</li>
          <li>Brasil: $143,960</li>
        </ul>
      </SalesByCountry>
    </DashboardContainer>
  );
};

export default Dashboard;
