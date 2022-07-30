import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import Todo from "../components/Todo";

configure({ adapter: new Adapter() });

const mockedTask = {
    id: "todo-0", name: "Walk my Dog", completed: true

};

describe('Basic rendering of Todo Task item', () => {

    it('Should render a todo task checkbox', () => {

        const todoTask = render(<Todo id={mockedTask.id} name={mockedTask.name} completed={mockedTask.completed} key={mockedTask.id} />);
        const task = todoTask.container.querySelector('#todo-0');
        expect(task).toBeInTheDocument();

    });

    it("Should Have Edit Button", () => {
        const todoTask = render(<Todo />);
        const editButton = todoTask.getByTestId('edit-button');
        expect(editButton).toBeInTheDocument();
    });

    it("Should Have Delete Button", () => {
        const todoTask = render(<Todo />);
        const deleteButton = todoTask.getByTestId('delete-button');
        expect(deleteButton).toBeInTheDocument();
    });

})

describe("Testing the functionality of Todo", () => {

    it("Should toggle  the todo task checkBox", () => {
        const toggleTaskCompleted = jest.fn();
        const { getByRole } = render(<Todo id={mockedTask.id} toggleTaskCompleted={toggleTaskCompleted} />)
        const checkbox = getByRole('checkbox');

        fireEvent.click(checkbox);
        expect(toggleTaskCompleted).toHaveBeenCalledTimes(1);
        expect(toggleTaskCompleted).toBeCalledWith(mockedTask.id);
    });

    it("Should delete the todo task on clicking delete button", () => {
        const deleteTask = jest.fn();
        const todoTask = render(<Todo id={mockedTask.id} deleteTask={deleteTask} />)
        const deleteButton = todoTask.getByTestId('delete-button');
        const task = todoTask.container.querySelector(mockedTask.id);

        fireEvent.click(deleteButton);

        expect(deleteTask).toHaveBeenCalledTimes(1);
        expect(deleteTask).toBeCalledWith(mockedTask.id);
        expect(task).not.toBeInTheDocument();

    });


    it("Should show elements of editing template on click of edit button", () => {
        const { getByText, getByTestId } = render(<Todo />)

        const editButton = getByTestId('edit-button');
        fireEvent.click(editButton);

        const input = getByTestId('new-name-input')
        const saveButton = getByText(/Save/i)
        const cancelButton = getByText(/Cancel/i)

        expect(input).toBeInTheDocument();
        expect(saveButton).toBeInTheDocument();
        expect(cancelButton).toBeInTheDocument();
    })

    it("Should not show elements of editing template on click of cancel button", () => {
        const { getByText, getByTestId } = render(<Todo />)

        const editButton = getByTestId('edit-button');
        fireEvent.click(editButton);
        const input = getByTestId('new-name-input')
        const cancelButton = getByText(/Cancel/i)
        const saveButton = getByText(/Save/i)
        fireEvent.click(cancelButton);

        expect(input).not.toBeInTheDocument();
        expect(cancelButton).not.toBeInTheDocument();
        expect(saveButton).not.toBeInTheDocument();
    })


    it("Should rename a given task on click of save button", () => {
        const mockedEditTask = jest.fn();
        const newName = "Go to gym"
        const { getByText, getByTestId } = render(<Todo id={mockedTask.id} name={mockedTask.name} editTask={mockedEditTask} />)

        const editButton = getByTestId('edit-button');
        fireEvent.click(editButton);
        const input = getByTestId('new-name-input')
        const saveButton = getByText(/Save/i)

        fireEvent.change(input, { target: { value: newName } })
        fireEvent.click(saveButton);

        expect(mockedEditTask).toBeCalledTimes(1);
        expect(mockedEditTask).toBeCalledWith(mockedTask.id, newName);
    })


}) 