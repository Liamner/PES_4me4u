import 'react-native';
import React from 'react';
import Login from '../LoginScreen';
import renderer from 'react-test-renderer'
import {render, fireEvent} from "@testing-library/react-native"

let component

test('LandingPage snapshot', ()=>{
    const snap = renderer.create(
        <Login/>
    ).toJSON();
    expect(snap).toMatchSnapshot();
});

describe('<Login/>', ()=> {
    //antes de cada prueba creamos un componente "limpio"
    beforeEach(() => {
        component = render(<Login/>);
    });

    it('renders correctly v1', () =>{
        expect(component).toBeDefined();
        
        //expect(component.getByTestId('test2')).toBeDefined(); //se puede poner ids de test a los componentes
    });

    it('renders correctly v2', ()=>{
        const tree = renderer
        .create(<Login/>)
        .toJSON();
        expect(tree).toMatchSnapshot();
    });
     
});