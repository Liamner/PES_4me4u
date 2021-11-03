import 'react-native';
import React from 'react';
import Login from '../LoginScreen';
import renderer from 'react-test-renderer'
import {render} from "@testing-library/react-native"

let component


describe('<Login/>', ()=> {
    beforeEach(() => {
        component = render(<Login/>);
    });

    it('ProductRead renders correctly', () =>{
        expect(component).toBeDefined();
        
        //expect(component.getByTestId('test2')).toBeDefined(); //se puede poner ids de test a los componentes
    });

    it('landing snapshot test', ()=>{
        const tree = renderer
        .create(<Login/>)
        .toJSON();
        expect(tree).toMatchSnapshot();
    });
     
});