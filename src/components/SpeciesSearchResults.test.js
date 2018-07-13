import expect from 'expect';
import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import jest from 'jest';
import renderer from 'react-test-renderer';
import SpeciesSearchResults from './SpeciesSearchResults';

describe('SpeciesSearchResults', () => {
  configure({adapter: new Adapter()});
  let speciesSearchResults;
  let subject;
  let speciesList = ['Foo', 'Foobar', 'Bar', 'Blah', 'Blahbity', 'Foobity'];
  beforeEach(() => {

  });
  it('returns single search result if search string >= 3 characters and matches one in list', () => {
    subject = shallow(<SpeciesSearchResults searchString="Foobar" speciesList={speciesList} />);
    expect(subject.find('a').at(0).props().children).toContain('Foobar');
    expect(subject.find('a').length).toEqual(1);
  });
  it('returns search results if search string >= 3 characters', () => {
    subject = shallow(<SpeciesSearchResults searchString="Foo" speciesList={speciesList} />);
    expect(subject.find('a').at(0).props().children).toContain('Foo');
    expect(subject.find('a').at(1).props().children).toContain('Foobar');
    expect(subject.find('a').at(2).props().children).toContain('Foobity');
    expect(subject.find('a').length).toEqual(3);
  });
  it('returns no search results if search string does not match anything in list', () => {
    subject = shallow(<SpeciesSearchResults searchString="Boo" speciesList={speciesList} />);
    expect(subject.find('a').length).toEqual(0);
  });
  it('returns no search results if search string < 3 characters', () => {
    subject = shallow(<SpeciesSearchResults searchString="Fo" speciesList={speciesList} />);
    expect(subject.find('a').length).toEqual(0);
  });
  it('returns search results even if the search string is the wrong case', () => {
    subject = shallow(<SpeciesSearchResults searchString="fOO" speciesList={speciesList} />);
    expect(subject.find('a').at(0).props().children).toContain('Foo');
    expect(subject.find('a').at(1).props().children).toContain('Foobar');
    expect(subject.find('a').at(2).props().children).toContain('Foobity');
    expect(subject.find('a').length).toEqual(3);
  });
});
