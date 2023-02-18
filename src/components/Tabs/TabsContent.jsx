import React from 'react';

export const TabsContent = ({ children, selectedTab }) => {
  return (
    <div>
      {children.map((child) =>
        child.props.tabName === selectedTab ? child : null
      )}
    </div>
  );
};
