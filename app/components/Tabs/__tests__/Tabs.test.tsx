import { render, screen, fireEvent } from '@testing-library/react';
import { Tabs, Tab } from '../Tabs';
import '@testing-library/jest-dom';

describe('Tabs Component', () => {
  const mockSetActiveKey = jest.fn();

  test('changes active tab on click', () => {
    render(
      <Tabs activeKey="tab1" setActiveKey={mockSetActiveKey}>
        <Tab eventKey="tab1" title="Tab 1">
          <div>Content for Tab 1</div>
        </Tab>
        <Tab eventKey="tab2" title="Tab 2">
          <div>Content for Tab 2</div>
        </Tab>
      </Tabs>
    );

    const tab2 = screen.getByText(/Tab 2/i);
    fireEvent.click(tab2);

    expect(mockSetActiveKey).toHaveBeenCalledWith('tab2');
  });
});
