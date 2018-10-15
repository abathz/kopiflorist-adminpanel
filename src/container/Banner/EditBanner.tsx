import React, { Component, FormEvent, ChangeEvent } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Form, FormGroup, Input, Label, Button } from 'reactstrap'
import { getBanner, updateDataBanner, editBanner, changeAvailabilityBanner } from 'actions/index'

interface StateProps {
  id: number,
  bannerDetail: any,
  banner: any
}

interface DispatchProps {
  getBanner: typeof getBanner
  updateDataBanner: typeof updateDataBanner
  editBanner: typeof editBanner
  changeAvailabilityBanner: typeof changeAvailabilityBanner
}

interface PropsComponent extends StateProps, DispatchProps { }

interface StateComponent {
  data: any
}

class EditBanner extends Component<PropsComponent, StateComponent> {
  constructor (props: any) {
    super(props)

    this.onInputChange = this.onInputChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onClickButtonAvailability = this.onClickButtonAvailability.bind(this)
  }

  componentDidMount () {
    this.props.getBanner(this.props.id)
  }

  onInputChange (e: ChangeEvent<HTMLInputElement>) {
    if (e.target.id === 'photo_edited') {
      this.props.updateDataBanner({ prop: e.target.id, value: e.target.files })
      return
    }
    this.props.updateDataBanner({ prop: e.target.id, value: e.target.value })
  }

  onSubmit (e: FormEvent) {
    e.preventDefault()
    const data = {
      id: this.props.id,
      banner_title: this.props.banner.banner_title,
      photo_edited: this.props.banner.photo_edited
    }
    this.props.editBanner(data)
  }

  onClickButtonAvailability () {
    this.props.changeAvailabilityBanner(this.props.id)
  }

  render () {
    const { banner } = this.props
    console.log(banner)
    return (
      <>
        <Row>
          <Col xs='12'>
            <h1>Add Banner</h1>
            <div className='mb-5' style={{ borderBottom: '2px solid #333' }} />
          </Col>
        </Row>
        <Row className='mb-5'>
          <Col xs='6'>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label className='label' for='banner_title'>Banner Name</Label>
                <Input type='text' id='banner_title' value={banner.banner_title} onChange={this.onInputChange}/>
              </FormGroup>
              <img className='img-fluid' src={banner.photo} alt={banner.banner_title}/>
              <FormGroup>
                <Label className='label' for='photo_edited'>Photo</Label>
                <Input type='file' id='photo_edited' onChange={this.onInputChange}/>
              </FormGroup>
              <Button className='px-5' color='primary'>Save</Button>
            </Form>
          </Col>
          <Col>
            <p className='label'>Availibility ({banner.availability ? 'Active' : 'Inactive'})</p>
            <Button className='px-5' color='primary' onClick={this.onClickButtonAvailability}>{banner.availability ? 'Inactive' : 'Active'}</Button>
          </Col>
        </Row>
      </>
    )
  }
}

const mapStateToProps = ({ banner }: any) => {
  const { bannerDetail } = banner

  return { bannerDetail, banner }
}

export default connect(mapStateToProps, { getBanner, updateDataBanner, editBanner, changeAvailabilityBanner })(EditBanner)
