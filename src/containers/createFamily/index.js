import React from 'react'
import { InputGroup, FormControl, Button, Modal } from 'react-bootstrap'
import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'
import { saveTree } from '../../store/action'
import { connect } from 'react-redux'

class CreateFamily extends React.Component {
  state = {
    backupdata: {
      id: 1,
      title: 'first',
      parent: null,
      level: 1,
      children: [
        {
          id: 2,
          title: 'first child',
          parent: 1,
          level: 2,
          children: [],
        },
        {
          id: 3,
          title: 'second child',
          parent: 1,
          level: 2,
          children: [
            {
              id: 4,
              title: 'first grand child',
              parent: 3,
              level: 2,
              children: [],
            },
            {
              id: 5,
              title: 'second grand child',
              parent: 3,
              level: 2,
              children: [
                {
                  id: 6,
                  title: 'first great grand child',
                  parent: 5,
                  level: 3,
                  children: [],
                },
                {
                  id: 7,
                  title: 'second great grand child',
                  parent: 5,
                  level: 3,
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    },
    data: {},
    showModal: false,
    selectedId: null,
    totalMembers: 1,
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
    let data = { ...this.state.data }
    data.totalMembers = this.state.totalMembers

    this.props.saveTree(data)
  }

  flattenChildren = (data) => {
	let flattenedChildren = [this.state.data];
	const addChild = (children) => {
		children.forEach((child) => {
			flattenedChildren.push(child);
		})
		children.forEach((child) => {
			if (child.children.length !== 0) {
				addChild(child.children);
			}
		})
	}
	addChild(data.children);
	return flattenedChildren;
}

  getSelectedChild = (data, selectedId) => {
	const flattenedChildren = this.flattenChildren(data);
	const selectedChild = flattenedChildren.find((child) => child.id === selectedId);
	return selectedChild;
  }

  addChildNode = () => {
	console.log(this.state, ' state');
    const { selectedId } = this.state
    let totalMembers = this.state.totalMembers
    this.setState({ totalMembers: totalMembers + 1 })
    let currentLevel = null
    
    const newChild = {
      id: uuidv4(),
      name: this.state.childName,
      gender: this.state.childGender,
      children: [],
    }
    const data = { ...this.state.data }
    const selectedChild = this.getSelectedChild(data, selectedId)
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
        <InputGroup className="username mb-3">
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
        </Button>
        <Button onClick={this.save} variant="light">
          Save
        </Button>
        {Object.keys(this.state.data).length > 0
          ? this.renderFamilyTree()
          : null}
        <Modal show={this.state.showModal} onHide={this.handleClose}>
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

export default connect(null, { saveTree: saveTree })(CreateFamily)
