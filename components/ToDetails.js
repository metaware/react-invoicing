import React from 'react';
import { Card, InputNumber, Input, Row, Col } from 'antd';

const InvoiceNumber = ({ invoiceNumber, onInvoiceNumberChange }) => {
  return (
    <InputNumber size='small' min={1} defaultValue={invoiceNumber} onChange={onInvoiceNumberChange} />
  )
}

export class ToDetails extends React.Component {

  constructor(props) {
    super(props);
  }

  invoiceNumber(invoiceNumber, onInvoiceNumberChange) {
    return (
      <div>
        Invoice Number: <InvoiceNumber invoiceNumber={invoiceNumber} onInvoiceNumberChange={onInvoiceNumberChange} />
      </div>
    )
  }

  render() {
    const { invoiceNumber, onInvoiceNumberChange } = this.props;
    return (
      <Card title="To" extra={this.invoiceNumber(invoiceNumber, onInvoiceNumberChange)}>
        <Input placeholder="Customer Name" style={{ marginBottom: '16px' }} />
        <Input type="textarea" rows={2} placeholder="Customer Address" />
      </Card>
    )
  }

}