import React, { useState, useEffect } from 'react';
import {
  Modal, ModalBody,
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import ModalTitle from './ModalTitle';
import Overview from './OverviewModal';
import Detail from './DetailModal';
import Final from './FinalModal';
import { portalUrl } from '../../../Utils/Config';
import { getUserId, sendNotification } from '../../../Utils/globalFunctions';
import {
  createDefaultScenarios,
  createProject, getProjectLists,
  updateProjectDetails,
} from '../redux/action';
import DetailTwo from './DetailModalTwo';

const NewProject = ({ open, className, close }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const projectOverViewInitial = {
    // overview data
    name: '',
    location: '',
    natureowner: '',
    geo_country_id: '',
    state: '',
    pincode: '',
    area_hectares: '',
    sectortype: '',
    business_industry_id: '',
    miningtype: '',
    mineStatus: '',
    marketserved: '',
    loc_lat: null,
    loc_long: null,

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
    reportingPeriod: '',
    projectTable: [{
      extracted_product_id: '',
      unit_of_physical_measure_id: '',
      estimated_ore_resources: '',
      avg_purity_ore_percentage: '',
    }],
    productionData: [],
    turnOver: [],
    empDetails: [],
  };

  const [title, setTitle] = useState('Project Overview');
  const [activeForm, setActiveForm] = useState(1);
  const [projectOverview, setProjectOverview] = useState(projectOverViewInitial);

  const existingProject = useSelector((state) => state.dashboardReducer.createNewProject);
  const projectId = existingProject?.id;

  const MainView = () => {
    if (activeForm === 1) {
      return (
        <Overview
          submit={(val) => {
            setProjectOverview(val);
            const allValues = (({
              natureowner, state, pincode, sectortype, miningtype, mineStatus, marketserved,
              reportingformat, picked, projectTable,
              closurestartdate, closureenddate, reportingPeriod,
              explorationstartdate, explorationenddate, constructionstartdate,
              constructionenddate, postclosurestartdate, postclosureenddate, operationstartdate,
              operationenddate, productionData, turnOver, empDetails, ...o
            }) => o)(val);

            if (!projectId) {
              dispatch(createProject({
                ...allValues,
                business_industry_id: parseInt(allValues.business_industry_id, 10),
                geo_country_id: parseInt(allValues.geo_country_id, 10),
                area_hectares: null,
                // area_hectares: allValues.area_hectares || null,
                owner_user_id: getUserId(),
              })).then((data) => {
                if (data) {
                  const tempId = getUserId();
                  dispatch(getProjectLists(tempId));
                  sendNotification('success', 'Project Created Successfully');
                  setActiveForm(2);
                }
              });
            } else {
              dispatch(updateProjectDetails({
                data: {
                  ...allValues,
                  business_industry_id: parseInt(allValues.business_industry_id, 10),
                  geo_country_id: parseInt(allValues.geo_country_id, 10),
                  area_hectares: null,
                  owner_user_id: getUserId(),
                },
                projectId,
              })).then((data) => {
                if (data) {
                  const tempId = getUserId();
                  dispatch(getProjectLists(tempId));
                  sendNotification('success', 'Project Updated Successfully');
                  setActiveForm(2);
                }
              });
            }
          }}
          initial={projectOverview}
        />
      );
    } if (activeForm === 2) {
      return (
        <Detail
          submit={(val) => {
            setProjectOverview(val);
            setActiveForm(3);
          }}
          prev={() => setActiveForm(1)}
          initial={projectOverview}
        />
      );
    } if (activeForm === 3) {
      return (
        <DetailTwo
          submit={(val) => {
            setProjectOverview(val);
            setActiveForm(4);
          }}
          prev={() => setActiveForm(2)}
          initial={projectOverview}
        />
      );
    }
    return (
      <Final
        submit={() => {
          close();
          dispatch(createDefaultScenarios(projectId)).then((data) => {
            if (data) {
              history.push(`${portalUrl}/dashboard`);
              sendNotification('success', 'Scenario Created Successfully', 2000, 'top-center');
            }
          });
        }}
        prev={() => setActiveForm(3)}
      />
    );
  };

  useEffect(() => {
    if (activeForm === 1) {
      setTitle('Project Overview');
    } else if (activeForm === 2) {
      setTitle('Project details');
    } else if (activeForm === 3) {
      setTitle('Project details');
    } else if (activeForm === 4) {
      setTitle('Instruction');
    }
  }, [activeForm]);

  return (
    <>
      <Modal size="lg" isOpen={open} toggle={close} className={className}>
        <ModalTitle
          toggle={close}
          title={title}
        />
        <ModalBody>
          <MainView />
        </ModalBody>
      </Modal>
    </>
  );
};
NewProject.propTypes = {
  className: PropTypes.string,
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

NewProject.defaultProps = {
  className: '',
};

export default NewProject;
