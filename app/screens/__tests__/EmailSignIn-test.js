import 'react-native';
import React from 'react';
import SignIn from '../SignInScreen';
import renderer from 'react-test-renderer'
import {render, fireEvent} from "@testing-library/react-native"

let component

describe('<SignIn/>', ()=> {
    beforeEach(() => {
        component = render(<SignIn/>);
    });

    it('EmailSignIn renders correctly', () =>{
        expect(component).toBeDefined();
    });

    it('EmailSignIn snapshot test', ()=>{
        const tree = renderer
        .create(<SignIn/>)
        .toJSON();
        expect(tree).toMatchSnapshot();
    });
     
});