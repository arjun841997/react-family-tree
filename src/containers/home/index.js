import React from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { InputGroup, FormControl, Button, Modal, Table } from 'react-bootstrap'
import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'
import { saveTree, getFamilies } from '../../store/action'

class Home extends React.Component {
  state = { 
    data: {},
    showModal: false,
    selectedId: null,
    totalMembers:1
  }

  componentDidMount() {
    this.props.getFamilies()
  }

  selectNode = (data) => {
    this.setState({ showModal: true, selectedId: data.id })
  }

  renderChildren = (children) => (
    <ul>
      {children.map((child, index) => (
        <li key={index}>
          <a onClick={() => this.selectNode(child)}>{child.name}</a>
          {child.children && child.children.length > 0
            ? this.renderChildren(child.children)
            : null}
        </li>
      ))}
    </ul>
  )

  renderFamilyTree = () => {
    const { children } = this.state.data
    console.log("data 123 ", this.state.data)
    return (
      <div class="tree-root">
        <ul>
          <li>
            <a onClick={() => this.selectNode(this.state.data)}>
              {this.state.data.name}
            </a>
            <ul>
              {children && children.length > 0
                ? this.renderChildren(children)
                : null}
            </ul>
          </li>
        </ul>
      </div>
    )
  }

  handleOnInputChange = (e) => {
    this.setState({ [e.target.id]: e.target.value })
  }

  handleClose = () => {
    this.setState({ showModal: false })
  }

  addRootNode = () => {
    this.setState({
      data: {
        id: uuidv4(),
        name: this.state.familyHeadName,
        familyName: this.state.familyName,
        gender: this.state.gender,
        children: [],
      },
    })
  }

  save = () => {
    let data = {...this.state.data}
		data.totalMembers = this.state.totalMembers
    delete data._id;
    delete data.__v;
    this.props.saveTree(data);
    this.props.getFamilies()
  }

  addChildNode = () => {
    const { selectedId } = this.state
    let totalMembers = this.state.totalMembers
    this.setState({totalMembers: totalMembers+ 1})
    let currentLevel = null
    const getSelectedChild = (children) => {
      if (!currentLevel) {
        currentLevel = children
      }
      let selectedChild = children.find((child) => {
        return child.id === selectedId
      })
      if (!selectedChild) {
        currentLevel.forEach((child) => {
          currentLevel = child.children
          selectedChild = getSelectedChild(child.children)
        })
      }
      return selectedChild
    }
    const newChild = {
      id: uuidv4(),
      name: this.state.childName,
      gender: this.state.childGender,
      children: [],
    }
    const data = { ...this.state.data }
    const selectedChild = getSelectedChild([data])
    
      selectedChild.children.push(newChild)
    
    this.setState({ data, showModal: false })
  }

  renderForm = () => (
    <>
      <InputGroup className="username mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1">Name</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          onChange={this.handleOnInputChange}
          id="childName"
          placeholder="Name"
        />
      </InputGroup>
      <InputGroup className="username mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text>Gender</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          onChange={this.handleOnInputChange}
          id="childGender"
          placeholder="Gender"
        />
      </InputGroup>
      <Button onClick={this.addChildNode} variant="light">
        Add Node
      </Button>
    </>
  )

  render() {
    return (
      <React.Fragment>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Family Name</th>
              <th>Head Name</th>              
              <th>Expand</th>
            </tr>
          </thead>
          <tbody>
            {this.props.families.map((family, index) => {
              console.log("data 1234 ", family)

              return (
                <tr>
                  <td>{index + 1}</td>
              <td>{family.familyName}</td>
              <td>{family.name}</td>              
              <td><Button variant="light" onClick={(e)=> {this.setState({data: family})}}>Expand</Button></td>
                </tr>
              )
            })}
           
          </tbody>
        </Table>
        {/* <InputGroup className="username mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">Family Name</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            onChange={this.handleOnInputChange}
            id="familyName"
            placeholder="Family Name"
          />
        </InputGroup>
        <InputGroup className="username mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">
              Family Head Name
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            onChange={this.handleOnInputChange}
            id="familyHeadName"
            placeholder="Family Head Name"
          />
        </InputGroup>
        <InputGroup className="username mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text>Gender</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            onChange={this.handleOnInputChange}
            id="gender"
            placeholder="Gender"
          />
        </InputGroup>
        <Button onClick={this.addRootNode} variant="light">
          Add Root Node
        </Button> */}
        
        {Object.keys(this.state.data).length > 0
          ? <>
          {/* <Button onClick={this.save} variant="light">
          Save As New
        </Button> */}
        {this.renderFamilyTree()}</>
          : null}
        <Modal show={false} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.renderForm()}</Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {  
  console.log(state, ' state')
  return{
    families: _.get(state.tree.data, "data", []),
  }
}
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {    
      saveTree,
      getFamilies,
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Home)
