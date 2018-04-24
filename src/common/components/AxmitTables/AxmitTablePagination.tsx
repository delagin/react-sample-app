import * as React from 'react';
import { Button, Col, Form, Input, Row } from 'reactstrap';

interface IAppAxmitTablePaginationProps {
  page: number;
  pages: number;
  disableInputs?: boolean;
  onSetPage(page: number): void;
}

interface IAppAxmitTablePaginationState {
  pageValue: number;
}

export class AxmitTablePagination
  extends React.Component<IAppAxmitTablePaginationProps, IAppAxmitTablePaginationState> {

  private tid: number;
  private onInputChangeDelay = 1000;

  constructor(props: IAppAxmitTablePaginationProps) {
    super(props);

    this.state = {
      pageValue: props.page,
    };
  }

  public componentWillReceiveProps(nextProps: IAppAxmitTablePaginationProps) {
    this.setState({ pageValue: nextProps.page });
  }

  public render() {
    const { page, pages, disableInputs } = this.props;
    const { pageValue } = this.state;

    return (
      <Row>
        <Col />

        <Col className='col-auto'>
          <Form inline={true} className='axmit-table__pagination'>
            <Button
              color='outline-primary'
              disabled={disableInputs || !page || page <= 1 || pages === 1}
              onClick={this.onSetPage(page - 1)}
              title='Previous Page'
            >
              {`< Prev`}
            </Button>

            <span>Page </span>
            <Input
              type='number'
              value={pageValue}
              onChange={this.onInputChange}
              min={1}
              max={pages}
              disabled={disableInputs}
              size='3'
            />
            <span> of {pages}</span>

            <Button
              color='outline-primary'
              disabled={disableInputs || !page || page >= pages || pages === 1}
              onClick={this.onSetPage(page + 1)}
              title='Next Page'
            >
              {`Next >`}
            </Button>
          </Form>
        </Col>
      </Row>
    );
  }

  private onSetPage = (page: number) =>
    this.props.onSetPage.bind(this, page)

  private onInputChange = (evt: React.SyntheticEvent<HTMLInputElement>) => {
    if (this.tid) {
      clearTimeout(this.tid);
    }

    const page = parseInt(evt.currentTarget.value, 10) || 1;

    this.tid = setTimeout(
      this.props.onSetPage.bind(this, page),
      this.onInputChangeDelay,
    );

    this.setState({ pageValue: page });
  }
}
