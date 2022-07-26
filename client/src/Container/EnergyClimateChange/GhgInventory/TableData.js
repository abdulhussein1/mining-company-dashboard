/* eslint-disable react/no-danger */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-indent */
/* eslint-disable max-len */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import React, {
  useEffect, useRef, useState, useCallback,
} from 'react';
import { withFormik } from 'formik';
import PropTypes from 'prop-types';
import {
  Table,
  Button,
  Col,
  FormGroup,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
} from 'reactstrap';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as yup from 'yup';
import { useParams } from 'react-router-dom';
import {
  deleteTableRowData,
  postTableData,
  updateTableData,
} from '../redux/action';
import { sendNotification } from '../../../Utils/globalFunctions';
import SingleField from './SingleField';
import { PROJECT_MATERIAL_ISSUE_DATA } from '../../../Utils/apiList';
import Api from '../../../Utils/api';
import { TableDel, TableEdit } from '../../../Components/common';
import { getProjectPhases } from '../../Dashboard/redux/action';

const MyForm = (props) => {
  const formikRef = useRef();
  const {
    // values,
    // touched,
    // errors,
    // handleChange,
    // handleBlur,
    handleSubmit,
    StatCombConst,
    list,
    deleteTableItem,
    rowData,
    editTableItem,
    setEditTableItem,
    editRowData,
    segmentName,
    onlyViewMode,
    segmentHeadings,
    segmentid,
  } = props;

  const findObject = (it) => rowData.find((aaaa) => aaaa.id.data_key === it.id.data_key);
  return (
    <>
      {segmentHeadings ? (
        <h2 className="secondary_font font-weight-bold mt-3 mb-3 table_parent_heading">
          {segmentHeadings || ''}
        </h2>
      ) : (
        ''
      )}
      {segmentName ? (
        <h5 className="secondary_font font-weight-bold mt-3 mb-3 table_data_headings">
          {segmentName || ''}
        </h5>
      ) : (
        ''
      )}
      <Col className={`shadow bg-white rounded overflow-hidden mb-4 scope_table_data ${onlyViewMode ? 'show_add_and_edit_mode' : ''}`}>
        <form onSubmit={handleSubmit} innerRef={formikRef}>
          <Table>
            <thead>
              <tr>
                {StatCombConst.map((item, i) => (
                  <th key={i} className={item.container}>
                    <div dangerouslySetInnerHTML={{ __html: item.attributes.description.replaceAll(/\n/g, '<br />') }} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="vertical_top">
              {Object.keys(list).map((item) => (
                <tr>
                  {StatCombConst.map((it, k) => (
                    // eslint-disable-next-line max-len
                    <td>
                      {it.attributes?.data_value_validation_id === 'none'
                        ? list[item].find(
                          (aaaa) => aaaa.id.data_key === it.id.data_key,
                        )?.attributes?.data_value
                        : list[item].find(
                          (aaaa) => aaaa.id.data_key === it.id.data_key,
                        )?.attributes?.description || 'N/A'}
                    </td>
                  ))}
                  <Col className="table_buttons_scope">
                    <Button
                      type="button"
                      className="edit_cta"
                      onClick={() => editRowData(list[item], item)}
                    >
                      <TableEdit />
                    </Button>
                    <Button
                      type="button"
                      className="del_cta"
                      onClick={() => deleteTableItem(list[item], item)}
                    >
                      <TableDel />
                    </Button>
                  </Col>
                </tr>
              ))}
              <tr>
                {editTableItem ? (
                  <Modal
                    size="lg"
                    isOpen={editTableItem}
                    toggle={() => setEditTableItem(false)}
                  >
                    <ModalHeader
                      className="report_title"
                      toggle={() => setEditTableItem(false)}
                    >
                      <h5 className="primary_font mb-0">Edit</h5>
                    </ModalHeader>
                    <ModalBody>
                      {StatCombConst.map((item, k) => (
                        <FormGroup className="mb-3">
                          <Label>{item.attributes.description}</Label>
                          <SingleField
                            item={item}
                            index={k}
                            StatCombConst={StatCombConst}
                            {...props}
                            segmentid={segmentid}
                            rowData={findObject(item)}
                            foredit
                          />
                        </FormGroup>
                      ))}
                      <Col className="d-flex justify-content-center pt-3 pb-3">
                        <Button
                          type="submit"
                          className="custom_cta px-4 transparent-cta transparent-btn"
                          onClick={handleSubmit}
                        >
                          Update
                        </Button>
                      </Col>
                    </ModalBody>
                  </Modal>
                ) : (
                  <>
                    {StatCombConst.map((item, k) => (
                      <td key={item.id.data_key}>
                        <SingleField
                          item={item}
                          index={k}
                          StatCombConst={StatCombConst}
                          {...props}
                          segmentid={segmentid}
                          foredit={false}
                        />
                      </td>
                    ))}
                  </>
                )}
              </tr>
            </tbody>
          </Table>
          {editTableItem ? null : (
            <Col className="p-3 d-flex add_table_service">
              <Button
                type="submit"
                className="custom_cta px-4 transparent-cta transparent-btn"
              >
                + Add
              </Button>
            </Col>
          )}
        </form>
      </Col>
    </>
  );
};

const TableForm = ({
  StatCombConst,
  phaseIdValue,
  activeYearValue,
  segmentid,
  segmentName,
  onlyViewMode,
  activeScope,
  segmentHeadings,
}) => {
  const dispatch = useDispatch();
  const formikRef = useRef();
  const [list, setList] = useState({});
  const { scenarioId } = useParams();
  const scenarioIdValue = parseInt(scenarioId, 10);
  const activeYear = `${activeYearValue}-01-01`;
  const [editTableItem, setEditTableItem] = useState(false);
  const [rowData, setRowData] = useState([]);

  const { projectDetailData } = useSelector((state) => state.dashboardReducer);
  const projectId = projectDetailData.id;

  const CreateTableHeader = () => StatCombConst.map((item) => item.id.data_key);
  const ObjectAdust = () => StatCombConst.map(
    (it) => rowData.find((aaaa) => aaaa.id.data_key === it.id.data_key)?.attributes
      ?.data_value,
  );
  const th = CreateTableHeader();
  const td = ObjectAdust();
  const tableObj = Object.assign(
    {},
    ...th.map((n, index) => ({ [n]: td[index] })),
  );
  const formdsd = editTableItem
    ? tableObj
    : StatCombConst.map((titleData) => titleData.id.data_key).reduce(
      (a, v) => ({ ...a, [v]: '' }),
      {},
    );

  const val = editTableItem
    ? Object.assign(
      {},
      ...th.map((n, index) => ({
        [n]: yup.string().required('Field is Required'),
      })),
    )
    : StatCombConst.map((titleData) => titleData.id.data_key).reduce(
      (a, v) => ({ ...a, [v]: yup.string().required('Field is Required') }),
      {},
    );

  const overviewSchema = yup.object().shape(val);
  // eslint-disable-next-line
  const getTableListings = useCallback(() => {
    Api.get(PROJECT_MATERIAL_ISSUE_DATA, {
      action: 'filter',
      'filter-keys':
        'project_id,phase_id,scenario_id,material_issue_id,material_issue_segment_id',
      'filter-values': `${projectId},${phaseIdValue},${scenarioIdValue},2,${segmentid}`,
    }).then(
      (res) => {
        const data = res.data.resource_list.filter(
          (saas) => saas.attributes.data_date === activeYear,
        );
        const groupedData = _.groupBy(data, (item) => item.id.group_id);
        setList(groupedData);
      },
      (err) => {
        setList({});
      },
    );
  });

  const editRowData = (item, groupid) => {
    setEditTableItem(true);
    setRowData(item);
  };

  const deleteTableItem = (groupId, key) => {
    const groupIdValue = parseInt(key, 10);
    Promise.all([
      ...StatCombConst.map((it) => dispatch(
        deleteTableRowData({
          project_id: projectId,
          phase_id: phaseIdValue,
          scenario_id: scenarioIdValue,
          material_issue_id: 2,
          material_issue_segment_id: segmentid,
          group_id: groupIdValue,
          data_key: it.id.data_key,
        }),
      )),
    ]).then((d) => {
      const fullList = { ...list };
      delete fullList[key];
      setList(fullList);
      sendNotification(
        'success',
        'List Deleted SuccessFully',
        1000,
        'top-center',
      );
    });
  };

  useEffect(() => {
    const initialLoad = () => {
      getTableListings();
      dispatch(getProjectPhases());
    };
    initialLoad();
    // eslint-disable-next-line
  }, [activeYearValue, phaseIdValue]);

  const createAPIURL = (it, groupId, values) => {
    const apiurl = {
      project_id: projectId,
      phase_id: phaseIdValue,
      scenario_id: scenarioIdValue,
      material_issue_id: 2,
      material_issue_segment_id: segmentid,
      group_id: groupId,
      data_key: it.id.data_key,
    };
    return apiurl;
  };
  const updateTableList = (values) => {
    const groupId = rowData[0].id.group_id;
    Promise.all([
      ...StatCombConst.map((it) => dispatch(
        updateTableData(createAPIURL(it, groupId, values), {
          data_value: values[it.id.data_key],
        }),
      )),
    ]).then((data) => {
      sendNotification('success', 'Updated Successfully', 1000, 'top-center');
    });
  };

  const TableData = withFormik({
    mapPropsToValues: () => formdsd,
    validationSchema: () => overviewSchema,
    handleSubmit: (values, { setSubmitting }) => {
      if (editTableItem) {
        updateTableList(values);
        setEditTableItem(false);
        setRowData([]);
        getTableListings();
      } else {
        const AllData = {
          project_id: projectId,
          material_issue_id: 2,
          scenario_id: scenarioIdValue,
          phase_id: phaseIdValue,
          data_date: activeYear,
          material_issue_segment_id: segmentid,
          attributes: values,
        };
        dispatch(postTableData(AllData)).then((data) => {
          if (data) {
            sendNotification(
              'success',
              'Added Successfully',
              1000,
              'top-center',
            );
            formikRef.current?.resetForm();
            getTableListings();
          }
          setSubmitting(false);
        });
      }
    },

    displayName: 'BasicForm',
  })(MyForm);

  return (
    <TableData
      StatCombConst={StatCombConst}
      segmentid={segmentid}
      list={list}
      deleteTableItem={deleteTableItem}
      rowData={rowData}
      editTableItem={editTableItem}
      setEditTableItem={setEditTableItem}
      editRowData={editRowData}
      updateTableList={updateTableList}
      segmentName={segmentName}
      onlyViewMode={onlyViewMode}
      segmentHeadings={segmentHeadings}
    />
  );
};

TableForm.propTypes = {
  phaseIdValue: PropTypes.number,
  activeYearValue: PropTypes.string,
  segmentName: PropTypes.string,
  onlyViewMode: PropTypes.string,
  segmentHeadings: PropTypes.string,
  StatCombConst: PropTypes.objectOf(PropTypes.any).isRequired,
  segmentid: PropTypes.number,
  activeScope: PropTypes.string.isRequired,
};
TableForm.defaultProps = {
  phaseIdValue: null,
  activeYearValue: null,
  segmentid: null,
  segmentName: null,
  onlyViewMode: null,
  segmentHeadings: null,
};
export default TableForm;
