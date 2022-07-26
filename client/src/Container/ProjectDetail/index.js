/* eslint-disable prefer-spread */
/* eslint-disable no-alert */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-undef */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
import React, {
  useEffect, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Form, FormGroup, Label, Input, Col, UncontrolledTooltip, Row, Table,
} from 'reactstrap';
// eslint-disable-next-line import/no-extraneous-dependencies
import InputMask from 'react-input-mask';
import moment from 'moment';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as yup from 'yup';
import {
  Formik, Field, FieldArray, ErrorMessage,
} from 'formik';

import { DatePicker } from 'antd';
import {
  TableDel, EditUserImage, EditTableData,
  AddTableData,
} from '../../Components/common';
import {
  getScopeIdWithName, getYearDifference, sendNotification, getMonthDifference,
} from '../../Utils/globalFunctions';
import {
  createProjectDetailModal,
  getMetaBusinessMiningProducts,
  getMetaProjectDetailDataKeys,
  getMetaUnitOfPhysicalMeasure, getProjectPhases, getMetaProjectDetailSegments,
  updatePhasesDuration,
  createProjectPhasesDuration,
  getProjectTableDetail,
  deletePhases,
  getPhasesDuration,
  deleteProjectDetailTableData,
  updateProjectDetailTableData,
  getProductionTableData,
  getTurnoverTableData,
  getEmployeeTableData,
  updateProductionDetailTableData,
  deleteProductionDetailTableData,
  updateTurnoverDetailTableData,
  deleteTurnoverDetailTableData,
  updateEmployeeDetailTableData,
  deleteEmployeeDetailTableData,
  createSecondDetailModal,
} from '../Dashboard/redux/action';
import PROJECT_DETAIL_DATA_KEY_ONE from '../Dashboard/NewProject/Constants/ProjectDetailDataKeyConstant';
import PRODUCTION_DATA_KEY from '../Dashboard/NewProject/Constants/ProductionConst';
import TURNOVER_DATA_KEY from '../Dashboard/NewProject/Constants/TurnoverConst';
import EMPLOYEE_DETAILS from '../Dashboard/NewProject/Constants/EmployeeConst';

const ProjectDetailPage = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setActive] = useState('false');
  const handleToggle = () => {
    setActive(!isActive);
  };

  const initialData = {
    picked: [],
    explorationstartdate: '',
    explorationenddate: '',
    constructionstartdate: '',
    constructionenddate: '',
    operationstartdate: '',
    operationenddate: '',
    closurestartdate: '',
    closureenddate: '',
    postclosurestartdate: '',
    postclosureenddate: '',
    projectTable: [{
      extracted_product_id: '',
      unit_of_physical_measure_id: '',
      estimated_ore_resources: '',
      avg_purity_ore_percentage: '',
      group_id: '',
    }],
    productionData: [{
      date_year: '',
      product: '',
      ore_production_tonnes_per_annum: '',
      ore_grade_percentage: '',
      pure_metal_prod_tonnes_per_annum: '',
      group_id: '',
    }],
    turnOver: [{
      date_year: '',
      usd_million: '',
      group_id: '',
    }],
    empDetails: [{
      date_year: '',
      company_employees: '',
      contract_employees: '',
      group_id: '',
    }],
  };
  const [initial, setInitial] = useState(initialData);

  const {
    projectDetailData,
    projectPhasesData,
    metaBusinessMiningProducts,
    metaUnitOfPhysicalMeasure,
    metaProjectDetailSegments,
    getProjectPhasesDuration,
    getProjectTableDetailData,
    getProductionTableDetailData,
    getTurnoverTableDetailData,
    getEmployeeTableDetailData,
  } = useSelector((state) => state.dashboardReducer);
  const projectId = projectDetailData.id;

  useEffect(() => {
    const initialLoad = () => {
      dispatch(getProjectPhases());
      dispatch(getMetaBusinessMiningProducts());
      dispatch(getMetaUnitOfPhysicalMeasure());
      dispatch(getMetaProjectDetailSegments());
      dispatch(getMetaProjectDetailDataKeys());
      dispatch(getPhasesDuration(projectId));
    };
    initialLoad();
    // eslint-disable-next-line
  }, [dispatch]);

  // PROJECT PHASES ==================================================>>>>>
  const phasesIndex = [
    { id: 1, name: 'Exploration' },
    { id: 2, name: 'Construction' },
    { id: 3, name: 'Operation' },
    { id: 4, name: 'Closure' },
    { id: 5, name: 'postClosure' },
  ];
  useEffect(() => {
    const pick = [];
    const startEnd = {};
    if (getProjectPhasesDuration) {
      getProjectPhasesDuration.forEach((item, i) => {
        const { name } = phasesIndex.find((phase) => item?.id?.phase_id === phase?.id);
        pick.push(name);
        startEnd[`${name.toLowerCase()}startdate`] = moment(item?.attributes?.start_date);
        startEnd[`${name.toLowerCase()}enddate`] = moment(item?.attributes?.end_date);
      });
      setInitial({
        ...initial,
        picked: pick,
        ...startEnd,
      });
    }
    // eslint-disable-next-line
  }, [getProjectPhasesDuration, setInitial]);

  // PROJECT DETAIL ==================================================>>>>>
  useEffect(() => {
    const initialLoad = () => {
      const defaultData = initialData.projectTable.map((attributes) => ({
        attributes,
      }));
      if (defaultData.length > 0) {
        Promise.all([
          ...Object.keys(defaultData[0].attributes).map((it) => dispatch(getProjectTableDetail(projectId, it))),
        ]);
      }
    };
    initialLoad();
    // eslint-disable-next-line
  }, [dispatch, isOpen]);

  useEffect(() => {
    const checkValue = Object.keys(getProjectTableDetailData).length !== 0;
    if (checkValue) {
      const setData = [];
      // eslint-disable-next-line array-callback-return
      Object.keys(getProjectTableDetailData).filter((item, i) => i === 3).map((data, i) => {
        const { length } = getProjectTableDetailData[data];
        // eslint-disable-next-line array-callback-return
        Array.apply(null, Array(length)).map(() => {}).forEach((it, k) => {
          let allData = null;
          Object.keys(getProjectTableDetailData).forEach((newData, l) => {
            allData = {
              avg_purity_ore_percentage: getProjectTableDetailData?.avg_purity_ore_percentage[k]?.attributes?.data_value,
              estimated_ore_resources: getProjectTableDetailData?.estimated_ore_resources[k]?.attributes?.data_value,
              extracted_product_id: getProjectTableDetailData?.extracted_product_id[k]?.attributes?.data_value,
              unit_of_physical_measure_id: getProjectTableDetailData?.unit_of_physical_measure_id[k]?.attributes?.data_value,
              group_id: getProjectTableDetailData?.unit_of_physical_measure_id[k]?.id?.group_id,
            };
          });
          setData.push(allData);
        });
      });
      setInitial(
        {
          ...initial,
          projectTable: setData,
        },
      );
    }
    // eslint-disable-next-line
  }, [getProjectTableDetailData]);
  const getLength = getProjectTableDetailData?.avg_purity_ore_percentage?.length;

  const cretData = (values, index) => {
    const attributes = values.projectTable[index];
    const setParameters = {
      project_id: projectId, segment_id: 'mining_products', attributes,
    };
    dispatch(createProjectDetailModal(setParameters)).then(() => {
      sendNotification('success', 'Added Successfully', 1000, 'center-top');
    });
  };

  const updtData = (values, index) => {
    const defaultData = values.projectTable.map((attributes) => ({
      attributes,
    }));
    const grpId = values.projectTable[index]?.group_id;
    if (defaultData.length >= 0) {
      Promise.all([
        ...Object.keys(defaultData[index].attributes).map((it) => dispatch(updateProjectDetailTableData(projectId, grpId, it, defaultData[index].attributes[it]))),
      ]).then(() => {
        sendNotification('success', 'Updated Successfully', 1000, 'center-top');
      });
    }
  };

  const delData = (values, index) => {
    const defaultData = values.projectTable.map((attributes) => ({
      attributes,
    }));
    const grpId = values.projectTable[index]?.group_id;
    if (defaultData.length >= 0) {
      Promise.all([
        ...Object.keys(defaultData[0].attributes).map((it) => dispatch(deleteProjectDetailTableData(projectId, grpId, it))),
      ]).then(() => {
        sendNotification('success', 'Deleted Successfully', 1000, 'center-top');
      });
    }
  };

  // PROJECT DETAIL SECOND FORM ================================================== >>>>>
  const [prodTableData, setProdTableData] = useState();
  const [turnTableData, setTurnTableData] = useState();
  const [employeeTableData, setEmployeeTableData] = useState();

  const secondStepForm = () => {
    dispatch(getPhasesDuration(projectId));
    const defaultData = initialData.productionData.map((attributes) => ({
      attributes,
    }));
    if (defaultData.length > 0) {
      Promise.all([
        ...Object.keys(defaultData[0].attributes).map((it) => dispatch(getProductionTableData(projectId, it))),
      ]);
    }

    const turnOverDefaultData = initialData.turnOver.map((attributes) => ({
      attributes,
    }));
    if (turnOverDefaultData.length > 0) {
      Promise.all([
        ...Object.keys(turnOverDefaultData[0].attributes).map((it) => dispatch(getTurnoverTableData(projectId, it))),
      ]);
    }

    const employeeDefaultData = initialData.empDetails.map((attributes) => ({
      attributes,
    }));
    if (employeeDefaultData.length > 0) {
      Promise.all([
        ...Object.keys(employeeDefaultData[0].attributes).map((it) => dispatch(getEmployeeTableData(projectId, it))),
      ]);
    }
  };

  // Production details set data
  useEffect(() => {
    const checkValue = Object.keys(getProductionTableDetailData)?.length !== 0;
    if (checkValue) {
      const setData = [];
      // eslint-disable-next-line array-callback-return
      Object.keys(getProductionTableDetailData).filter((item, i) => i === 4).map((data, i) => {
        const { length } = getProductionTableDetailData[data];
        // eslint-disable-next-line array-callback-return
        Array.apply(null, Array(length)).map(() => {}).forEach((it, k) => {
          let allData = null;
          Object.keys(getProductionTableDetailData).forEach((newData, l) => {
            allData = {
              date_year: getProductionTableDetailData?.date_year[k]?.attributes?.data_value,
              product: getProductionTableDetailData?.product[k]?.attributes?.data_value,
              ore_production_tonnes_per_annum: getProductionTableDetailData?.ore_production_tonnes_per_annum[k]?.attributes?.data_value,
              ore_grade_percentage: getProductionTableDetailData?.ore_grade_percentage[k]?.attributes?.data_value,
              pure_metal_prod_tonnes_per_annum: getProductionTableDetailData?.pure_metal_prod_tonnes_per_annum[k]?.attributes?.data_value,
              group_id: getProductionTableDetailData?.date_year[k]?.id?.group_id,
            };
          });
          setData.push(allData);
        });
      });
      setProdTableData(setData);
    }
    // eslint-disable-next-line
  }, [getProductionTableDetailData]);

  const prodCretData = (values, index) => {
    const attributes = values.productionData[index];
    delete attributes.group_id;
    const setParameters = {
      project_id: projectId, segment_id: 'production_details', attributes,
    };
    dispatch(createSecondDetailModal(setParameters)).then(() => {
      sendNotification('success', 'Added Successfully', 1000, 'center-top');
    });
  };

  const prodUpdtData = (values, index) => {
    const defaultData = values.productionData.map((attributes) => ({
      attributes,
    }));
    const grpId = values.productionData[index]?.group_id;
    if (defaultData.length >= 0) {
      Promise.all([
        ...Object.keys(defaultData[index].attributes).map((it) => dispatch(updateProductionDetailTableData(projectId, grpId, it, defaultData[index].attributes[it]))),
      ]).then(() => {
        sendNotification('success', 'Updated Successfully', 1000, 'center-top');
      });
    }
  };

  const prodDelData = (values, index) => {
    const defaultData = values.productionData.map((attributes) => ({
      attributes,
    }));
    const grpId = values.productionData[index]?.group_id;
    if (defaultData.length >= 0) {
      Promise.all([
        ...Object.keys(defaultData[0].attributes).map((it) => dispatch(deleteProductionDetailTableData(projectId, grpId, it))),
      ]).then(() => {
        sendNotification('success', 'Deleted Successfully', 1000, 'center-top');
      });
    }
  };

  // Turnover details set data
  useEffect(() => {
    const checkValue = Object.keys(getTurnoverTableDetailData)?.length !== 0;
    if (checkValue) {
      const setData = [];
      // eslint-disable-next-line array-callback-return
      Object.keys(getTurnoverTableDetailData).filter((item, i) => i === 1).map((data, i) => {
        const { length } = getTurnoverTableDetailData[data];
        // eslint-disable-next-line array-callback-return
        Array.apply(null, Array(length)).map(() => {}).forEach((it, k) => {
          let allData = null;
          Object.keys(getTurnoverTableDetailData).forEach((newData, l) => {
            allData = {
              date_year: getTurnoverTableDetailData?.date_year[k]?.attributes?.data_value,
              usd_million: getTurnoverTableDetailData?.usd_million[k]?.attributes?.data_value,
              group_id: getTurnoverTableDetailData?.date_year[k]?.id?.group_id,
            };
          });
          setData.push(allData);
        });
      });
      setTurnTableData(setData);
    }
    // eslint-disable-next-line
  }, [getTurnoverTableDetailData]);

  const turnCretData = (values, index) => {
    const attributes = values.turnOver[index];
    delete attributes.group_id;
    const setParameters = {
      project_id: projectId, segment_id: 'turnover', attributes,
    };
    dispatch(createSecondDetailModal(setParameters)).then(() => {
      sendNotification('success', 'Added Successfully', 1000, 'center-top');
    });
  };

  const turnUpdtData = (values, index) => {
    const defaultData = values.turnOver.map((attributes) => ({
      attributes,
    }));
    const grpId = values.turnOver[index]?.group_id;
    if (defaultData.length >= 0) {
      Promise.all([
        ...Object.keys(defaultData[index].attributes).map((it) => dispatch(updateTurnoverDetailTableData(projectId, grpId, it, defaultData[index].attributes[it]))),
      ]).then(() => {
        sendNotification('success', 'Updated Successfully', 1000, 'center-top');
      });
    }
  };

  const turnDelData = (values, index) => {
    const defaultData = values.turnOver.map((attributes) => ({
      attributes,
    }));
    const grpId = values.turnOver[index]?.group_id;
    if (defaultData.length >= 0) {
      Promise.all([
        ...Object.keys(defaultData[0].attributes).map((it) => dispatch(deleteTurnoverDetailTableData(projectId, grpId, it))),
      ]).then(() => {
        sendNotification('success', 'Deleted Successfully', 1000, 'center-top');
      });
    }
  };

  // Employee details set data
  useEffect(() => {
    const checkValue = Object.keys(getEmployeeTableDetailData)?.length !== 0;
    if (checkValue) {
      const setData = [];
      // eslint-disable-next-line array-callback-return
      Object.keys(getEmployeeTableDetailData).filter((item, i) => i === 2).map((data, i) => {
        const { length } = getEmployeeTableDetailData[data];
        // eslint-disable-next-line array-callback-return
        Array.apply(null, Array(length)).map(() => {}).forEach((it, k) => {
          let allData = null;
          Object.keys(getEmployeeTableDetailData).forEach((newData, l) => {
            allData = {
              date_year: getEmployeeTableDetailData?.date_year[k]?.attributes?.data_value,
              company_employees: getEmployeeTableDetailData?.company_employees[k]?.attributes?.data_value,
              contract_employees: getEmployeeTableDetailData?.contract_employees[k]?.attributes?.data_value,
              group_id: getEmployeeTableDetailData?.date_year[k]?.id?.group_id,
            };
          });
          setData.push(allData);
        });
      });
      setEmployeeTableData(setData);
    }
    // eslint-disable-next-line
  }, [getEmployeeTableDetailData]);

  const employeeCretData = (values, index) => {
    const attributes = values.empDetails[index];
    delete attributes.group_id;
    const setParameters = {
      project_id: projectId, segment_id: 'employee_details', attributes,
    };
    dispatch(createSecondDetailModal(setParameters)).then(() => {
      sendNotification('success', 'Added Successfully', 1000, 'center-top');
    });
  };

  const employeeUpdtData = (values, index) => {
    const defaultData = values.empDetails.map((attributes) => ({
      attributes,
    }));
    const grpId = values.empDetails[index]?.group_id;
    if (defaultData.length >= 0) {
      Promise.all([
        ...Object.keys(defaultData[index].attributes).map((it) => dispatch(updateEmployeeDetailTableData(projectId, grpId, it, defaultData[index].attributes[it]))),
      ]).then(() => {
        sendNotification('success', 'Updated Successfully', 1000, 'center-top');
      });
    }
  };

  const employeeDelData = (values, index) => {
    const defaultData = values.empDetails.map((attributes) => ({
      attributes,
    }));
    const grpId = values.empDetails[index]?.group_id;
    if (defaultData.length >= 0) {
      Promise.all([
        ...Object.keys(defaultData[0].attributes).map((it) => dispatch(deleteEmployeeDetailTableData(projectId, grpId, it))),
      ]).then(() => {
        sendNotification('success', 'Deleted Successfully', 1000, 'center-top');
      });
    }
  };

  const years = [];
  useEffect(() => {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < initial?.picked.length; i++) {
      const start = moment(initial[`${initial?.picked[i].toLowerCase()}startdate`]);
      const end = moment(initial[`${initial?.picked[i].toLowerCase()}enddate`]);
      while (end > start || end.format('M') === start.format('M')) {
        years.push(start.format('YYYY'));
        start.add(1, 'month');
      }
    }
    const yearSorting = _.sortedUniq(years);
    const setDefault = initial;

    const one = [];
    const two = [];
    const three = [];
    yearSorting.forEach((eachYear) => {
      initial.projectTable.forEach((fieldData) => {
        one.push({
          date_year: eachYear,
          product: fieldData.extracted_product_id,
          ore_production_tonnes_per_annum: prodTableData?.find((item) => item.date_year === eachYear && item.product === fieldData.extracted_product_id)?.ore_production_tonnes_per_annum || '',
          ore_grade_percentage: prodTableData?.find((item) => item.date_year === eachYear && item.product === fieldData.extracted_product_id)?.ore_grade_percentage || '',
          pure_metal_prod_tonnes_per_annum: prodTableData?.find((item) => item.date_year === eachYear && item.product === fieldData.extracted_product_id)?.pure_metal_prod_tonnes_per_annum || '',
          group_id: prodTableData?.find((item) => item.date_year === eachYear && item.product === fieldData.extracted_product_id)?.group_id || '',
        });
      });
      two.push({
        date_year: eachYear,
        usd_million: turnTableData?.find((item) => item.date_year === eachYear)?.usd_million || '',
        group_id: turnTableData?.find((item) => item.date_year === eachYear)?.group_id || '',
      });
      three.push({
        date_year: eachYear,
        company_employees: employeeTableData?.find((item) => item.date_year === eachYear)?.company_employees || '',
        contract_employees: employeeTableData?.find((item) => item.date_year === eachYear)?.contract_employees || '',
        group_id: employeeTableData?.find((item) => item.date_year === eachYear)?.group_id || '',
      });
    });
    setDefault.productionData = one;
    setDefault.turnOver = two;
    setDefault.empDetails = three;
    // eslint-disable-next-line
  }, [isOpen, years]);

  // ================ <<  validation part start  >> ===========================
  const detailSchema = yup.object().shape({
    picked: yup.array().min(1, 'Please Select atleast one value'),
    // exploration
    explorationstartdate: yup.date('Start date is Required').when('picked', (picked, schema) => {
      if (picked.includes('Exploration')) {
        return schema.required('Start date is Required');
      }
      return schema;
    }),
    explorationenddate: yup.date('End date is Required').when(['picked', 'explorationstartdate'], (picked, explorationstartdate, schema) => {
      if (picked.includes('Exploration') && explorationstartdate) {
        return schema.min(new Date(explorationstartdate), 'End date should be greater than start date').required('End date is Required');
      }
      return schema;
    }),
    // construction
    constructionstartdate: yup.date().when(['picked', 'explorationenddate'], (picked, explorationenddate, schema) => {
      if (picked.includes('Construction') && explorationenddate) {
        return schema.required('Start date is Required').min(new Date(explorationenddate), 'Start date should be greater exploration end date');
      }
      if (picked.includes('Construction')) {
        return schema.required('Start date is Required');
      }
      return schema;
    }),
    constructionenddate: yup.date().when(['picked', 'constructionstartdate'], (picked, constructionstartdate, schema) => {
      if (picked.includes('Construction') && constructionstartdate) {
        return schema.min(new Date(constructionstartdate), 'End date should be greater than start date').required('End date is Required');
      }
      return schema;
    }),
    // operation
    operationstartdate: yup.date().when(['picked', 'constructionenddate'], (picked, constructionenddate, schema) => {
      if (picked.includes('Operation') && constructionenddate) {
        return schema.required('Start date is Required').min(new Date(constructionenddate), 'Start date should be greater site design and construction end date');
      }
      if (picked.includes('Operation')) {
        return schema.required('Start date is Required');
      }
      return schema;
    }),
    operationenddate: yup.date().when(['picked', 'operationstartdate'], (picked, operationstartdate, schema) => {
      if (picked.includes('Operation') && operationstartdate) {
        return schema.min(new Date(operationstartdate), 'End date should be greater than start date').required('End date is Required');
      }
      return schema;
    }),
    // closure
    closurestartdate: yup.date().when(['picked', 'operationenddate'], (picked, operationenddate, schema) => {
      if (picked.includes('Closure') && operationenddate) {
        return schema.required('Start date is Required').min(new Date(operationenddate), 'Start date should be greater operations end date');
      }
      if (picked.includes('Closure')) {
        return schema.required('Start date is Required');
      }
      return schema;
    }),
    closureenddate: yup.date().when(['picked', 'closurestartdate'], (picked, closurestartdate, schema) => {
      if (picked.includes('Closure') && closurestartdate) {
        return schema.min(new Date(closurestartdate), 'End date should be greater than start date').required('End date is Required');
      }
      return schema;
    }),
    // post closure
    postclosurestartdate: yup.date().when(['picked', 'closureenddate'], (picked, closureenddate, schema) => {
      if (picked.includes('postClosure') && closureenddate) {
        return schema.required('Start date is Required').min(new Date(closureenddate), 'Start date should be greater final closure and decommissioning end date');
      }
      if (picked.includes('postClosure')) {
        return schema.required('Start date is Required');
      }
      return schema;
    }),
    postclosureenddate: yup.date().when(['picked', 'postclosurestartdate'], (picked, postclosurestartdate, schema) => {
      if (picked.includes('postClosure') && postclosurestartdate) {
        return schema.min(new Date(postclosurestartdate), 'End date should be greater than start date').required('End date is Required');
      }
      return schema;
    }),
    // table validation
    projectTable: yup.array().of(
      yup.object().shape({
        extracted_product_id: yup.string().required('Please select the value'),
        unit_of_physical_measure_id: yup.string().required('Please select the value'),
        estimated_ore_resources: yup.number().typeError('Please enter only numbers').required('Please enter the value'),
        avg_purity_ore_percentage: yup.string().required('Please enter the value'),
      }),
    ),
    // productionData: yup.array().of(
    //   yup.object().shape({
    //     ore_production_tonnes_per_annum: yup.number().typeError('Please enter only numbers').required('Please enter the value'),
    //     ore_grade_percentage: yup.number().typeError('Please enter only numbers').required('Please enter the value'),
    //     pure_metal_prod_tonnes_per_annum: yup.number().typeError('Please enter only numbers').required('Please enter the value'),
    //   }),
    // ),
    // turnOver: yup.array().of(
    //   yup.object().shape({
    //     usd_million: yup.number().typeError('Please enter only numbers').required('Please enter the value'),
    //   }),
    // ),
    // empDetails: yup.array().of(
    //   yup.object().shape({
    //     company_employees: yup.number().typeError('Please enter only numbers').required('Please enter the value'),
    //     contract_employees: yup.number().typeError('Please enter only numbers').required('Please enter the value'),
    //   }),
    // ),
  });

  return (
    <>
      <Col className="LoginPage d-flex pt-5 pb-5 h-auto profile-non-edit" id={isActive ? null : 'profileEdit'}>
        <Col sm="8" className="shadow bg-white rounded overflow-hidden offset-md-2">
          <Col className="faq-main-title position-relative">
            Project Details
            <Col className="edit-icon project_edit" onClick={handleToggle}><EditUserImage /></Col>
          </Col>

          {/* form start */}
          <Col className="p-4">
            <Formik
              enableReinitialize
              initialValues={initial}
              validationSchema={detailSchema}
              onSubmit={(values) => {
                const phaseData = values.picked.map((item) => ({
                  // eslint-disable-next-line radix
                  phase_id: parseInt(getScopeIdWithName(item)),
                  start_date: moment(values[`${item.toLowerCase()}startdate`]).format('YYYY-MM-DD'),
                  end_date: moment(values[`${item.toLowerCase()}enddate`]).format('YYYY-MM-DD'),
                }));
                const createPhaseData = values.picked.map((item) => ({
                  // eslint-disable-next-line radix
                  phase_id: parseInt(getScopeIdWithName(item)),
                  project_id: projectId,
                  start_date: moment(values[`${item.toLowerCase()}startdate`]).format('YYYY-MM-DD'),
                  end_date: moment(values[`${item.toLowerCase()}enddate`]).format('YYYY-MM-DD'),
                  business_industry_id: projectDetailData?.references?.business_industry?.id,
                }));
                Promise.all([
                  ...phaseData.map((it) => dispatch(updatePhasesDuration(projectId, it.phase_id, it))),
                  ...createPhaseData.map((it) => dispatch(createProjectPhasesDuration(it))),
                ]).then((d) => {
                  sendNotification('success', 'Phases Updated Successfully', 1000, 'center-top');
                });
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <Col className="p-2" id={isOpen ? 'detail_two_show' : null}>

                    <Col className="p-0 detail_first_form">
                      <FormGroup>
                        <Label className="mb-2">Phases</Label>
                        <Col className="mb-2 custom_inputs">
                          <Field
                            type="checkbox"
                            name="picked"
                            id="pickvallabel"
                            onChange={(val) => {
                              const valu = values.picked;
                              const alertText = 'Are you sure you want to Uncheck the Exploration data ? Unchecked Data will be Deleted Automatically';
                              if (valu.includes(val.target.value)) {
                                // toggle();
                                // eslint-disable-next-line no-restricted-globals
                                if (confirm(alertText) === true) {
                                  setFieldValue('picked', valu.filter((item) => item !== val.target.value));
                                  setFieldValue('explorationstartdate', '');
                                  setFieldValue('explorationenddate', '');
                                  dispatch(deletePhases(projectId, 1));
                                  sendNotification('success', 'Deleted Successfully', 1000, 'center-top');
                                }
                              } else {
                                valu.push(val.target.value);
                                setFieldValue('picked', valu);
                              }
                            }}
                            value="Exploration"
                            className="mt-0 me-3"
                          />
                          <Label>
                            {projectPhasesData[0]?.attributes?.description}
                            <span className="ms-2" id="explore">&#9432;</span>
                            <UncontrolledTooltip placement="top" target="explore">
                              Demo data
                            </UncontrolledTooltip>
                          </Label>
                          <div className="additional_data d-block mt-3">
                            <Row>
                              <Col sm={4} className="mb-3">
                                <FormGroup>
                                  <Label>Start date</Label>
                                  <DatePicker
                                    picker="month"
                                    format="MM/YYYY"
                                    className="form-control"
                                    type="text"
                                    name="explorationstartdate"
                                    onChange={(date) => setFieldValue('explorationstartdate', date)}
                                    onBlur={handleBlur}
                                    value={values.explorationstartdate}
                                  />
                                  <p className="text-danger m-0">{errors.explorationstartdate && touched.explorationstartdate && errors.explorationstartdate}</p>
                                </FormGroup>
                              </Col>
                              <Col sm={4} className="mb-3">
                                <FormGroup>
                                  <Label>End date</Label>
                                  <DatePicker
                                    type="text"
                                    picker="month"
                                    format="MM/YYYY"
                                    className="form-control"
                                    name="explorationenddate"
                                    onChange={(date) => setFieldValue('explorationenddate', date)}
                                    onBlur={handleBlur}
                                    value={values.explorationenddate}
                                  />
                                  <p className="text-danger m-0">{errors.explorationenddate && touched.explorationenddate && errors.explorationenddate}</p>
                                </FormGroup>
                              </Col>
                              <Col sm={4} className="mb-3">
                                <FormGroup>
                                  <Label>No. of years</Label>
                                  <Input
                                    type="text"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={getMonthDifference(
                                      values.explorationstartdate, values.explorationenddate,
                                    )}
                                    disabled
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                          </div>
                        </Col>
                        <Col className="mb-2 custom_inputs">
                          <Field
                            type="checkbox"
                            id="construclabel"
                            name="picked"
                            onChange={(val) => {
                              const valu = values.picked;
                              const alertText = 'Are you sure you want to Uncheck the Site Design and Construction data ? Unchecked Data will be Deleted Automatically';
                              if (valu.includes(val.target.value)) {
                                // toggle();
                                // eslint-disable-next-line no-restricted-globals
                                if (confirm(alertText) === true) {
                                  setFieldValue('picked', valu.filter((item) => item !== val.target.value));
                                  setFieldValue('constructionstartdate', '');
                                  setFieldValue('constructionenddate', '');
                                  dispatch(deletePhases(projectId, 2));
                                  sendNotification('success', 'Deleted Successfully', 1000, 'center-top');
                                }
                              } else {
                                valu.push(val.target.value);
                                setFieldValue('picked', valu);
                              }
                            }}
                            value="Construction"
                            className="mt-0 me-3"
                          />
                          <Label>
                            {projectPhasesData[1]?.attributes?.description}
                            <span className="ms-2" id="construc">&#9432;</span>
                            <UncontrolledTooltip placement="top" target="construc">
                              Demo data
                            </UncontrolledTooltip>
                          </Label>
                          <div className="additional_data d-block mt-3">
                            <Row>
                              <Col sm={4} className="mb-3">
                                <FormGroup>
                                  <Label>Start date</Label>
                                  <DatePicker
                                    picker="month"
                                    format="MM/YYYY"
                                    className="form-control"
                                    type="text"
                                    name="constructionstartdate"
                                    onChange={(date) => setFieldValue('constructionstartdate', date)}
                                    onBlur={handleBlur}
                                    value={values.constructionstartdate}
                                  />
                                  <p className="text-danger m-0">{errors.constructionstartdate && touched.constructionstartdate && errors.constructionstartdate}</p>
                                </FormGroup>
                              </Col>
                              <Col sm={4} className="mb-3">
                                <FormGroup>
                                  <Label>End date</Label>
                                  <DatePicker
                                    type="text"
                                    picker="month"
                                    format="MM/YYYY"
                                    className="form-control"
                                    name="constructionenddate"
                                    onChange={(date) => setFieldValue('constructionenddate', date)}
                                    onBlur={handleBlur}
                                    value={values.constructionenddate}
                                  />
                                  <p className="text-danger m-0">{errors.constructionenddate && touched.constructionenddate && errors.constructionenddate}</p>
                                </FormGroup>
                              </Col>
                              <Col sm={4} className="mb-3">
                                <FormGroup>
                                  <Label>No. of years</Label>
                                  <Input
                                    type="text"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={getMonthDifference(
                                      values.constructionstartdate, values.constructionenddate,
                                    )}
                                    disabled
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                          </div>
                        </Col>
                        <Col className="mb-2 custom_inputs">
                          <Field
                            type="checkbox"
                            id="operationlabel"
                            name="picked"
                            onChange={(val) => {
                              const valu = values.picked;
                              const alertText = 'Are you sure you want to Uncheck the Operations data ? Unchecked Data will be Deleted Automatically';
                              if (valu.includes(val.target.value)) {
                                // toggle();
                                // eslint-disable-next-line no-restricted-globals
                                if (confirm(alertText) === true) {
                                  setFieldValue('picked', valu.filter((item) => item !== val.target.value));
                                  setFieldValue('operationstartdate', '');
                                  setFieldValue('operationenddate', '');
                                  dispatch(deletePhases(projectId, 3));
                                  sendNotification('success', 'Deleted Successfully', 1000, 'center-top');
                                }
                              } else {
                                valu.push(val.target.value);
                                setFieldValue('picked', valu);
                              }
                            }}
                            value="Operation"
                            className="mt-0 me-3"
                          />
                          <Label>
                            {projectPhasesData[2]?.attributes?.description}
                            <span className="ms-2" id="operation">&#9432;</span>
                            <UncontrolledTooltip placement="top" target="operation">
                              Demo data
                            </UncontrolledTooltip>
                          </Label>
                          <div className="additional_data d-block mt-3">
                            <Row>
                              <Col sm={4} className="mb-3">
                                <FormGroup>
                                  <Label>Start date</Label>
                                  <DatePicker
                                    picker="month"
                                    format="MM/YYYY"
                                    className="form-control"
                                    type="text"
                                    name="operationstartdate"
                                    onChange={(date) => setFieldValue('operationstartdate', date)}
                                    onBlur={handleBlur}
                                    value={values.operationstartdate}
                                  />
                                  <p className="text-danger m-0">{errors.operationstartdate && touched.operationstartdate && errors.operationstartdate}</p>
                                </FormGroup>
                              </Col>
                              <Col sm={4} className="mb-3">
                                <FormGroup>
                                  <Label>End date</Label>
                                  <DatePicker
                                    type="text"
                                    picker="month"
                                    format="MM/YYYY"
                                    className="form-control"
                                    name="operationenddate"
                                    onChange={(date) => setFieldValue('operationenddate', date)}
                                    onBlur={handleBlur}
                                    value={values.operationenddate}
                                  />
                                  <p className="text-danger m-0">{errors.operationenddate && touched.operationenddate && errors.operationenddate}</p>
                                </FormGroup>
                              </Col>
                              <Col sm={4} className="mb-3">
                                <FormGroup>
                                  <Label>No. of years</Label>
                                  <Input
                                    type="text"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={getMonthDifference(
                                      values.operationstartdate, values.operationenddate,
                                    )}
                                    disabled
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                          </div>
                        </Col>
                        <Col className="mb-2 custom_inputs">
                          <Field
                            type="checkbox"
                            id="closurelabel"
                            name="picked"
                            onChange={(val) => {
                              const valu = values.picked;
                              const alertText = 'Are you sure you want to Uncheck the Final Closure and Decommissioning data ? Unchecked Data will be Deleted Automatically';
                              if (valu.includes(val.target.value)) {
                                // toggle();
                                // eslint-disable-next-line no-restricted-globals
                                if (confirm(alertText) === true) {
                                  setFieldValue('picked', valu.filter((item) => item !== val.target.value));
                                  setFieldValue('closurestartdate', '');
                                  setFieldValue('closureenddate', '');
                                  dispatch(deletePhases(projectId, 4));
                                  sendNotification('success', 'Deleted Successfully', 1000, 'center-top');
                                }
                              } else {
                                valu.push(val.target.value);
                                setFieldValue('picked', valu);
                              }
                            }}
                            value="Closure"
                            className="mt-0 me-3"
                          />
                          <Label>
                            {projectPhasesData[3]?.attributes?.description}
                            <span className="ms-2" id="closure">&#9432;</span>
                            <UncontrolledTooltip placement="top" target="closure">
                              Demo data
                            </UncontrolledTooltip>
                          </Label>
                          <div className="additional_data d-block mt-3">
                            <Row>
                              <Col sm={4} className="mb-3">
                                <FormGroup>
                                  <Label>Start date</Label>
                                  <DatePicker
                                    picker="month"
                                    format="MM/YYYY"
                                    className="form-control"
                                    type="text"
                                    name="closurestartdate"
                                    onChange={(date) => setFieldValue('closurestartdate', date)}
                                    onBlur={handleBlur}
                                    value={values.closurestartdate}
                                  />
                                  <p className="text-danger m-0">{errors.closurestartdate && touched.closurestartdate && errors.closurestartdate}</p>
                                </FormGroup>
                              </Col>
                              <Col sm={4} className="mb-3">
                                <FormGroup>
                                  <Label>End date</Label>
                                  <DatePicker
                                    type="text"
                                    picker="month"
                                    format="MM/YYYY"
                                    className="form-control"
                                    name="closureenddate"
                                    onChange={(date) => setFieldValue('closureenddate', date)}
                                    onBlur={handleBlur}
                                    value={values.closureenddate}
                                  />
                                  <p className="text-danger m-0">{errors.closureenddate && touched.closureenddate && errors.closureenddate}</p>
                                </FormGroup>
                              </Col>
                              <Col sm={4} className="mb-3">
                                <FormGroup>
                                  <Label>No. of years</Label>
                                  <Input
                                    type="text"
                                    disabled
                                    value={getMonthDifference(values.closurestartdate, values.closureenddate)}
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                          </div>
                        </Col>
                        <Col className="mb-2 custom_inputs">
                          <Field
                            type="checkbox"
                            id="postclosurelabel"
                            name="picked"
                            onChange={(val) => {
                              const valu = values.picked;
                              const alertText = 'Are you sure you want to Uncheck the Post Closure data ? Unchecked Data will be Deleted Automatically';
                              if (valu.includes(val.target.value)) {
                                // toggle();
                                // eslint-disable-next-line no-restricted-globals
                                if (confirm(alertText) === true) {
                                  setFieldValue('picked', valu.filter((item) => item !== val.target.value));
                                  setFieldValue('postclosurestartdate', '');
                                  setFieldValue('postclosureenddate', '');
                                  dispatch(deletePhases(projectId, 5));
                                  sendNotification('success', 'Deleted Successfully', 1000, 'center-top');
                                }
                              } else {
                                valu.push(val.target.value);
                                setFieldValue('picked', valu);
                              }
                            }}
                            value="postClosure"
                            className="mt-0 me-3"
                          />
                          <Label>
                            {projectPhasesData[4]?.attributes?.description}
                            <span className="ms-2" id="psclosure">&#9432;</span>
                            <UncontrolledTooltip placement="top" target="psclosure">
                              Demo data
                            </UncontrolledTooltip>
                          </Label>
                          <div className="additional_data d-block mt-3">
                            <Row>
                              <Col sm={4} className="mb-3">
                                <FormGroup>
                                  <Label>Start date</Label>
                                  <DatePicker
                                    type="text"
                                    picker="month"
                                    format="MM/YYYY"
                                    className="form-control"
                                    name="postclosurestartdate"
                                    onChange={(date) => setFieldValue('postclosurestartdate', date)}
                                    onBlur={handleBlur}
                                    value={values.postclosurestartdate}
                                  />
                                  <p className="text-danger m-0">{errors.postclosurestartdate && touched.postclosurestartdate && errors.postclosurestartdate}</p>
                                </FormGroup>
                              </Col>
                              <Col sm={4} className="mb-3">
                                <FormGroup>
                                  <Label>End date</Label>
                                  <DatePicker
                                    type="text"
                                    picker="month"
                                    format="MM/YYYY"
                                    className="form-control"
                                    name="postclosureenddate"
                                    onChange={(date) => setFieldValue('postclosureenddate', date)}
                                    onBlur={handleBlur}
                                    value={values.postclosureenddate}
                                  />
                                  <p className="text-danger m-0">{errors.postclosureenddate && touched.postclosureenddate && errors.postclosureenddate}</p>
                                </FormGroup>
                              </Col>
                              <Col sm={4} className="mb-3">
                                <FormGroup>
                                  <Label>No. of years</Label>
                                  <Input
                                    type="text"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={getMonthDifference(
                                      values.postclosurestartdate, values.postclosureenddate,
                                    )}
                                    disabled
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                          </div>
                        </Col>
                        <p className="text-danger m-0">{errors.picked && touched.picked && errors.picked}</p>
                      </FormGroup>

                      <Row>
                        <Col sm={12} className="mt-4">
                          <div className="overviewTableHeading font-weight-bold mb-2">{metaProjectDetailSegments[1]?.attributes?.segment_name}</div>
                          <Table striped bordered className="modalTable detailModalPart">
                            <thead>
                              <tr>
                                {PROJECT_DETAIL_DATA_KEY_ONE.map((item) => (
                                  <th value={item.link} key={item.link}>
                                    <Label>{item.attributes.description}</Label>
                                  </th>
                                ))}
                                <th>
                                  Actions
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <FieldArray
                                name="projectTable"
                                render={(arrayHelpers) => (
                                  <>
                                    {values.projectTable.map((data, index) => (
                                      <tr key={index}>
                                        <td>
                                          <FormGroup>
                                            <Input
                                              type="select"
                                              name={`projectTable.${index}.extracted_product_id`}
                                              defaultValue=""
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                              value={values.projectTable[index].extracted_product_id}
                                            >
                                              <option value="" disabled="disabled">Select</option>
                                              {metaBusinessMiningProducts.map((item) => (
                                                <option value={item.id} key={item.id}>
                                                  {item.attributes.id_name}
                                                </option>
                                              ))}
                                            </Input>
                                            <ErrorMessage name={`projectTable.${index}.extracted_product_id`} render={(msg) => <p className="text-danger mb-0">{msg}</p>} />
                                          </FormGroup>
                                        </td>
                                        <td>
                                          <FormGroup>
                                            <Input
                                              type="select"
                                              name={`projectTable.${index}.unit_of_physical_measure_id`}
                                              onChange={handleChange}
                                              defaultValue=""
                                              onBlur={handleBlur}
                                              value={values.projectTable[index].unit_of_physical_measure_id}
                                            >
                                              <option value="" disabled="disabled">Select</option>
                                              {metaUnitOfPhysicalMeasure.map((item) => (
                                                <option value={item.id} key={item.id}>
                                                  {item.attributes.id_name}
                                                </option>
                                              ))}
                                            </Input>
                                            <ErrorMessage name={`projectTable.${index}.unit_of_physical_measure_id`} render={(msg) => <p className="text-danger mb-0">{msg}</p>} />
                                          </FormGroup>
                                        </td>
                                        <td>
                                          <FormGroup>
                                            <Input
                                              type="text"
                                              name={`projectTable.${index}.estimated_ore_resources`}
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                              value={values.projectTable[index].estimated_ore_resources}
                                            />
                                            <ErrorMessage name={`projectTable.${index}.estimated_ore_resources`} render={(msg) => <p className="text-danger mb-0">{msg}</p>} />
                                          </FormGroup>
                                        </td>
                                        <td>
                                          <FormGroup>
                                            <Input
                                              type="text"
                                              name={`projectTable.${index}.avg_purity_ore_percentage`}
                                              mask="999%"
                                              maskChar=" "
                                              tag={InputMask}
                                              onChange={(evt) => {
                                                if (parseInt(evt.target.value, 10) <= 100) { setFieldValue(`projectTable.${index}.avg_purity_ore_percentage`, evt.target.value); }
                                                if (Number.isNaN(parseInt(evt.target.value, 10))) { setFieldValue(`projectTable.${index}.avg_purity_ore_percentage`, ''); }
                                              }}
                                              value={values.projectTable[index].avg_purity_ore_percentage}
                                              onBlur={handleBlur}
                                            />
                                            <ErrorMessage name={`projectTable.${index}.avg_purity_ore_percentage`} render={(msg) => <p className="text-danger mb-0">{msg}</p>} />
                                          </FormGroup>
                                        </td>
                                        <td>
                                          <Col className="d-flex justify-content-start">
                                            {index + 1 > getLength || getLength === undefined
                                              ? (
                                                <>
                                                  <Button
                                                    id={`createData${index}`}
                                                    type="button"
                                                    className="px-2 bg-grey del_cta m-0"
                                                    onClick={() => cretData(values, index)}
                                                  >
                                                    <AddTableData />
                                                  </Button>
                                                  <UncontrolledTooltip placement="top" target={`createData${index}`}>
                                                    Add Data
                                                  </UncontrolledTooltip>
                                                </>
                                              )
                                              : null}

                                            {index + 1 <= getLength
                                              ? (
                                                <>
                                                  <Button
                                                    id={`updateData${index}`}
                                                    type="button"
                                                    className="px-2 bg-grey del_cta m-0"
                                                    onClick={() => updtData(values, index)}
                                                  >
                                                    <EditTableData />
                                                  </Button>
                                                  <UncontrolledTooltip placement="top" target={`updateData${index}`}>
                                                    Update Data
                                                  </UncontrolledTooltip>
                                                </>
                                              )
                                              : null}

                                            {index !== 0
                                              ? (
                                                <>
                                                  <Button
                                                    id={`delData${index}`}
                                                    type="button"
                                                    className="px-2 bg-grey ms-2 del_cta"
                                                    onClick={() => { arrayHelpers.remove(index); delData(values, index); }}
                                                  >
                                                    <TableDel />
                                                  </Button>
                                                  <UncontrolledTooltip placement="top" target={`delData${index}`}>
                                                    Delete
                                                  </UncontrolledTooltip>
                                                </>
                                              )
                                              : null}
                                          </Col>
                                        </td>
                                      </tr>
                                    ))}
                                    <tr>
                                      <td colSpan="4">
                                        <Button
                                          type="button"
                                          className="custom_cta px-4"
                                          onClick={() => arrayHelpers.push({
                                            extracted_product_id: '',
                                            unit_of_physical_measure_id: '',
                                            estimated_ore_resources: '',
                                            avg_purity_ore_percentage: '',
                                          })}
                                        >
                                          Add +
                                        </Button>
                                      </td>
                                    </tr>
                                  </>
                                )}
                              />
                            </tbody>
                          </Table>
                        </Col>
                      </Row>

                      <Col className="right_side_button d-flex justify-content-end">
                        <Button type="submit" className="w-100 custom_cta mt-3 me-2">Save</Button>
                        <Button type="button" className="w-100 custom_cta mt-3 transparent-cta" onClick={() => { setIsOpen(!isOpen); secondStepForm(); }}>Next</Button>
                      </Col>
                    </Col>

                    {/* --------------- Project Detail Two ------------ */}
                    <Col className="p-0 detail_second_form">
                      <Col sm={12}>
                        <div className="overviewTableHeading font-weight-bold mb-2">{metaProjectDetailSegments[2]?.attributes?.segment_name}</div>
                        <Table bordered className="modalTable">
                          <thead>
                            <tr>
                              {PRODUCTION_DATA_KEY.map((item) => (
                                <th value={item.link} key={item.link}>
                                  <Label>{item.attributes.description}</Label>
                                </th>
                              ))}
                              <th style={{ width: '100px' }}>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            <FieldArray
                              name="productionData"
                              render={(arrayHelpers) => (
                                <>
                                  {values.productionData.map((data, index) => (
                                    <tr key={index}>
                                      <td>{data.date_year}</td>
                                      <td>
                                        {metaBusinessMiningProducts
                                          .find((da) => da.id === parseInt(data.product, 10))?.attributes?.id_name}
                                      </td>
                                      <td>
                                        <FormGroup>
                                          <Input
                                            type="text"
                                            name={`productionData.${index}.ore_production_tonnes_per_annum`}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.productionData[index].ore_production_tonnes_per_annum}
                                          />
                                          <ErrorMessage name={`productionData.${index}.ore_production_tonnes_per_annum`} render={(msg) => <p className="text-danger mb-0">{msg}</p>} />
                                        </FormGroup>
                                      </td>
                                      <td>
                                        <FormGroup>
                                          <Input
                                            type="text"
                                            name={`productionData.${index}.ore_grade_percentage`}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.productionData[index].ore_grade_percentage}
                                          />
                                          <ErrorMessage name={`productionData.${index}.ore_grade_percentage`} render={(msg) => <p className="text-danger mb-0">{msg}</p>} />
                                        </FormGroup>
                                      </td>
                                      <td>
                                        <FormGroup>
                                          <Input
                                            type="text"
                                            name={`productionData.${index}.pure_metal_prod_tonnes_per_annum`}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.productionData[index].pure_metal_prod_tonnes_per_annum}
                                          />
                                          <ErrorMessage name={`productionData.${index}.pure_metal_prod_tonnes_per_annum`} render={(msg) => <p className="text-danger mb-0">{msg}</p>} />
                                        </FormGroup>
                                      </td>
                                      <td>
                                        <Col className="d-flex justify-content-start">

                                          {values.productionData[index].group_id === '' ? (
                                            <>
                                              <Button
                                                id={`createData${index}`}
                                                type="button"
                                                className="px-2 bg-grey del_cta m-0"
                                                onClick={() => prodCretData(values, index)}
                                              >
                                                <AddTableData />
                                              </Button>
                                              <UncontrolledTooltip placement="top" target={`createData${index}`}>
                                                Add Data
                                              </UncontrolledTooltip>
                                            </>
                                          ) : null}

                                          {values.productionData[index].group_id !== '' ? (
                                            <>
                                              <Button
                                                id={`updateData${index}`}
                                                type="button"
                                                className="px-2 bg-grey del_cta m-0"
                                                onClick={() => prodUpdtData(values, index)}
                                              >
                                                <EditTableData />
                                              </Button>
                                              <UncontrolledTooltip placement="top" target={`updateData${index}`}>
                                                Update Data
                                              </UncontrolledTooltip>
                                            </>
                                          ) : null}

                                          <Button
                                            id={`delData${index}`}
                                            type="button"
                                            className="px-2 bg-grey ms-2 del_cta"
                                            onClick={() => { arrayHelpers.remove(index); prodDelData(values, index); }}
                                          >
                                            <TableDel />
                                          </Button>
                                          <UncontrolledTooltip placement="top" target={`delData${index}`}>
                                            Delete
                                          </UncontrolledTooltip>

                                        </Col>
                                      </td>
                                    </tr>
                                  ))}
                                </>
                              )}
                            />
                          </tbody>
                        </Table>
                      </Col>

                      <Col sm={12}>
                        <div className="overviewTableHeading font-weight-bold mb-2 mt-4">{metaProjectDetailSegments[3]?.attributes?.segment_name}</div>
                        <Table bordered className="modalTable">
                          <thead>
                            <tr>
                              {TURNOVER_DATA_KEY.map((item) => (
                                <th value={item.link} key={item.link}>
                                  <Label>{item.attributes.description}</Label>
                                </th>
                              ))}
                              <th style={{ width: '100px' }}>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            <FieldArray
                              name="turnOver"
                              render={(arrayHelpers) => (
                                <>
                                  {values.turnOver.map((data, index) => (
                                    <tr key={index}>
                                      <td>{data.date_year}</td>
                                      <td>
                                        <FormGroup>
                                          <Input
                                            type="text"
                                            name={`turnOver.${index}.usd_million`}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.turnOver[index].usd_million}
                                          />
                                          <ErrorMessage name={`turnOver.${index}.usd_million`} render={(msg) => <p className="text-danger mb-0">{msg}</p>} />
                                        </FormGroup>
                                      </td>
                                      <td>
                                        <Col className="d-flex justify-content-start">
                                          {values.turnOver[index].group_id === '' ? (
                                            <>
                                              <Button
                                                id={`createData${index}`}
                                                type="button"
                                                className="px-2 bg-grey del_cta m-0"
                                                onClick={() => turnCretData(values, index)}
                                              >
                                                <AddTableData />
                                              </Button>
                                              <UncontrolledTooltip placement="top" target={`createData${index}`}>
                                                Add Data
                                              </UncontrolledTooltip>
                                            </>
                                          )
                                            : null}

                                          {values.turnOver[index].group_id !== '' ? (
                                            <>
                                              <Button
                                                id={`updateData${index}`}
                                                type="button"
                                                className="px-2 bg-grey del_cta m-0"
                                                onClick={() => turnUpdtData(values, index)}
                                              >
                                                <EditTableData />
                                              </Button>
                                              <UncontrolledTooltip placement="top" target={`updateData${index}`}>
                                                Update Data
                                              </UncontrolledTooltip>
                                            </>
                                          )
                                            : null}

                                          <Button
                                            id={`delData${index}`}
                                            type="button"
                                            className="px-2 bg-grey ms-2 del_cta"
                                            onClick={() => { arrayHelpers.remove(index); turnDelData(values, index); }}
                                          >
                                            <TableDel />
                                          </Button>
                                          <UncontrolledTooltip placement="top" target={`delData${index}`}>
                                            Delete
                                          </UncontrolledTooltip>

                                        </Col>
                                      </td>
                                    </tr>
                                  ))}
                                </>
                              )}
                            />
                          </tbody>
                        </Table>
                      </Col>

                      <Col sm={12}>
                        <div className="overviewTableHeading font-weight-bold mb-2 mt-4">{metaProjectDetailSegments[0]?.attributes?.segment_name}</div>
                        <Table bordered className="modalTable">
                          <thead>
                            <tr>
                              {EMPLOYEE_DETAILS.map((item) => (
                                <th value={item.link} key={item.link}>
                                  <Label>{item.attributes.description}</Label>
                                </th>
                              ))}
                              <th style={{ width: '100px' }}>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            <FieldArray
                              name="empDetails"
                              render={(arrayHelpers) => (
                                <>
                                  {values.empDetails.map((data, index) => (
                                    <tr key={index}>
                                      <td>{data.date_year}</td>
                                      <td>
                                        <FormGroup>
                                          <Input
                                            type="text"
                                            name={`empDetails.${index}.company_employees`}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.empDetails[index].company_employees}
                                          />
                                          <ErrorMessage name={`empDetails.${index}.company_employees`} render={(msg) => <p className="text-danger mb-0">{msg}</p>} />
                                        </FormGroup>
                                      </td>
                                      <td>
                                        <FormGroup>
                                          <Input
                                            type="text"
                                            name={`empDetails.${index}.contract_employees`}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.empDetails[index].contract_employees}
                                          />
                                          <ErrorMessage name={`empDetails.${index}.contract_employees`} render={(msg) => <p className="text-danger mb-0">{msg}</p>} />
                                        </FormGroup>
                                      </td>
                                      <td>
                                        <Col className="d-flex justify-content-start">
                                          {values.empDetails[index].group_id === '' ? (
                                            <>
                                              <Button
                                                id={`createData${index}`}
                                                type="button"
                                                className="px-2 bg-grey del_cta m-0"
                                                onClick={() => employeeCretData(values, index)}
                                              >
                                                <AddTableData />
                                              </Button>
                                              <UncontrolledTooltip placement="top" target={`createData${index}`}>
                                                Add Data
                                              </UncontrolledTooltip>
                                            </>
                                          )
                                            : null}

                                          {values.empDetails[index].group_id !== '' ? (
                                            <>
                                              <Button
                                                id={`updateData${index}`}
                                                type="button"
                                                className="px-2 bg-grey del_cta m-0"
                                                onClick={() => employeeUpdtData(values, index)}
                                              >
                                                <EditTableData />
                                              </Button>
                                              <UncontrolledTooltip placement="top" target={`updateData${index}`}>
                                                Update Data
                                              </UncontrolledTooltip>
                                            </>
                                          )
                                            : null}

                                          <Button
                                            id={`delData${index}`}
                                            type="button"
                                            className="px-2 bg-grey ms-2 del_cta"
                                            onClick={() => { arrayHelpers.remove(index); employeeDelData(values, index); }}
                                          >
                                            <TableDel />
                                          </Button>
                                          <UncontrolledTooltip placement="top" target={`delData${index}`}>
                                            Delete
                                          </UncontrolledTooltip>

                                        </Col>
                                      </td>
                                    </tr>
                                  ))}
                                </>
                              )}
                            />
                          </tbody>
                        </Table>
                      </Col>

                      <Col className="right_side_button d-flex justify-content-start">
                        <Button type="button" className="w-100 custom_cta mt-4" onClick={() => setIsOpen(!isOpen)}>Back</Button>
                      </Col>
                    </Col>

                  </Col>
                </Form>
              )}
            </Formik>
          </Col>
        </Col>
      </Col>
    </>
  );
};

export default ProjectDetailPage;
