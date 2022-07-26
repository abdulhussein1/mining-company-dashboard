import React from 'react';
import {
  Table, Button, Col, Badge,
} from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { TableEdit } from '../../Components/common';
import { userUrl } from '../../Utils/Config';

const TeamMember = () => {
  const history = useHistory();
  const AddNewMember = (e) => {
    e.preventDefault();
    history.push(`${userUrl}/add-new-member`);
  };

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Permission Level</th>
            <th>Project & Material issues Access</th>
            <th>Last Activity</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className="user_part">
                <div className="name_title">J</div>
                <div>
                  <h6>John Doe</h6>
                  <p>johndoe@companyname.com</p>
                </div>
              </div>
            </td>
            <td>Edit</td>
            <td>
              <Col sm={12}>
                <div className="project_lists">
                  <h6>Project 1</h6>
                  <div className="material_issue">
                    <p>material 1</p>
                    <p>material 2</p>
                    <p>material 3</p>
                  </div>
                </div>
              </Col>
            </td>
            <td>29 October 2021</td>
            <td><Badge pill className="bg-success">Accepted</Badge></td>
            <td>
              <div className="d-flex table_buttons">
                <Button><TableEdit /></Button>
                {/* <Button><TableDel /></Button> */}
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="user_part">
                <div className="name_title">A</div>
                <div>
                  <h6>Adawong</h6>
                  <p>adawong@gmail.com</p>
                </div>
              </div>
            </td>
            <td>Edit</td>
            <td>
              <Col sm={12}>
                <div className="project_lists">
                  <h6>Project 2</h6>
                  <div className="material_issue">
                    <p>material 1</p>
                    <p>material 2</p>
                    <p>material 3</p>
                  </div>
                </div>
              </Col>
            </td>
            <td>29 October 2021</td>
            <td><Badge pill className="bg-success">Accepted</Badge></td>
            <td>
              <div className="d-flex table_buttons">
                <Button><TableEdit /></Button>
                {/* <Button><TableDel /></Button> */}
              </div>
            </td>
          </tr>
        </tbody>
      </Table>

      <Col className="faq-inside p-4 d-flex justify-content-between">
        <Button className="custom_cta px-4 transparent-cta transparent-btn" onClick={AddNewMember}>+ Add</Button>
        <Button className="custom_cta px-4">Save</Button>
      </Col>
    </>
  );
};

export default TeamMember;
