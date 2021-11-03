import 'react-native';
import React from 'react';
import ViewProduct from '../ViewProductScreen';
import renderer from 'react-test-renderer'
import {render} from "@testing-library/react-native"

let component

describe('<ViewProduct/>', ()=> {
    beforeEach(() => {
        component = render(<ViewProduct/>);
    });

    it('ProductRead renders correctly', () =>{
        expect(component).toBeDefined();
    });

    it('ProductRead snapshot test', ()=>{
        const tree = renderer
        .create(<ViewProduct/>)
        .toJSON();
        expect(tree).toMatchSnapshot();
    });
     
});