import * as React from 'react';
import { Button, Form, Input } from 'reactstrap';

import '@app/styles/app-form.sass';

interface ISearchCriteria {
  [key: string]: string | null;
}

interface IAppTableSearchState extends ISearchCriteria {
  name: string;
}

interface ISearchProps {
  hint?: string;
  onSearch(values: ISearchCriteria): void;
}

export class AppTableSearchHeader extends React.Component<ISearchProps, IAppTableSearchState> {
  public state = {
    name: '',
  };

  public render() {
    const { name } = this.state;
    const { hint } = this.props;

    return (
      <Form
        inline={true}
        onSubmit={this.search}
        className='app-form__search_form'
      >
        <Input
          type='text'
          value={name || ''}
          onChange={this.searchHandler('name')}
          placeholder={hint || 'Start Typing'}
          className='app-form__search-input'
        />

        <Button color='primary' type='submit'>
          Search
        </Button>
      </Form>
    );
  }

  private search = (evt: React.SyntheticEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const criteria: ISearchCriteria = {};
    const state: IAppTableSearchState = this.state;

    // Map state to search criteria
    Object.keys(state).forEach((key) => {
      if (key in state) {
        criteria[key] = state[key] || null;
      }
    });

    this.props.onSearch(criteria);
  }

  private searchHandler = (field: string) =>
    (evt: React.SyntheticEvent<HTMLInputElement>) =>
      this.setState({ [field]: evt.currentTarget.value })
}
