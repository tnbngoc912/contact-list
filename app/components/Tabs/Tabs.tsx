import React, { ReactNode } from 'react';
import styles from './Tabs.module.scss';

interface TabsProps {
  children: ReactNode;
  activeKey: string;
  setActiveKey(key: string): void;
}

interface TabProps {
  eventKey: string;
  title: string;
  children: ReactNode;
}

const Tabs: React.FC<TabsProps> = ({ children, activeKey, setActiveKey }) => {
  const handleTabClick = (key: string) => {
    setActiveKey(key);
  };

  return (
    <div className={styles.tabContainer}>
      <ul className={styles.tabHeaders}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement<TabProps>(child)) {
            return (
              <li
                key={child.props.eventKey}
                className={`${styles.tabItem} ${
                  activeKey === child.props.eventKey ? styles.activeTab : ''
                }`}
                onClick={() => handleTabClick(child.props.eventKey)}
              >
                {child.props.title}
              </li>
            );
          }
          return null;
        })}
      </ul>

      <div className={styles.tabContent}>
        {React.Children.map(children, (child) =>
          React.isValidElement<TabProps>(child) &&
          activeKey === child.props.eventKey
            ? child
            : null
        )}
      </div>
    </div>
  );
};

const Tab: React.FC<TabProps> = ({ children }) => {
  return <>{children}</>;
};

export { Tabs, Tab };
