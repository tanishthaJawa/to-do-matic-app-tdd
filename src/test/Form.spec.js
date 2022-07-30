
import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Form from "../components/Form";
configure({ adapter: new Adapter() });


describe('Basic rendering of Form', () => {

  it('Should render a form with heading', () => {

    const { getByTestId, getByText } = render(<Form />);
    const formHeading = getByTestId("input-task-label");
    expect(formHeading).toHaveTextContent("What's the Plan for today?");

  });

  it('Should have an input field to input a text value', () => {

    const { getByTestId } = render(<Form />);
    const inputField = getByTestId("input-task-field");
    expect(inputField).toHaveAttribute("type", "text");
    expect(inputField.textContent).toEqual('');

  });

  it("Should Have Add Button", () => {

    const { getByRole } = render(<Form />);
    const addButton = getByRole('button')
    expect(addButton).toBeInTheDocument();
    expect(addButton).not.toBeDisabled();

  });
});

describe('Testing form functionality', () => {

  it('Should add a task on clicking add button', () => {

    const mockAddTask = jest.fn();
    const { getByRole } = render(<Form addTask={mockAddTask} />);
    const input = getByRole('textbox');
    const addButton = getByRole('button');

    userEvent.type(input, "Go to gym");
    fireEvent.click(addButton);
    expect(mockAddTask).toHaveBeenCalledTimes(1);
    expect(mockAddTask).toHaveBeenCalledWith("Go to gym");
    expect(input).toHaveValue("");
  })

  it("Should not add a Task  if input field is empty", () => {
    const mockAddTask = jest.fn()
    const { getByTestId } = render(<Form add={mockAddTask} />);
    const addButton = getByTestId('add-button');
    fireEvent.click(addButton);
    expect(mockAddTask).not.toHaveBeenCalled();
  });

})