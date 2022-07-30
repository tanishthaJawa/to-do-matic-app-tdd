import { fireEvent, render } from '@testing-library/react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import App from '../App';
import '@testing-library/jest-dom';

configure({ adapter: new Adapter() });

jest.mock("nanoid", () => {
    return { nanoid: () => "1234" };
});
const mockData = [
    { id: "todo-0", name: "Walk my Dog", completed: true },
    { id: "todo-1", name: "Sleep", completed: false },
    { id: "todo-2", name: "Repeat", completed: false },
];
const taskNoun = mockData.length > 1 ? "tasks" : "task";


describe("Basic rendering of the App Component", () => {

    it("Should have a title equal to Todomatic", () => {
        const { getByText } = render(<App tasks={mockData} />)
        const title = getByText("TodoMatic")
        expect(title).toBeDefined();

    })

    it("Should have a list heading", () => {
        const { getByTestId, getByText } = render(<App tasks={mockData} />)
        const heading = getByText(`${mockData.length} ${taskNoun} remaining`);
        expect(getByTestId("task-list-heading")).toBe(heading);
    })


})

describe('Testing filter buttons functionality', () => {

    it("Should update heading when active button is pressed", () => {
        const { getByTestId } = render(<App tasks={mockData} />)
        const activeFilter = getByTestId("Activefilter");
        fireEvent.click(activeFilter);
        const heading = getByTestId("task-list-heading");
        expect(heading).toHaveTextContent("2 tasks remaining");
       
    })

    it("Should update heading when completed button is pressed", () => {
        const { getByTestId } = render(<App tasks={mockData} />)
        const completedFilter = getByTestId("Completedfilter");
        fireEvent.click(completedFilter);
        const heading = getByTestId("task-list-heading");
        expect(heading).toHaveTextContent("1 task remaining");
    
    });

    it("Should update heading when all button is pressed", () => {
        const { getByTestId } = render(<App tasks={mockData} />)
        const allFilter = getByTestId("Allfilter");
        fireEvent.click(allFilter);
        const heading = getByTestId("task-list-heading");
        expect(heading).toHaveTextContent("3 tasks remaining");
    
    });

})

