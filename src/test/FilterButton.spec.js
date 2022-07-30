import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import FilterButton from '../components/FilterButton';
configure({ adapter: new Adapter() });


describe("Should render filter button ", () => {

  it("Should have a filterbutton", () => {
    const { queryByRole } = render(<FilterButton />)
    const filterButton = queryByRole('button');
    expect(filterButton).toBeInTheDocument()
  })

})